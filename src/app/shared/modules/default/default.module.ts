import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AutofocusDirective} from './directive/AutofocusDirective';

@NgModule({
  declarations: [AutofocusDirective],
  exports: [
    AutofocusDirective
  ],
  imports: [
    CommonModule
  ]
})
export class DefaultModule { }
