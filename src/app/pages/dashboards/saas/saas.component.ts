import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { VirementService } from '../../../core/services/virement.service';
import { DashboardService } from '../../../core/services/dashboard.service';
import { ConfigService } from '../../../core/services/config.service';
import { ChartType, ChatMessage } from './saas.model';

@Component({
  selector: 'app-saas',
  templateUrl: './saas.component.html',
  styleUrls: ['./saas.component.scss']
})
export class SaasComponent implements OnInit, AfterViewInit {

  // ViewChild
  @ViewChild('scrollRef') scrollRef: any;
  @ViewChild('content') content: any;

  // Données générales
  breadCrumbItems: Array<{}>;
  nombreTotal: number = 0;
  dashboardStats: any = { today: 0, month: 0, year: 0 };
  historique: any[] = [];

  // Stats Effets
  userCount: number = 0;
  effetCount: number = 0;
  effetsEtat: any[] = [];
  effetsType: any[] = [];
  effetsDate: any[] = [];

  // Charts Effets
  salesDonutChart: ChartType;         // Effets par état
  EffetsTypeDonutChart: ChartType;    // Effets par type
  earningLineChart: any;              // Effets par date

  // Charts Virements
  salesAnalyticsDonutChart = {
    series: [],
    chart: { type: "donut", height: 200 },
    labels: ["Urgent", "Standard", "Retardable"],
    colors: ["#556ee6", "#34c38f", "#f46a6a"],
    plotOptions: { pie: { donut: { size: "70%" } } },
    legend: { show: true }
  };

  activeOptionButton: string = 'all';
  visitorsOptions: any = {
    chart: { height: 280, type: "line", toolbar: { show: false } },
    stroke: { curve: "smooth", width: 2 },
    dataLabels: { enabled: false },
    series: [{ name: "Virements", data: [10, 20, 15, 30, 40, 25, 50] }],
    colors: ["#556ee6"],
    xaxis: { categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] },
    legend: { show: false },
    fill: { opacity: 1 }
  };

  // Form + Chat
  formData: FormGroup;
  chatSubmit: boolean = false;
  ChatData: ChatMessage[];
  sassEarning: Array<Object>;
  sassTopSelling: Array<Object>;

  constructor(
    private virementService: VirementService,
    private dashboardService: DashboardService,
    private formBuilder: FormBuilder,
    private configService: ConfigService
  ) {}

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Dashboards' }, { label: 'Saas', active: true }];

    // 🔹 Form
    this.formData = this.formBuilder.group({
      message: ['', [Validators.required]],
    });

    // 🔹 Virements
    this.virementService.getNombreTotal().subscribe(res => this.nombreTotal = res);
    this.virementService.getDashboard().subscribe(res => this.dashboardStats = res);
    this.virementService.getHistorique().subscribe(res => this.historique = res);
    this.virementService.getNombreParInstruction().subscribe(res => {
      this.salesAnalyticsDonutChart.series = [
        res.URGENT || 0,
        res.STANDARD || 0,
        res.RETARDABLE || 0
      ];
    });

    // 🔹 Effets
    this.dashboardService.getUserCount().subscribe(data => this.userCount = data);
    this.dashboardService.getEffetCount().subscribe(data => this.effetCount = data);

    this.dashboardService.getEffetByEtat().subscribe(data => {
      this.effetsEtat = data.map((item: any) => ({
        etat: item.etat ?? item[0],
        count: item.count ?? item[1]
      }));
      this.salesDonutChart = {
        series: this.effetsEtat.map(e => e.count),
        chart: { type: 'donut', height: 250 },
        labels: this.effetsEtat.map(e => e.etat),
        colors: ['#556ee6', '#34c38f', '#f46a6a', '#f1b44c', '#74788d', '#50a5f1'],
        legend: { position: 'bottom' },
        plotOptions: { pie: { donut: { size: '70%' } } }
      };
    });

    this.dashboardService.getEffetByType().subscribe(data => {
      this.effetsType = data.map((item: any) => ({
        typeEffet: item.typeEffet ?? item[0],
        effectCount: item.effectCount ?? item[1]
      }));
      this.EffetsTypeDonutChart = {
        series: this.effetsType.map(e => e.effectCount),
        chart: { type: 'donut', height: 400 },
        labels: this.effetsType.map(e => e.typeEffet),
        colors: ['#556ee6', '#34c38f'],
        legend: { position: 'right' },
        plotOptions: { pie: { donut: { size: '70%' } } }
      };
    });

    this.dashboardService.getEffetRecent().subscribe(data => {
      this.effetsDate = data.map((item: any) => ({
        date: item.date ?? item[0],
        count: item.count ?? item[1]
      }));
      const labels = this.effetsDate.map(e => new Date(e.date).toLocaleDateString());
      const seriesData = this.effetsDate.map(e => e.count);

      this.earningLineChart = {
        chart: { type: 'line', height: 250 },
        colors: ['#f46a6a'],
        stroke: { curve: 'smooth', width: 2 },
        dataLabels: { enabled: false },
        series: [{ name: 'Nombre d\'effets', data: seriesData }],
        xaxis: { categories: labels, title: { text: 'Date' } },
        yaxis: { title: { text: 'Effets' } }
      };
    });
  }

  ngAfterViewInit() {
    if (this.scrollRef) {
      this.scrollRef.SimpleBar.getScrollElement().scrollTop = 500;
    }
  }

  // 🔹 Scroll chat
  onListScroll() {
    if (this.scrollRef) {
      setTimeout(() => {
        this.scrollRef.SimpleBar.getScrollElement().scrollTop =
          this.scrollRef.SimpleBar.getScrollElement().scrollHeight + 1500;
      }, 500);
    }
  }

  // 🔹 Visitors chart filtre
  updateOptions(option: string) {
    this.activeOptionButton = option;
    if (option === '1m') {
      this.visitorsOptions.series = [{ name: "Virements", data: [5, 10, 15, 20] }];
    } else if (option === '6m') {
      this.visitorsOptions.series = [{ name: "Virements", data: [50, 60, 70, 80, 90, 100] }];
    } else if (option === '1y') {
      this.visitorsOptions.series = [{ name: "Virements", data: [200, 250, 300, 350, 400, 450, 500] }];
    } else {
      this.visitorsOptions.series = [{ name: "Virements", data: [10, 20, 15, 30, 40, 25, 50] }];
    }
  }


  get form() { return this.formData.controls; }
}
