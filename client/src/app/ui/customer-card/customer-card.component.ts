import {Component, Input} from '@angular/core';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-customer-card',
  templateUrl: './customer-card.component.html',
  imports: [
    NgIf
  ],
  styleUrls: ['./customer-card.component.scss']
})
export class CustomerCardComponent {
  @Input({required: true}) customer!: any;
  public showMore = false;

  constructor() { }
}
