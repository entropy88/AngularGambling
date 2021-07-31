import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
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
    feedbackText: ''
  });
  feedback: Feedback[] | undefined;
  loggedUserUsername: string | null | undefined;

  constructor(private formBuilder: FormBuilder, private api: FeedbackService, private router: Router, private ngZone: NgZone) { }

  ngOnInit(): void {
    this.loggedUserUsername=localStorage.getItem("loggedUserUsername")

    //populate feedback
    this.api.GetFeedback().subscribe(res => {
      this.ngZone.run(() => this.feedback = res)
    })
  }

  onSubmit(): void {
    const text = this.checkoutForm.value.feedbackText;
    const email = this.loggedUserUsername;
    if (email) {
      this.api.AddFeedback({ email, text }).subscribe(res => {
        this.ngZone.run(() => this.ngOnInit())
      });
    }
  
  }

}
