import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faqs',
  templateUrl: './add-title.component.html',
  styleUrls: ['./add-title.component.scss']
})

/**
 * Utility FAQs component
 */
export class AddTitleComponent implements OnInit {
  // bread crumb items
  breadCrumbItems: Array<{}>;

  constructor() { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Title' }, { label: 'Add', active: true }];
  }
}
