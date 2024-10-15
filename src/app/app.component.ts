import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { CustomValidator } from './custom-validators/noSpaceAllowed.validator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'advanced-reactive';
  formStatus:string ='';

  get skills() {
    return this.registrationForm.get('skills') as FormArray
  }

  get experiences() {
    return this.registrationForm.get('experiences') as FormArray
  }
  registrationForm!: FormGroup

  ngOnInit(): void {
    this.initForm()
    this.chekStatus()
  }

  public initForm() {
    this.registrationForm = new FormGroup({
      firstName: new FormControl('', [Validators.required,CustomValidator.noSpaceAllowed as ValidatorFn]),
      lastName:new FormControl('', Validators.required),
      motherName: new FormControl(''),
      FatherName:new FormControl(''),
      emailId:new FormControl(''),
      dob:new FormControl(''),
        Address: new FormGroup({
          address: new FormControl(''),
          gender: new FormControl(''),
          state:new FormControl(''),
          city:new FormControl(''),
          pincode:new FormControl(''),
        }),
         skills: new FormArray([
          new FormControl(''),
          new FormControl('')
         ]),
         experiences: new FormArray([
           new FormGroup({
            companyname:new FormControl(''),
            experience: new FormControl('')
           })

         ])
    })
  }

  public chekStatus() {
    this.registrationForm.statusChanges.subscribe((value) =>{
       this.formStatus = value
       console.log(value)
    })
  }

  public register() {
    console.log(this.registrationForm)
  }
  public reset() {
    this.registrationForm.reset();
  }

  addSkills() {
    (this.registrationForm.get('skills') as FormArray).push(new FormControl(''))
  }
  delete(index:number) {
   (this.registrationForm.get('skills') as FormArray).removeAt(index);
  }
  addExperience() {
    const newControl = new FormGroup({
      companyname:new FormControl(''),
      experience: new FormControl('')
     })
    this.experiences.push(newControl)
  }
  deleteExp(index:number) {
    this.experiences.removeAt(index)
  }
}
