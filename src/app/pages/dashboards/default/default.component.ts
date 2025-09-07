import { Component, OnInit, ViewChild,Input } from '@angular/core';
import { emailSentBarChart, monthlyEarningChart } from './data';
import { ChartType } from './dashboard.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EventService } from '../../../core/services/event.service';
import {ApexNonAxisChartSeries,ApexPlotOptions,ApexChart,ApexStroke, ApexFill, ApexResponsive,ApexDataLabels
} from 'ng-apexcharts';
import { ConfigService } from '../../../core/services/config.service';
import { DashboardService } from '../../../core/services/dashboard.service';



@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})

export class DefaultComponent implements OnInit {
  @ViewChild('content') content;
  

  constructor(private modalService: NgbModal, private configService: ConfigService, private eventService: EventService) {
  }

  ngOnInit() {

    
  }

  
}
