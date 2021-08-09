import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Feedback } from '../shared/classes/feedback';
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
  feedback: any[] | undefined;
  loggedUserUsername: string | null | undefined;

  editForm = this.formBuilder.group({
    editText: ['',[Validators.required, Validators.minLength(3)]]
  })

  editEnabled: boolean | undefined;

  constructor(private formBuilder: FormBuilder, private api: FeedbackService, private router: Router, private ngZone: NgZone) { }

  ngOnInit(): void {
    this.loggedUserUsername = localStorage.getItem("loggedUserUsername");
    this.checkoutForm.reset();
    this.editEnabled=false;

    //populate feedback
    this.api.GetFeedback().subscribe(res => {
      this.ngZone.run(() => this.feedback = res)
    })
  }

  onSubmit(): void {
    const username = this.loggedUserUsername;
    if (username) {

      if (this.checkoutForm.invalid) {
        console.log('form in invalid');
        return;
      }
      const text = this.checkoutForm.value.feedbackText;

      this.api.AddFeedback({ username, text }).subscribe(res => {
        this.ngZone.run(() => this.ngOnInit())
      });
    }

  }

  enableEditing():void{
    this.editEnabled=true;
    console.log("editing enabled")
  }

  onEdit(f: any): void {

    

    const text = this.editForm.value.editText;
    console.log(text);
    const updatedFeedback = Object.assign({}, f);
    updatedFeedback.text = text;

    this.api.UpdateFeedback(f._id, updatedFeedback).subscribe(res => {
      this.ngZone.run(() => this.ngOnInit())
    });


  }

  onDelete(id: any): void {
    let result = confirm("Сигурни ли сте че искате да изтриете коментара?");
    if (result) {
      console.log('about to be deleted', id)
      this.api.DeleteFeedback(id).subscribe(res => {
        this.ngZone.run(() => this.ngOnInit())
      })
    }

  }


}
