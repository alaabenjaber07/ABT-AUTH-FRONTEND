import { Component, OnInit } from '@angular/core';
import { UserProfileDTO } from 'src/app/core/models/UserProfileDTO';
import { UserProfileService } from 'src/app/core/services/user.service';
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
  constructor(private userProfileService: UserProfileService) {}

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
  if(confirm('Idez-vous sûr de vouloir assigner le rôle ' + role + ' ?')) {
    this.userProfileService.setRole({ id: userId, role }).subscribe({
      next: () => {
        alert('Rôle assigné avec succès.');
        this.loadUsers();
        
      },
      error: (error) => {
        this.loadUsers();
        
      }
    });

  }
  
  } 

}
