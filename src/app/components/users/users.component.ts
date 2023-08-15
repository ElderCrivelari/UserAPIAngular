import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  formUser!: FormGroup;
  responseData:any;
  infoVisible:boolean = false;
  infoTitle='';
  infoText='';
  infoType = 'alert-primary'
  
  constructor(private apiService: ApiService,
              private routeParams: ActivatedRoute,
              private formBuilder: FormBuilder,
              private datePipe: DatePipe
              ){}

  getModelData(uId:string){
    this.apiService.get('users/' + uId).subscribe({
      next: (data) => {
                        this.responseData = data;
                        this.formUser = this.formBuilder.group({
                          name: [this.responseData.name,[Validators.required]],
                          email: [this.responseData.email,[Validators.required,Validators.email]],
                          password: [{value: this.responseData.password , disabled:true},[Validators.required]],
                          cDate:[{value: this.dateFormat(this.responseData.creationDate) , disabled:true},Validators.required]
                        });
                      }     
    });
  }

  putModelData(uId: number){
      let jsonData = this.prepareModelData();
      console.log(jsonData);
      this.apiService.put('users/' + uId,jsonData).subscribe({
        next: () => {this.openInfoMessage("Sucesso!","Você alterou seus dados","alert-success");},
        error: () => {this.openInfoMessage("Erro!","Seus dados não foram alterados","alert-danger");}
      });
  }
  
  prepareModelData():object{
    const jsonData = {
      name:this.formUser.controls['name'].value,
      email:this.formUser.controls['email'].value,
      password:this.formUser.controls['password'].value
    };

    return jsonData;
    
  }

  ngOnInit(): void {
    
    let uId = "";
    this.routeParams.queryParams.subscribe(params => {
      uId = params['uId'];
    });
    this.getModelData(uId);
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

  dateFormat(date:string): string{
    const dateFormatted = new Date(date);
    return this.datePipe.transform(dateFormatted,'dd-MM-yyyy HH:mm') || '';
  }

}


