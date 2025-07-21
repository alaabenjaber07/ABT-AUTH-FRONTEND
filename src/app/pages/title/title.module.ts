// utility.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter'; // Add this
import { NgbNavModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap'; // Add NgbPaginationModule
import { CarouselModule } from 'ngx-owl-carousel-o';
import { UIModule } from '../../shared/ui/ui.module';
import { TitleRoutingModule } from './title-routing.module';
import { WidgetModule } from "../../shared/widget/widget.module";
import { TitleListComponent } from './title-list/title-list.component';
import { AddTitleComponent } from './add-title/add-title.component';

@NgModule({
  declarations: [TitleListComponent, AddTitleComponent],
  imports: [
    CommonModule,
    TitleRoutingModule,
    UIModule,
    NgbNavModule,
    NgbPaginationModule, // Add for pagination (if used)
    FormsModule,
    Ng2SearchPipeModule, // Add for filter pipe
    CarouselModule,
    WidgetModule
]
})
export class TitleModule { }