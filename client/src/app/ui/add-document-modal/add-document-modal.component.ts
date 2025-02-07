import {Component} from '@angular/core';
import {CustomerpanelApiService} from '../../shared/customerpanel-api.service';
import {RefreshService} from '../../shared/refresh.service';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-add-document-modal',
  templateUrl: './add-document-modal.component.html',
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  styleUrls: ['./add-document-modal.component.scss']
})
export class AddDocumentModalComponent {
  protected isActive = false;
  documentForm: any;
  offerId: number = 0;
  selectedFile: File | null = null;

  constructor(private customerpanelApiService: CustomerpanelApiService,
              private refreshService: RefreshService,
              private fb: FormBuilder) {
    this.documentForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      file: ['', Validators.required]
    });
  }

  onFileChanged(event: any): void {
    this.selectedFile = event.target.files[0] as File;
  }

  public closeModal(): void {
    this.isActive = false;
  }

  public openModal(offerId: number): void {
    this.offerId = offerId;
    this.isActive = true;
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    console.log('submitting');
    if (this.documentForm.valid && this.selectedFile) {
      this.closeModal();
      const formData = new FormData();
      formData.append('file', this.selectedFile);
      formData.append('name', this.documentForm.value.name);
      formData.append('offerId', this.offerId.toString());
      formData.append('createdBy', this.customerpanelApiService.user.toString());

      this.customerpanelApiService.createDocument(formData).subscribe(() => {
        this.refreshService.triggerRefresh();
      });
    }
  }

  public isModalActive(): boolean {
    return this.isActive;
  }
}
