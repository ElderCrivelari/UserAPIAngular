import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  responseData:any;

  constructor(private apiService: ApiService){}

  getModelData(){
    this.apiService.get('users').subscribe((data)=> {this.responseData = data});
    console.log("ResponseData : " + this.responseData);
    
  }
  
  ngOnInit(): void {
    console.log("Started");
    this.getModelData();
  }

}
