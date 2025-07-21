import { Component , OnInit} from '@angular/core';
import { KeycloakService } from './core/services/keycloak.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit  {

   username: string = '';

  constructor(public keycloakService: KeycloakService) {}

  ngOnInit() {
    if (this.keycloakService.isLoggedIn()) {
      this.username = this.keycloakService.getUsername();
    }
  }

  logout() {
    this.keycloakService.logout();
  }
 // ngOnInit() {
    // document.getElementsByTagName("html")[0].setAttribute("dir", "rtl");
 // }
}
