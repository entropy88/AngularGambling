import { Component, NgZone, OnInit } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { DownloadPdfService } from '../shared/download-pdf.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  registeredUsers: Number|any;
  blob: Blob | any;
 

  constructor(private api:ApiService,private ngZone: NgZone, private downloadPdfService:DownloadPdfService) { }

  ngOnInit(): void {
    //get number of registered users

    this.api.GetUsers().subscribe(res => {
      this.ngZone.run(() => this.registeredUsers = res);
    })
  
  }

  downloadPdf():void{
    this.downloadPdfService.getPdf().subscribe((data:any) => {

      this.blob = new Blob([data], {type: 'application/pdf'});
    
      var downloadURL = URL.createObjectURL(data);
      var link = document.createElement('a');
      link.href = downloadURL;
      link.download = "book.pdf";
      link.click();
    
    });
    
  }
  

}
