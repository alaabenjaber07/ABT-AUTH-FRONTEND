import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserProfileDTO } from 'src/app/core/models/UserProfileDTO';
import { UserProfileService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

 breadCrumbItems: Array<{}>;
  userId!: number;
  user: UserProfileDTO = {
    idUserprofile: 0,
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    keycloakId: '',
    matricule: '',
    address: '',
    phoneNumber: ''
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserProfileService
  ) {}

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Users' }, { label: 'Edit Wizard', active: true }];
    this.userId = +this.route.snapshot.paramMap.get('id')!;
    this.userService.getUserById(this.userId).subscribe((data) => {
      this.user = data;
    });
  }

  onUpdate() {
  this.userService.updateUserProfile(this.userId, this.user).subscribe({
    next: () => {
      alert('✅ Utilisateur mis à jour avec succès !');
      this.router.navigate(['/contacts/list']);
    },
    error: (err) => {
      console.error('Erreur API mise à jour:', err);
       this.router.navigate(['/contacts/list']);
    }
  });
}


}
