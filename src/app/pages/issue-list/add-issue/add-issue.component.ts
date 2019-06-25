import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { OperationsService } from '../../../@core/data/operations.service'
import { Subscription } from 'rxjs/Subscription';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'ngx-add-issue',
  templateUrl: './add-issue.component.html',
  styleUrls: ['./add-issue.component.scss']
})
export class AddIssueComponent implements OnInit {

  modalHeader: string;
  modalContent = `درحال احراز هویت...`;
  userForm : FormGroup;
  disabled: boolean;
  textColor: string;
  deleteSubscribtion: Subscription;
  departmentSubscription: Subscription;
  createSubscription : Subscription;
  shopId: string;
  @Output() confirmModal = new EventEmitter<boolean>();
  subscriptionShop: Subscription;
  departments : Array<{}> = []
  status = [{
    id : "C",
    status : "شکایت"
  },
  {
    id : "R",
    status : "درخواست"
  },
  {
    id : "C",
    status : "انتقاد"
  },{
    id : "S",
    status : "پیشنهاد"
  }]

  constructor(private activeModal: NgbActiveModal,
    private spinner: NgxSpinnerService,
    private operationsService: OperationsService) {
      this.initForm() ;
     }

    ngOnInit() {
    
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
        'title' : new FormControl(null),
        'type' : new FormControl(null),
        'description' : new FormControl(null),
        'department' : new FormControl(null),
      })  
    
    }
  
    submit(){
      console.log(this.userForm.value)
      this.createSubscription = this.operationsService.createCase(this.userForm.value).subscribe(
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

    onTypeChange(event){
      console.log(event)
    }
    onDescChange(event){
      console.log(event)
      this.userForm.patchValue({'department': event['id']})
    }
}
