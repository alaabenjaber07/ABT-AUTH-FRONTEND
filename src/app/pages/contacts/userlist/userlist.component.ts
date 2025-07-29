  import { Component, OnInit } from '@angular/core';
  import { UserProfileDTO } from 'src/app/core/models/UserProfileDTO';
  import { UserProfileService } from 'src/app/core/services/user.service';

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
    isEditing: boolean = false;
    selectedUserId: number =0;

    constructor(private userProfileService: UserProfileService) {}

    ngOnInit() {
      this.breadCrumbItems = [{ label: 'Contacts' }, { label: 'Users List', active: true }];
      this.loadUsers();
    }

    loadUsers() {
      this.loading = true;
      this.errorMessage = null;
      this.userProfileService.getAllUsers().subscribe({
        next: (data) => {
          console.log("Utilisateurs récupérés:", data);
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

    deleteUser(idUserprofile: number): void {
      console.log('ID reçu pour suppression:', idUserprofile);
      if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
        this.userProfileService.deleteUser(idUserprofile).subscribe(() => {
          this.users = this.users.filter(user => user.idUserprofile !== idUserprofile);
          alert('Utilisateur supprimé.');
        }, error => {
          alert('Erreur lors de la suppression : ' + error.message);
        });
      }
    }
    showSelect(userId: number): void {
  if (this.selectedUserId === userId) {
    this.selectedUserId = 0; 
  } else {
    this.selectedUserId = userId; 
  }
}

    assignerRole(role: string, userId: number): void {
  if(confirm('Idez-vous sûr de vouloir assigner le rôle ' + role + ' ?')) {
    this.userProfileService.setRole({ id: userId, role }).subscribe({
      next: () => {
        this.isEditing = false;
        this.loadUsers();
        
      },
      error: (error) => {
        this.loadUsers();
        this.isEditing = false;
      }
    });

  }
  this.selectedUserId=0; 
  } 


  }
