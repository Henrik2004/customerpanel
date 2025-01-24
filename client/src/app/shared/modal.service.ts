import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modalState = new Subject<{ isOpen: boolean, customerId?: number }>();
  modalState$ = this.modalState.asObservable();

  openModal(customerId: number) {
    this.modalState.next({ isOpen: true, customerId });
  }

  closeModal() {
    this.modalState.next({ isOpen: false });
  }
}
