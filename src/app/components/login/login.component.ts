import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  formLogin!: FormGroup;
  responseData:any;
 
  constructor(private formBuilder: FormBuilder,private apiService : ApiService, ){ }
  ngOnInit(): void {
    this.initForms();
  }
 
 
  getModelData(){
    this.apiService.get('users/'+ this.formLogin.controls).subscribe((data)=> {this.responseData = data});
    console.log("Responsedata:");
    console.log(this.responseData);
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
