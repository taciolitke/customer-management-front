import { Component, OnInit } from '@angular/core';
import { ContactService } from '../contacts/shared/contact.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  contactsTotal: number;

  constructor(private contactService: ContactService) { }

  ngOnInit() {
    this.contactService.count().subscribe(result => {
      this.contactsTotal = result.data;
    });
  }

}
