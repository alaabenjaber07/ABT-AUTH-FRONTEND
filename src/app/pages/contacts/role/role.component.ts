import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserProfileDTO } from 'src/app/core/models/UserProfileDTO';
import { UserProfileService } from 'src/app/core/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {
  users: UserProfileDTO[] = [];
    loading: boolean = false;
    errorMessage: string | null = null;
    roles :String[]=["admin","bancaire"];
    selectedUserId: number = 0;
    selectedRole: string | null = null;
  constructor(private userProfileService: UserProfileService,private router :Router) {}

  ngOnInit(): void {
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
  assignerRole(role: string, userId: number): void {
  Swal.fire({
    title: 'Êtes-vous sûr ?',
    text: `Voulez-vous vraiment assigner le rôle "${role}" à cet utilisateur ?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Oui, assigner !',
    cancelButtonText: 'Annuler'
  }).then((result) => {
    if (result.isConfirmed) {
      this.userProfileService.setRole({ id: userId, role }).subscribe({
        next: () => {
          this.loadUsers();
          this.router.navigate(['contacts/list']);
        },
        error: (error) => {
          this.loadUsers();
          this.router.navigate(['contacts/list']);
        }
      });
    }
  });
}
onCancel() {
    this.router.navigate(['/contacts/list']); 
}
}
