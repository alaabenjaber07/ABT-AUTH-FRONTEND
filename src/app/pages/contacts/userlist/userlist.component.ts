import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserProfileDTO } from 'src/app/core/models/UserProfileDTO';
import { UserProfileService } from 'src/app/core/services/user.service';
import Swal from 'sweetalert2';

  @Component({
    selector: 'app-userlist',
    templateUrl: './userlist.component.html',
    styleUrls: ['./userlist.component.scss']
  })

/**
 * Contacts user-list component
 */
export class UserlistComponent implements OnInit {
breadCrumbItems: Array<{}>;
  users: UserProfileDTO[] = [];
  loading: boolean = false;
  errorMessage: string | null = null;

  constructor(private userProfileService: UserProfileService,
    private router: Router
  ) {}

    ngOnInit() {
      this.breadCrumbItems = [{ label: 'Contacts' }, { label: 'Users List', active: true }];
      this.loadUsers();
    }

    loadUsers() {
      this.loading = true;
      this.errorMessage = null;
      this.userProfileService.getAllUsers().subscribe({
        next: (data) => {
          this.users = data;
          this.loading = false;
        },
        error: (error) => {
          this.errorMessage = "Erreur lors du chargement des utilisateurs";
          this.loading = false;
          console.error(error);
        }
      });
    }

  deleteUser(idUserprofile: number) {
  Swal.fire({
    title: 'Êtes-vous sûr ?',
    text: "Vous ne pourrez pas revenir en arrière !",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#4CAF50',
    cancelButtonColor: 'rgba(162, 162, 162, 1)',
    confirmButtonText: 'Oui, supprimer !',
    cancelButtonText: 'Annuler'
  }).then((result) => {
    if (result.isConfirmed) {
      this.userProfileService.deleteUser(idUserprofile).subscribe(() => {
        this.users = this.users.filter(user => user.idUserprofile !== idUserprofile);
        this.loadUsers();
      }, error => {
        Swal.fire(
          'Erreur !',
          'Erreur lors de la suppression : ' + (error.error?.message || error.message),
          'error'
        );
      });
    }
  });
}
  goToEditUser(id: number) {
   this.router.navigate(['/contacts/edit-user', id]);
  }

}
