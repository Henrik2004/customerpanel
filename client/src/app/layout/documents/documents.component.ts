import {Component, OnInit, ViewChild} from '@angular/core';
import {CustomerpanelApiService} from '../../shared/customerpanel-api.service';
import {NgForOf} from '@angular/common';
import {ShowDocumentModalComponent} from '../../ui/show-document-modal/show-document-modal.component';
import {TagsModalComponent} from '../../ui/tags-modal/tags-modal.component';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  imports: [
    NgForOf,
    ShowDocumentModalComponent,
    TagsModalComponent,
    FormsModule
  ],
  styleUrl: './documents.component.scss'
})
export class DocumentsComponent implements OnInit {
  @ViewChild(ShowDocumentModalComponent) showDocumentModalComponent!: ShowDocumentModalComponent;
  @ViewChild(TagsModalComponent) tagsModalComponent!: TagsModalComponent;
  documents: any[] = [];
  search: string = '';

  constructor(private customerpanelApiService: CustomerpanelApiService) {
  }

  ngOnInit() {
    this.customerpanelApiService.getDocuments().subscribe((data: any) => {
      this.documents = data;
    });
  }

  //Aufgabe 3
  openTagsModal(document: any) {
    this.tagsModalComponent.openModal(document);
  }

  openDocument(document: any) {
    this.showDocumentModalComponent.openModal(document);
  }

  searchDocuments() {
    const search = this.search.toLowerCase().split(',').map((tag: string) => tag.trim());
    this.customerpanelApiService.processTags(search).subscribe((data: any) => {
      this.customerpanelApiService.getProcess(data.lro.id).subscribe((data: any) => {
        const documentsData = data.lro.payload;
        for (let i = 0; i < documentsData.length; i++) {
          this.customerpanelApiService.getDocumentById(documentsData[i].id).subscribe((data: any) => {
            this.documents = [];
            this.documents.push(data);
          });
        }
      });
    });
  }
}
