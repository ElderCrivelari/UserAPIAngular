import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-info-message',
  templateUrl: './info-message.component.html',
  styleUrls: ['./info-message.component.scss']
})
export class InfoMessageComponent {
  @Input() modalTitle: string =''; //o Input serve para definir os campos como alteráveis por outro componente 
  @Input() modalText: string ='';

  
}
