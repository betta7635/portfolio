import { Component, OnInit } from '@angular/core';
import { resetFakeAsyncZone } from '@angular/core/testing';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ContactService } from './contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  formData: FormGroup;

  constructor(private builder: FormBuilder, private service: ContactService) { }

  ngOnInit(): void {
    this.formData = this.builder.group({
      name: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.compose([Validators.required, Validators.email])]),
      message: new FormControl(null, [Validators.required]),
    });
  }

  onSubmit(formData) {
    console.log(formData);
    this.service.postMessage(formData).subscribe(response => {
      location.href = 'https://mailthis.to/confirm'
      console.log(response)
    }, error => {
      console.warn(error.responseText)
      console.log({ error })
    });
    formData.resetForm();
  }
}
