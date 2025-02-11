import {Component, OnInit, ViewChild} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CustomerpanelApiService} from '../../shared/customerpanel-api.service';
import {ActivatedRoute} from '@angular/router';
import {NgForOf} from '@angular/common';
import {ShowDocumentModalComponent} from '../../ui/show-document-modal/show-document-modal.component';
import {AddDocumentModalComponent} from '../../ui/add-document-modal/add-document-modal.component';
import {TagsModalComponent} from '../../ui/tags-modal/tags-modal.component';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-detailoffer',
  imports: [
    FormsModule,
    NgForOf,
    ShowDocumentModalComponent,
    AddDocumentModalComponent,
    TagsModalComponent
  ],
  templateUrl: './detailoffer.component.html',
  styleUrl: './detailoffer.component.scss'
})
export class DetailofferComponent implements OnInit {
  @ViewChild(ShowDocumentModalComponent) showDocumentModalComponent!: ShowDocumentModalComponent;
  @ViewChild(AddDocumentModalComponent) addDocumentModalComponent!: AddDocumentModalComponent;
  @ViewChild(TagsModalComponent) tagsModalComponent!: TagsModalComponent;

  offer: any = {};
  customer: any = {};
  documents: any = [];
  createdByOffer: any = {};
  updatedByOffer: any = {};
  createdByCustomer: any = {};
  updatedByCustomer: any = {};
  comment: string = '';
  comments: any = [];
  userComment: any = {};
  tagsCount: any = {};

  constructor(private customerpanelApiService: CustomerpanelApiService,
              private route: ActivatedRoute,
              private toastr: ToastrService) {
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
        for (let i = 0; i < this.documents.length; i++) {
          this.customerpanelApiService.getTagsByDocumentId(this.documents[i].id).subscribe((tags) => {
            this.tagsCount[this.documents[i].id] = tags.length;
          });
        }
      });
      this.customerpanelApiService.getCommentsByOfferId(offerId).subscribe((comments) => {
        this.comments = comments;
        for (let i = 0; i < this.comments.length; i++) {
          this.customerpanelApiService.getUserById(this.comments[i].user).subscribe((user) => {
            this.userComment[this.comments[i].id] = user.user.name;
          });
        }
      });
    });
  }

  //Aufgabe 3
  openTagsModal(document: any) {
    this.tagsModalComponent.openModal(document);
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
      this.toastr.success('Dokument wurde gelöscht');
    });
  }

  addComment() {
    const data = {
      user: this.customerpanelApiService.user,
      text: this.comment,
      offerId: this.offer.id,
      createdBy: this.customerpanelApiService.user
    }
    this.customerpanelApiService.addComment(data).subscribe(() => {
      this.comment = '';
      this.toastr.success('Kommentar wurde hinzugefügt');
      window.location.reload();
    });
  }

  deleteComment(comment: any) {
    this.customerpanelApiService.deleteComment(comment.id).subscribe(() => {
      this.comments = this.comments.filter((com: { id: any; }) => com.id !== comment.id);
      this.toastr.success('Kommentar wurde gelöscht');
    });
  }
}
