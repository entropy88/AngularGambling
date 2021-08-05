import { NgZone } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Feedback } from '../shared/feedback';
import { FeedbackService } from '../shared/feedback.service';

@Component({
  selector: 'app-edit-feedback',
  templateUrl: './edit-feedback.component.html',
  styleUrls: ['./edit-feedback.component.css']
})
export class EditFeedbackComponent implements OnInit {
  checkoutForm = this.formBuilder.group({
    feedbackText: ['', [Validators.required, Validators.minLength(3)]]
  });
  feedback: Feedback | any;
  loggedUserUsername: string | null | undefined;
 

  constructor(private formBuilder: FormBuilder,private router: Router, private feedbackService:FeedbackService, private route: ActivatedRoute, private ngZone: NgZone) { 
    this.route.paramMap.subscribe(params => {
      this.ngOnInit();
  });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get("id");
    this.loggedUserUsername=localStorage.getItem("loggedUserUsername");    
    this.getFeedback().subscribe(() => {
      console.log('ngOnit after getFeedback() ' + this.feedback);
    });
   this.checkoutForm = this.formBuilder.group({
    feedbackText: ['', [Validators.required, Validators.minLength(3)]]
  });


  }

  getFeedback(): any {
    const id = this.route.snapshot.paramMap.get("id");
  if (id) {
 
    return this.feedbackService
      .getFeedbackById(id)
      .pipe(
        map(
          (data) => {
            this.feedback = data;

          }))

  }

}

onSubmit():void{
 
  if (this.loggedUserUsername==this.feedback.username) {

    if (this.checkoutForm.invalid) {
      console.log('form in invalid');
      return;
    }
    const text = this.checkoutForm.value.feedbackText;
    console.log(text);
    const updatedFeedback=Object.assign({},this.feedback);
    updatedFeedback.text=text;

    this.feedbackService.UpdateFeedback(this.feedback._id, updatedFeedback).subscribe(res => {
      this.ngZone.run(() => this.router.navigateByUrl('/feedback'))
    });
  }

}
}
