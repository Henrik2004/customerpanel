import {Component, OnInit, ViewChild} from '@angular/core';
import {CustomerpanelApiService} from '../../shared/customerpanel-api.service';
import {NgForOf, NgIf} from '@angular/common';
import {ShowDocumentModalComponent} from '../../ui/show-document-modal/show-document-modal.component';
import {TagsModalComponent} from '../../ui/tags-modal/tags-modal.component';
import {FormsModule} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  imports: [
    NgForOf,
    ShowDocumentModalComponent,
    TagsModalComponent,
    FormsModule,
    NgIf
  ],
  styleUrl: './documents.component.scss'
})
export class DocumentsComponent implements OnInit {
  @ViewChild(ShowDocumentModalComponent) showDocumentModalComponent!: ShowDocumentModalComponent;
  @ViewChild(TagsModalComponent) tagsModalComponent!: TagsModalComponent;
  documents: any[] = [];
  search: string = '';
  searchbtnactive: boolean = true;
  tagsCount: any = {};
  lro_id: number = 0;

  constructor(private customerpanelApiService: CustomerpanelApiService,
              private toastr: ToastrService) {
  }

  ngOnInit() {
    this.loadDocuments();
  }

  loadDocuments() {
    this.customerpanelApiService.getDocuments().subscribe((data: any) => {
      this.documents = data;
      for (let i = 0; i < this.documents.length; i++) {
        this.customerpanelApiService.getTagsByDocumentId(this.documents[i].id).subscribe((tags) => {
          this.tagsCount[this.documents[i].id] = tags.length;
        });
      }
    });
  }

  //Aufgabe 3
  openTagsModal(document: any) {
    this.tagsModalComponent.openModal(document);
  }

  openDocument(document: any) {
    this.showDocumentModalComponent.openModal(document);
  }

  changeSearch() {
    if (this.search === '') {
      this.loadDocuments();
    }
  }

  searchDocuments() {
    this.toastr.info('Processing documents, please wait...');
    const search = this.search.toLowerCase().split(',').map((tag: string) => tag.trim());
    this.customerpanelApiService.processTags(search).subscribe((data: any) => {
      this.lro_id = data.lro.id;
      this.getProcess(data.lro.id, null);
      let interval = setInterval(() => {
        this.getProcess(data.lro.id, interval);
      }, 15000);
    });
  }

  getProcess(id: number, interval: any) {
    this.customerpanelApiService.getProcess(id).subscribe((data: any) => {
      if (!data.lro) {
        this.toastr.info('Processing documents, please wait...');
        this.searchbtnactive = false;
        return;
      }
      if (data.lro && data.lro.payload) {
        const documentsData = data.lro.payload;
        for (let i = 0; i < documentsData.length; i++) {
          this.customerpanelApiService.getDocumentById(documentsData[i].id).subscribe((data: any) => {
            this.documents = [];
            this.documents.push(data);
            this.toastr.success('Documents processed successfully');
            this.searchbtnactive = true;
            if (interval) {
              clearInterval(interval);
            }
          });
        }
      }
    });
  }
}
