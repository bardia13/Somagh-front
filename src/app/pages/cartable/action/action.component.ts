import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { OperationsService } from '../../../@core/data/operations.service'
import { Subscription } from 'rxjs/Subscription';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss']
})
export class ActionComponent implements OnInit {
  case = 0;
  modalHeader: string;
  modalContent = `درحال احراز هویت...`;
  userForm : FormGroup;
  disabled: boolean;
  textColor: string;
  deleteSubscribtion: Subscription;
  departmentSubscription: Subscription;
  staffSubscription : Subscription;
  createSubscription : Subscription;
  @Output() confirmModal = new EventEmitter<boolean>();
  subscriptionShop: Subscription;
  departments : Array<{}> = []
  staffs : Array<{}> = []
  
  constructor(private activeModal: NgbActiveModal,
    private spinner: NgxSpinnerService,
    private operationsService: OperationsService,) {
      this.initForm() ;
     }

    ngOnInit() {
      this.staffSubscription = this.operationsService.staffListGet().subscribe(
        result=>{
          var arr =result as Array<{}>
          console.log(arr)
          arr.forEach(element => {
            this.staffs = [...this.staffs, {"id" : element["id"], "name": element["first_name"] + " " + element["last_name"]}]
          });
          console.log(this.staffs)
        }
      )
      this.departmentSubscription = this.operationsService.departmentsListGet().subscribe(result=>
        {
          console.log(result)
          var arr = result as Array<{}>
          arr.forEach(element => {
            this.departments = [...this.departments, {"id" : element['id'], "name" : element['name']}]
          });
          console.log(this.departments)
        })
     
    }
    
  
    initForm() {
      this.userForm = new FormGroup({
        'receiver' : new FormControl(null),
        'description' : new FormControl(null),
        'case' : new FormControl(null),
      })  
    
    }
  
    submit(){
      this.userForm.patchValue({'case' : this.case})
      console.log(this.userForm.value)
      this.createSubscription = this.operationsService.actionPost(this.userForm.value).subscribe(
        result =>{
          console.log(result)
        },
        error=>{
          console.log(error)
        }
      )
      this.confirmModal.emit(false)
      this.activeModal.close()  
    }

    onReceiverChange(event){
      console.log(event)
      this.userForm.patchValue({'department': event['id']})
    }

}
