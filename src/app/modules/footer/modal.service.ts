import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private termsModalState = new BehaviorSubject<boolean>(false);
  private policyModalState = new BehaviorSubject<boolean>(false);

  isTermsModalOpen$ = this.termsModalState.asObservable();
  isPolicyModalOpen$ = this.policyModalState.asObservable();

  openTermsModal() {
    this.termsModalState.next(true);
  }

  closeTermsModal() {
    this.termsModalState.next(false);
  }

  openPolicyModal() {
    this.policyModalState.next(true);
  }

  closePolicyModal() {
    this.policyModalState.next(false);
  }
}
