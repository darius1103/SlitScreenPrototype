import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.scss']
})
export class InputFieldComponent implements OnInit {
  @Output() public configuration = new EventEmitter<String>();
  currentConfiguration = '';

  constructor() { }

  ngOnInit() {
    this.currentConfiguration = '((-v50-)h50(-v33-v66-))v50-v66(-h50-)';
  }

  onChange(): void {
    this.configuration.emit(this.currentConfiguration);
  }
}
