import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {


  profileForm: FormGroup;
  profileSubscription: Subscription;
  firstLoad = true;
  pageTitle: string = "پروفایل کاربر";
  userInfo: {} = {}
  $border_color = "#dedbdb"
  profilePut_subscription: Subscription;

  constructor(
    private router: Router,
    ) { }

  ngOnInit() {

    
    console.log("profile component");
    this.initForm();
    
  }
  initForm() {
    if (this.userInfo['profile'] == undefined) {
      this.firstLoad = false;
      this.profileForm = new FormGroup({
        'username': new FormControl(null, [Validators.required]),
        'email': new FormControl(null, [Validators.required, Validators.email]),
        'phone': new FormControl(null, [Validators.pattern('^0[0-9]{10,10}$')]),
        'fullName': new FormControl(null, [Validators.required, Validators.minLength(5), Validators.pattern('')]),
        'studentID': new FormControl(null),
      })
    } else {
      console.log("init profile form : ")
      console.log(this.userInfo)
      this.profileForm = new FormGroup({
        'username': new FormControl({ value: this.userInfo['username'], disabled: true }, Validators.required),
        'email': new FormControl({ value: this.userInfo['username'], disabled: true }, [Validators.required, Validators.email]),
        'phone': new FormControl(this.userInfo['profile']['phoneNumber'], [Validators.pattern('^0[0-9]{10,10}$')]),
        'fullName': new FormControl(this.userInfo['profile']['fullName'], [Validators.required, Validators.minLength(5), Validators.pattern('[\u0621-\u0628\u062A-\u063A\u0641-\u0642\u0644-\u0648\u064E-\u0651\u0655\u067E\u0686\u0698\u06A9\u06AF\u06BE\u06CC\u0020\u2000-\u200F\u2028-\u202F]*$')]),
        'studentID': new FormControl(this.userInfo['studentID']),
      })
    
    }
  }

  onChangeClick(){
    this.router.navigate(['pages/edit-profile']);
  }

  onSubmit() {
    if (this.profileForm.status == "VALID") {
      console.log("profile form submited")
      console.log(this.profileForm.value);
      
      this.userInfo = {
        username: this.userInfo['username'],
        email: this.userInfo['email'],
        profile: {
          fullName: this.profileForm.value['fullName'],
          phoneNumber: this.profileForm.value['phone'],
          // melliCode: this.profileForm.value['nationalCode'],
          proPic: this.profileForm.value['profilePic']
        }
      };
    
      this.ngOnInit();
      this.initForm();
    } else {

    }
  }



  // afuConfig = {
  //   multiple: false,
  //   formatsAllowed: ".jpg,.png",
  //   maxSize: "1",
  //   uploadAPI: {
  //     url: "https://example-file-upload-api",
  //     headers: {
  //       "Content-Type": "text/plain;charset=UTF-8",
  //       //  "Authorization" : `Bearer ${token}`
  //     }
  //   },
  //   theme: "attachPin",
  //   // hideProgressBar: true,
  //   hideResetBtn: true,
  //   hideSelectBtn: true
  // };
  // picUp_clicked() {
  //   let up_btn = <HTMLElement>document.getElementsByClassName("up_btn")[0];
  //   up_btn.click();
  // }



  /**
   * check nationalcode
   */
  isValidNationalCode() {

    let nationalCode = this.profileForm.value['nationalCode'];

    //در صورتی که کد ملی وارد شده تهی باشد
    if (nationalCode == null || nationalCode == "" || nationalCode == undefined)
      return true;

    //در صورتی که کد ملی وارد شده طولش کمتر از 10 رقم باشد
    // if (nationalCode.Length != 10)
    //     return false;

    //در صورتی که کد ملی ده رقم عددی نباشد
    // var regex = new Regex(@"\d{10}");
    // if (!regex.IsMatch(nationalCode))
    //   throw new Exception("کد ملی تشکیل شده از ده رقم عددی می‌باشد؛ لطفا کد ملی را صحیح وارد نمایید");

    //در صورتی که رقم‌های کد ملی وارد شده یکسان باشد
    var allDigitEqual = ["0000000000", "1111111111", "2222222222", "3333333333", "4444444444", "5555555555", "6666666666", "7777777777", "8888888888", "9999999999"];
    if (allDigitEqual.indexOf(nationalCode) != -1) return false

    console.log("national code : ");
    var num0 = +nationalCode[0] * 10;
    var num2 = +nationalCode[1] * 9;
    var num3 = +nationalCode[2] * 8;
    var num4 = +nationalCode[3] * 7;
    var num5 = +nationalCode[4] * 6;
    var num6 = +nationalCode[5] * 5;
    var num7 = +nationalCode[6] * 4;
    var num8 = +nationalCode[7] * 3;
    var num9 = +nationalCode[8] * 2;
    var a = +nationalCode[9];

    var b = num0 + num2 + num3 + num4 + num5 + num6 + num7 + num8 + num9;
    var c = b % 11;
    if (!(((c < 2) && (a == c)) || ((c >= 2) && ((11 - c) == a)))) {
      this.$border_color = '#ee5757';
    }
    return (((c < 2) && (a == c)) || ((c >= 2) && ((11 - c) == a)));
  }

  ngOnDestroy(): void {
    console.log("profile destroy");
    // console.log(this.profilePut_subscription);
    // this.profilePut_subscription.unsubscribe();
  }
}
