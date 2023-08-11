import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  responseData:any;
  formRegister!: FormGroup;
 
  constructor(private formBuilder: FormBuilder,private apiService: ApiService){}

  postApiData(){
     this.createDataModel()
  }
  

  ngOnInit(): void {
    this.initForms();
  }
 
  initForms(){
    this.formRegister = this.formBuilder.group({
      name:[null,Validators.required],
      email:[null,[Validators.required, Validators.email]],
      password:[null,Validators.required]
    });
  }

  createDataModel(name = this.getValueControl(this.formRegister,'name'),
  email= this.getValueControl(this.formRegister,'email'),
  password= this.getValueControl(this.formRegister,'password'))
  {
    const dataModel = {name , email , password}
    return dataModel;
  }

  getValueControl(form: FormGroup , control: string){
    return form.controls[control].value;
  }

  debug(message: string){
    console.log(message);
  }
  
}
