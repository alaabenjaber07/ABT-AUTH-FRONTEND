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
  user:UserProfileDTO ;
  searchTerm: string = '';
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
  this.userProfileService.deleteUser(idUserprofile).subscribe(() => {
    this.user =this.users.find(u => u.idUserprofile === idUserprofile);
    this.users = this.users.filter(user => user.idUserprofile !== idUserprofile);
    //this.loadUsers();

    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'success',
      title: `${this.user.firstName} ${this.user.lastName} supprimé avec succès`,
      showConfirmButton: false,
      timer: 3000
    });

  }, error => {
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'error',
      title: 'Erreur lors de la suppression',
      text: error.error?.message || error.message,
      showConfirmButton: false,
      timer: 4000
    });
  });
}

  goToEditUser(id: number) {
   this.router.navigate(['/contacts/edit-user', id]);
  }
  filterUsers(){
    if(this.searchTerm){
      this.users = this.users.filter(user => 
        user.username?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        user.firstName?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        user.lastName?.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }else{
      this.loadUsers();
    }
  }
  goToAddUser(){
    this.router.navigate(['/contacts/grid']);
  }
  goToAssignRole(){
    this.router.navigate(['/contacts/role']);
  }

}
