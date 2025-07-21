import { Component, OnInit } from '@angular/core';

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

  userProfile: UserProfileDTO | null = null;
  loading = false;
  errorMessage: string | null = null;

  constructor(
    private userProfileService: UserProfileService,
    private keycloakService: KeycloakService
  ) {}

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Contacts' }, { label: 'Profile', active: true }];
    this.revenueBarChart = revenueBarChart;
    this.statData = statData;

    this.loadUserProfile();
  }

  async loadUserProfile(): Promise<void> {
    this.loading = true;

    try {
      const keycloakId = this.keycloakService.getKeycloakInstance().subject;

      this.userProfileService.getUserByKeycloakId(keycloakId).subscribe({
        next: (data) => {
          this.userProfile = data;
          this.loading = false;
        },
        error: (err) => {
          this.errorMessage = "Erreur lors du chargement du profil utilisateur.";
          console.error(err);
          this.loading = false;
        }
      });
    } catch (e) {
      this.errorMessage = "Impossible de récupérer le profil utilisateur.";
      console.error(e);
      this.loading = false;
    }
  }
}
