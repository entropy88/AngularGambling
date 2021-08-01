import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Feedback } from '../shared/feedback';
import { FeedbackService } from '../shared/feedback.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  checkoutForm = this.formBuilder.group({
    feedbackText: ['', [Validators.required, Validators.minLength(3)]]
  });
  feedback:any[] | undefined;
  loggedUserUsername: string | null | undefined;

  constructor(private formBuilder: FormBuilder, private api: FeedbackService, private router: Router, private ngZone: NgZone) { }

  ngOnInit(): void {
    this.loggedUserUsername=localStorage.getItem("loggedUserUsername");
    this.checkoutForm.reset();

    //populate feedback
    this.api.GetFeedback().subscribe(res => {
      this.ngZone.run(() => this.feedback = res)
    })
  }

  onSubmit(): void {
    const username = this.loggedUserUsername;
    if (username) {
      
    if (this.checkoutForm.invalid ) { console.log('form in invalid');
    return; }
    const text = this.checkoutForm.value.feedbackText;   
   
      this.api.AddFeedback({ username, text }).subscribe(res => {
        this.ngZone.run(() => this.ngOnInit())
      });
    }
  
  }

  onDelete(id:any):void{
    console.log('about to be deleted', id)
    this.api.DeleteFeedback(id).subscribe(res=>{
      this.ngZone.run(()=>this.ngOnInit())
    })
  }

}
