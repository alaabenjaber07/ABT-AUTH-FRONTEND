  import { Component, OnInit } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
  import { revenueBarChart, statData } from './data';

  import { ChartType } from './profile.model';
  import { UserProfileDTO } from 'src/app/core/models/UserProfileDTO';
  import { ActivatedRoute } from '@angular/router';
  import { UserProfileService } from 'src/app/core/services/user.service';
  import { KeycloakService } from 'src/app/core/services/keycloak.service';

  @Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
  })

  /**
   * Contacts-profile component
   */
  export class ProfileComponent implements OnInit {
  breadCrumbItems: Array<{}>;
    revenueBarChart: ChartType;
    statData;

    userProfile: any;
    loading = false;
    errorMessage: string | null = null;

  constructor(
    private userProfileService: UserProfileService,
    private route: ActivatedRoute,
    private keycloakService: KeycloakService
  ) {}

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Contacts' }, { label: 'Profile', active: true }];
    this.revenueBarChart = revenueBarChart;
    this.statData = statData;
    const id = this.route.snapshot.paramMap.get('id');
      
      if (id) {
        this.loadUserProfile(parseInt(id));
      }else{
        this.loadConnectedUserProfile();
      }
    }

    loadUserProfile(id: number): void {
      
      this.loading = true;

      this.userProfileService.getUserById(id).subscribe({
        next: (data) => {
          this.userProfile = data;
          this.loading = false;
        },
        error: (err) => {
          this.errorMessage = "Erreur lors du chargement du profil utilisateur.";
          console.error(err.message);
          this.loading = false;
        }
      });
  }
  loadConnectedUserProfile(): void {
  this.loading = true;
  
        const token = localStorage.getItem('token');
        const decoded: any = jwtDecode(token!);
        console.log(decoded);
        this.userProfile = {
          username: decoded.preferred_username || decoded.username,
          email: decoded.email,
          firstName: decoded.given_name,
          lastName: decoded.family_name,
        };
        const kid=decoded.sub;
  
  this.userProfileService.getProfileByKeycloakId(kid)
    .subscribe({
      next: (profile: UserProfileDTO) => {
        this.userProfile = {
          ...this.userProfile,
          ...profile
        };
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load user profile';
        console.error('Error loading user profile:', error.message);
        this.loading = false;
      }
    });
}




  }
