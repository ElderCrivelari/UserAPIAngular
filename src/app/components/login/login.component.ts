import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//import { data, error } from 'jquery';
//import { catchError, tap } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api.service';
import { NavigationService } from 'src/app/services/navigation.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  formLogin!: FormGroup;
  responseData:any;
  infoVisible:boolean = false;
  infoTitle='';
  infoText='';
  infoType = 'alert-primary'

 //Injeção de dependência no construtor
  constructor(private formBuilder: FormBuilder,
              private apiService : ApiService,
              private navService: NavigationService              
              ){ }
  
  
  ngOnInit(): void {
    this.initForms();
  }
 
  closeInfo(){
    this.infoVisible = false;
    this.infoTitle='';
    this.infoText='';
    this.infoType = 'alert-primary'
  }

  getModelData(){
    this.closeInfo();
    const email = this.formLogin.controls['email'].value;
    const password = this.formLogin.controls['password'].value;

    this.apiService.get('users/' + email + '/' + password ).subscribe({
        next : (data) =>{
                          this.responseData = data;
                          this.openInfoMessage("Sucesso!","Você conseguiu logar no sistema!","alert-success");
                          this.navService.goToPage("Usuarios",this.responseData.id);
                        },
        error: (error) => this.openInfoMessage("Erro!","As informações não conferem com um usuário cadastrado!","alert-danger")
    });
    
  }
  
  initForms(){
    this.formLogin = this.formBuilder.group({
      email:[null,[Validators.required, Validators.email]],
      password:[null,[Validators.required]]
    });
 }

  openInfoMessage(title:string,text:string,alertType:string){
    this.infoTitle = title;
    this.infoText = text;
    this.infoType = alertType;
    this.infoVisible = true;
  }

  debug(message: string){
    console.log(message);
  }
  
}
