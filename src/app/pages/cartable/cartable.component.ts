import { Component, OnInit } from '@angular/core';
import { PipeTransform } from '@angular/core';
import { EnglishNumToPersianPipe } from './../../@theme/pipes/english-num-to-persian.pipe';
import { NumberWithCommaPipe } from './../../@theme/pipes/number-with-commas.pipe';
import { LocalDataSource } from 'ng2-smart-table';
import { OperationsService } from '../../@core/data/operations.service'
import { Subscription } from 'rxjs/Subscription';
import { JalaaliPipe } from '../../@theme/pipes/jalaali.pipe'
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { CartableButtonComponent} from './cartable-button/cartable-button.component'
import * as moment from 'moment-jalaali';
import {ActionComponent} from './action/action.component'


@Component({
  selector: 'cartable',
  templateUrl: './cartable.component.html',
  styleUrls: ['./cartable.component.scss'],
  entryComponents :[
    CartableButtonComponent,
    ActionComponent,
  ]
})
export class CartableComponent implements OnInit {
  pageTitle = 'کارتابل'
  source: LocalDataSource
  mode: number; // 1 : site list , 2 : site view, 3 : site edit 
  router: Router;
  listSubscription : Subscription ;
  
  

  constructor(private modalService: NgbModal,
    private spinner: NgxSpinnerService,
    router: Router,
    private operationsService: OperationsService) {
    this.router = router;
  }

  ngOnInit() {
    this.initTable();
  }

  issueFilter: FormGroup;
  jalaaliPipe: JalaaliPipe;
  startDate = "";
  endDate = "";
  today: any;

  status = [{
    id : 1,
    status : "در حال بررسی"
  },
  {
    id : 2,
    status : "انجام شده"
  },
  {
    id : 3,
    status : "لغو شده"
  }]


  data = [{
    title : "تست",
    type : "انتقاد",
    description : "این یک تست است",
    department : "مدیریت",
    status :  "در حال بررسی"
  },
  {
    title : "تست",
    type : "انتقاد",
    description : "این یک تست است",
    department : "مدیریت",
    status :  "در حال بررسی"
  },
  {
    title : "تست",
    type : "انتقاد",
    description : "این یک تست است",
    department : "مدیریت",
    status :  "در حال بررسی"
  },
  {
    title : "تست",
    type : "انتقاد",
    description : "این یک تست است",
    department : "مدیریت",
    status :  "در حال بررسی"
  },]


  initTable(){
    this.listSubscription = this.operationsService.referListGet().subscribe(
      result=>{
        console.log(result)
        var arr = result as Array<{}>
        this.source = new LocalDataSource(arr)
      }
    )
    // this.source = new LocalDataSource(this.data)
    this.spinner.hide();
  }

  jalaali = require('jalaali-js')
  //filters :
  initFilters() {
    let shop = null;


    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    let day: string, month: string;

    if (dd < 10) {
      day = '0' + dd
    } else
      day = dd.toString();

    if (mm < 10) {
      month = '0' + mm
    } else
      month = mm.toString();

    let t = yyyy + '/' + month + '/' + day;
    var todayDate = moment(t, 'YYYY/MM/DD').locale('fa').format('jYYYY/jMM/jDD');
    this.setDateConf(todayDate);
  }


  filter: {
    fromDate: string,
    toDate: string,
    status: string,
  } = {
      fromDate: null,
      toDate: null,
      status: null
    }

  today_date = moment("", 'jYYYY/jMM/jDD');
  startDateConfig = {
    'max': this.today_date,
  }
  endDateConfig = {
    'min': '',
    'max': this.today_date
  }

  setDateConf(todayDate: string) {
    console.log("setDateConf => today:" + todayDate);

    this.today_date = moment(todayDate, 'jYYYY/jMM/jDD');
    this.startDateConfig = {
      'max': this.today_date,
    }
    this.endDateConfig = {
      'min': '',
      'max': this.today_date
    }
  }

  setStartDateConfig(max: any) {
    console.log("setStartDateConfig => max:" + max);

    this.startDateConfig = {
      'max': max
    }
  }
  setEndDateConfig(min: any) {
    console.log("setEndDateConfig => min:" + min);
    // this.endDateConfig = {
    //   'min': min,
    //   'max': this.today_date
    // }
  }

  startDate_change() {
    if (this.startDate) {
      let y = this.startDate.substring(0, 4);
      let m = this.startDate.substring(5, 7);
      let d = this.startDate.substring(8, 10);
      let temp = this.jalaali.toGregorian(+y, +m, +d);
      y = JSON.stringify(temp.gy);
      m = JSON.stringify(temp.gm);
      d = JSON.stringify(temp.gd);
      if (m.length < 2) {
        m = '0' + m;
      }
      if (d.length < 2) {
        d = '0' + d;
      }
      let milady_Sdate = y + '-' + m + '-' + d;
      let min_date = moment(this.startDate, 'jYYYY/jMM/jDD');
      if (this.startDate) {
        this.setEndDateConfig(min_date);
      }
      this.filter.fromDate = milady_Sdate;
    }
  }

  endDate_change() {
    if (this.endDate) {
      let y = this.endDate.substring(0, 4);
      let m = this.endDate.substring(5, 7);
      let d = this.endDate.substring(8, 10);
      let temp = this.jalaali.toGregorian(+y, +m, +d);
      y = JSON.stringify(temp.gy);
      m = JSON.stringify(temp.gm);
      d = JSON.stringify(temp.gd);
      if (m.length < 2) {
        m = '0' + m;
      }
      if (d.length < 2) {
        d = '0' + d;
      }
      let milady_Edate = y + '-' + m + '-' + d;
      let max_date = moment(this.endDate, 'jYYYY/jMM/jDD');
      this.setStartDateConfig(max_date);

      this.filter.toDate = milady_Edate;
     
    }
  }

  actions(instance) {
    instance.mode = this.mode;
    instance.router = this.router;
    instance.save.subscribe(row => {
      // console.log(row[0])
      if (row[0] == 'Edit') {
        //this.mode = 3 ;
        this.router.navigate(['/pages/site/list/edit'], { queryParams: { "shopId": String(row[1]) } });
        // console.log("Edit")
      }
      else if (row[0] == 'Refer') {
        console.log(row)
        this.showStaticModal(row[1]) ;
      }
    });
  }

  settings = {
    pager: {

    },
    hideSubHeader: true,
    actions: false,
    noDataMessage: "درخواستی یافت نشد!",
    columns: {
      id:{
        title: 'شماره',
        type: 'string'
      },
      receiver: {
        title: 'دریافت کننده',
        type: 'string',
      },
      sender: {
        title: 'ارسال کننده',
        type:'string'
      },
      date: {
        title: 'تاریخ',
        type: 'string',
      },
      description: {
        title: 'توضیح',
        type: 'string',
      },
      
      button: {
        title: 'عملیات',
        type: 'custom',
        filter: false,
        width: '20%',
        renderComponent: CartableButtonComponent,
        onComponentInitFunction: this.actions.bind(this)
      },
    },
  };
  onCustom(event) {
    alert(`Custom event '${event.action}' fired on row №: ${event.data.id}`)
  }
  showStaticModal(caseId) {
    const activeModal = this.modalService.open(ActionComponent, {
      size: 'lg',
      backdrop: 'static',
      container: 'nb-layout',
    });
    activeModal.componentInstance.case = caseId;

  }

  

}
