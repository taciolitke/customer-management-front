import { Component, OnInit, Input } from '@angular/core';
import { UserModel } from 'src/app/autentication/shared/user.model';
import { AuthService } from 'src/app/autentication/shared/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  @Input() currentUser: UserModel;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  exit() {
    this.authService.logout();
  }
}
