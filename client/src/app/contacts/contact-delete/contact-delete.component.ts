import { Component, OnInit } from '@angular/core';
import { ContactListService } from 'src/app/services/contact-list.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute } from '@angular/router';

import { Contact } from 'src/app/models/contact';

@Component({
  selector: 'app-contact-delete',
  templateUrl: './contact-delete.component.html',
  styleUrls: ['./contact-delete.component.css']
})
export class ContactDeleteComponent implements OnInit {
  title: string;
  contact: Contact;

  constructor(
    private contactListService: ContactListService,
    private flashMessage: FlashMessagesService,
    private route: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.title = this.activatedRoute.snapshot.data.title;
    this.contact = new Contact();

    //fills in the contact id property from the URL
    this.activatedRoute.params.subscribe(params => {
      this.contact._id = params.id;
    });

    this.deleteContact(this.contact);
  }

  deleteContact(contact: Contact): void {
    this.contactListService.deleteContact(contact).subscribe(data => {
      if (data.success) {
        this.flashMessage.show(data.msg, { cssClass: 'alert-warning', timeOut: 3000 });
        this.route.navigate(['/contact/contact-list']);
      }
    else{
      this.flashMessage.show('Delete Contact Failed', {cssClass: 'alert-danger', timeOut: 3000});
      this.route.navigate(['/contact/contact-list']);
    }
    });


  }

}
