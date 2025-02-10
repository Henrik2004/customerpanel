import {Component} from '@angular/core';
import {CustomerpanelApiService} from '../../shared/customerpanel-api.service';
import {NgForOf} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-tags-modal-modal',
  templateUrl: './tags-modal.component.html',
  imports: [
    NgForOf,
    FormsModule
  ],
  styleUrls: ['./tags-modal.component.scss']
})
export class TagsModalComponent {
  protected isActive = false;
  document: any = {};
  tags: any = [];
  tag: string = '';

  constructor(private customerpanelApiService: CustomerpanelApiService) {
  }

  public closeModal(): void {
    this.isActive = false;
  }

  public openModal(document: any): void {
    this.isActive = true;
    this.document = document;
    this.customerpanelApiService.getTagsByDocumentId(document.id).subscribe((tags) => {
      this.tags = tags;
    });
  }

  public isModalActive(): boolean {
    return this.isActive;
  }

  public addTag() {
    const data = {
      name: this.tag,
      documentId: this.document.id,
      createdBy: this.customerpanelApiService.user,
    }
    this.customerpanelApiService.createTag(data).subscribe((tag) => {
      this.tags.push(tag);
      this.tag = '';
    });
  }

  public deleteTag(tag: any) {
    this.customerpanelApiService.deleteTag(tag.id).subscribe(() => {
      this.tags = this.tags.filter((t: any) => t.id !== tag.id);
    });
  }
}
