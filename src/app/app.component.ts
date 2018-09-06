import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ng-Forms-Demo';

  public rForm: FormGroup;
  public post: any;    // a property for our submitted form
  public description: string = '';
  public name: string = '';
  public requiredFieldAlert: string = 'This field is required.';
  public textAreaDescriptionFieldAlert = 'You must specify a description that is between 30 and 500 characters.';
  constructor(private fb: FormBuilder){
    this.rForm = fb.group({
      'name': [null, Validators.required],
      'description': [null, Validators.compose([Validators.required, Validators.minLength(30), Validators.maxLength(500)])],
      'phone': [null],
      'validate': ''
    })
  }

  ngOnInit(){
    this.rForm.get('validate').valueChanges.subscribe(
      (validate) => {
        if (validate == '1')
        {
          this.rForm.get('name').setValidators([Validators.required, Validators.minLength(3)]);
          this.requiredFieldAlert = "You need to specify at least 3 characters.";
        }
        else
        {
          this.rForm.get('name').setValidators(Validators.required);
          this.requiredFieldAlert = "This field is required.";
        }

        this.rForm.get('name').updateValueAndValidity();
      }
    )
  }


  addPost(post){
    this.description = post.description;
    this.name = post.name;
  }

}
