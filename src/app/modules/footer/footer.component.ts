import { Component } from '@angular/core';
import { theme } from '../../../data/theme';
import { ModalService } from './modal.service';
import { Router } from '@angular/router';


@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
    theme = theme;
    date = new Date();
    showTermsModal = false;
  showPolicyModal = false;

  constructor(private route: Router, private modalService: ModalService) { }

  // isLoginPage(): boolean {
  //   const url = this.route.url;
  //   return url === '/account/login' || url === '/';
  // }


  isLoginPage(): boolean {
    const url = this.route.url;
    return url === '/account/login' || url === '/' || url === '/account/forgetpassword';
  }
  
  

  openTermsModal() {
    this.modalService.openTermsModal();
  }

  openPolicyModal() {
    this.modalService.openPolicyModal();
  }

}
