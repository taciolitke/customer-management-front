import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationsModule } from './navigations/navigations.module';
import { LocationService } from './locations/location.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NavigationsModule,
  ],
  exports: [NavigationsModule],
  providers: [LocationService]
})
export class SharedModule { }
