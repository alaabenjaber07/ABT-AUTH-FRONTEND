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
  private route: ActivatedRoute
) {}

ngOnInit(): void {
  this.breadCrumbItems = [{ label: 'Contacts' }, { label: 'Profile', active: true }];
  this.revenueBarChart = revenueBarChart;
  this.statData = statData;

  const id = this.route.snapshot.paramMap.get('id');
  console.log('id extrait de la route :', id);
  if (id) {
    this.loadUserProfile(parseInt(id));
  }
}

loadUserProfile(id: number): void {
  console.log('load userProfile appelle avec id=',id)
  this.loading = true;

  this.userProfileService.getUserById(id).subscribe({
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
}

}
