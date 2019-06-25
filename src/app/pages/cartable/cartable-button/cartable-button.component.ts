import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';
import { Router } from '@angular/router';

@Component({
  selector: 'cartable-button',
  templateUrl: './cartable-button.component.html',
  styleUrls: ['./cartable-button.component.scss']
})
export class CartableButtonComponent implements ViewCell,OnInit {
  renderValue: string;
  mode: number = 0; // 1 : complete , 0 : unCompleted 
  private _rowData: any;
  @Input() value: string | number;
  sharingService: any;
  @Input() set rowData(rowData: any) {
    this._rowData = rowData;
    
  }
  constructor(private cd: ChangeDetectorRef,
    private router: Router) { }

  @Output() save: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
    this.renderValue = this.value.toString().toUpperCase();
    // console.log("erererer ::: ")
    // console.log(this._rowData)
  }

  onClick() {
    this.save.emit(this._rowData);
  }
  onViewClick() {
    this.save.emit(['View', this._rowData.id]);
  }
  onEditClick() {
    this.save.emit(['Edit', this._rowData.id]);
  }
  onConfigClick() {
    this.save.emit(['Config', this._rowData.id]);
  }
  onReferClick() {
    // console.log(this._rowData)
    this.save.emit(['Refer', this._rowData.id]);
  }
  onContinueClick() {
    // console.log("row : ")
    // console.log(this._rowData)
    this.save.emit(['registerContinue', this._rowData]);
  }
}
