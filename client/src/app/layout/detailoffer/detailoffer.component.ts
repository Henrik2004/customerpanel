import {Component, OnInit, ViewChild} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CustomerpanelApiService} from '../../shared/customerpanel-api.service';
import {ActivatedRoute} from '@angular/router';
import {NgForOf} from '@angular/common';
import {ShowDocumentModalComponent} from '../../ui/show-document-modal/show-document-modal.component';
import {AddDocumentModalComponent} from '../../ui/add-document-modal/add-document-modal.component';

@Component({
  selector: 'app-detailoffer',
  imports: [
    FormsModule,
    NgForOf,
    ShowDocumentModalComponent,
    AddDocumentModalComponent
  ],
  templateUrl: './detailoffer.component.html',
  styleUrl: './detailoffer.component.scss'
})
export class DetailofferComponent implements OnInit {
  @ViewChild(ShowDocumentModalComponent) showDocumentModalComponent!: ShowDocumentModalComponent;
  @ViewChild(AddDocumentModalComponent) addDocumentModalComponent!: AddDocumentModalComponent;

  offer: any = {};
  customer: any = {};
  documents: any = [];
  createdByOffer: any = {};
  updatedByOffer: any = {};
  createdByCustomer: any = {};
  updatedByCustomer: any = {};

  constructor(private customerpanelApiService: CustomerpanelApiService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const offerId = params['id'];
      this.customerpanelApiService.getOfferById(offerId).subscribe((offer) => {
        this.offer = offer.offer;
        this.customerpanelApiService.getCustomerById(this.offer.customerId).subscribe((customer) => {
          this.customer = customer.customer;
          this.customerpanelApiService.getUserById(this.customer.createdBy).subscribe((user) => {
            this.createdByCustomer = user.user.name;
          });
          this.customerpanelApiService.getUserById(this.customer.updatedBy).subscribe((user) => {
            this.updatedByCustomer = user.user.name;
          });
        });
        this.customerpanelApiService.getUserById(this.offer.createdBy).subscribe((user) => {
          this.createdByOffer = user.user.name;
        });
        this.customerpanelApiService.getUserById(this.offer.updatedBy).subscribe((user) => {
          this.updatedByOffer = user.user.name;
        });
      });
      this.customerpanelApiService.getDocumentsByOfferId(offerId).subscribe((documents) => {
        this.documents = documents;
      });
    });
  }

  openAddDocumentModal() {
    this.addDocumentModalComponent.openModal(this.offer.id);
  }

  openDocument(document: any) {
    this.showDocumentModalComponent.openModal(document);
  }

  deleteDocument(document: any) {
    this.customerpanelApiService.deleteDocument(document.id, {offerId: this.offer.id}).subscribe(() => {
      this.documents = this.documents.filter((doc: { id: any; }) => doc.id !== document.id);
    });
  }
}
