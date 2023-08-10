import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  formLogin!: FormGroup;
 
  constructor(private formBuilder: FormBuilder){

  }
  ngOnInit(): void {
    this.initForms();
  }
 
  initForms(){
    this.formLogin = this.formBuilder.group({
      email:[null,[Validators.required, Validators.email]],
      password:[null,[Validators.required]]

    });
 }

  debug(message: string){
    console.log(message);
  }
  
}
