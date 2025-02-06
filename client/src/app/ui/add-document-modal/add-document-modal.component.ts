import {Component, OnInit} from '@angular/core';
import {CustomerpanelApiService} from '../../shared/customerpanel-api.service';
import {RefreshService} from '../../shared/refresh.service';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgIf} from '@angular/common';
import {ActivatedRoute} from '@angular/router';

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

  constructor(private customerpanelApiService: CustomerpanelApiService,
              private refreshService: RefreshService,
              private fb: FormBuilder) {
    this.documentForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      file: ['', Validators.required]
    });
  }

  public closeModal(): void {
    this.isActive = false;
  }

  public openModal(offerId: number): void {
    this.offerId = offerId;
    this.isActive = true;
  }

  onSubmit(): void {
    if (this.documentForm.valid) {
      this.closeModal();
      const document = { ...this.documentForm.value, createdBy: this.customerpanelApiService.user, offerId: this.offerId };
      this.customerpanelApiService.createDocument(document).subscribe(() => {
        this.refreshService.triggerRefresh();
      });
    }
  }

  public isModalActive(): boolean {
    return this.isActive;
  }
}
