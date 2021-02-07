import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'toolbar-component',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  @Output()
  findWater: EventEmitter<String> = new EventEmitter<String>();
  constructor() { }

  ngOnInit(): void {
  }
  
  public onClick(): void {

    this.findWater.emit();
  }
}
