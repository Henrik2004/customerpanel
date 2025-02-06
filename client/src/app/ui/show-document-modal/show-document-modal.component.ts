import {Component} from '@angular/core';
import {CustomerpanelApiService} from '../../shared/customerpanel-api.service';

@Component({
  selector: 'app-show-document-modal',
  templateUrl: './show-document-modal.component.html',
  styleUrls: ['./show-document-modal.component.scss']
})
export class ShowDocumentModalComponent {
  protected isActive = false;
  protected content: any;

  constructor(private customerpanelApiService: CustomerpanelApiService) {
  }

  public closeModal(): void {
    this.isActive = false;
  }

  public openModal(document: any): void {
    this.isActive = true;
    this.customerpanelApiService.getDocumentContent(document.id).subscribe((content) => {
      this.content = content;
    });
  }

  public isModalActive(): boolean {
    return this.isActive;
  }
}
