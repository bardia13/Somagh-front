import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

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
  shopId: string;
  @Output() confirmModal = new EventEmitter<boolean>();
  subscriptionShop: Subscription;



  constructor(private activeModal: NgbActiveModal,
    private spinner: NgxSpinnerService) { }

    ngOnInit() {
    

      this.initForm() ;
    }
    
  
    initForm() {
      this.userForm = new FormGroup({
        'titile' : new FormControl(null),
        'type' : new FormControl(null),
        'description' : new FormControl(null),
        'department' : new FormControl(null),
      })  
    
    
      
  
    }
  
    submit(){
      this.confirmModal.emit(false)
      this.activeModal.close()  
    }
}
