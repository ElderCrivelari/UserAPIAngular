import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { error } from 'jquery';
import { ApiService } from 'src/app/services/api.service';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  responseData:any;
  formRegister!: FormGroup;
  infoVisible:boolean = false;
  infoTitle='';
  infoText='';
  infoType = 'alert-primary'

  constructor(private formBuilder: FormBuilder,
              private apiService: ApiService,
              private navService: NavigationService
              ){}

  postModelData(){
     let dataModel = this.createDataModel()

     this.apiService.post('users',dataModel).subscribe({
      next: (data)=>  {
                        this.responseData = data;
                        this.openInfoMessage("Sucesso!","Usuário cadastrado com sucesso!","alert-success");
                        this.navService.goToPage("Usuarios",data.id);
                      },
      error: (error) => {this.openInfoMessage("Erro!","Algum erro impediu de criar o seu usuário, tente novamente mais tarde!","alert-warning")}
     })
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
  password= this.getValueControl(this.formRegister,'password')):any
  {
    const dataModel = {name , email , password}
    return dataModel;
  }

  getValueControl(form: FormGroup , control: string){
    return form.controls[control].value;
  }

  openInfoMessage(title:string,text:string,alertType:string){
    this.infoTitle = title;
    this.infoText = text;
    this.infoType = alertType;
    this.infoVisible = true;
  }
  closeInfo(){
    this.infoVisible = false;
    this.infoTitle='';
    this.infoText='';
    this.infoType = 'alert-primary'
  }

  debug(message: string){
    console.log(message);
  }
  
}
