import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProfileService } from '../../services/profile.service';
import { Profile } from '../../models/portfolio.model';

/**
 * Composant Footer
 * Pied de page avec liens et réseaux sociaux
 */
@Component({
    selector: 'app-footer',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
    profile: Profile | null = null;
    currentYear = new Date().getFullYear();

    constructor(private profileService: ProfileService) { }

    ngOnInit(): void {
        this.profileService.profile$.subscribe(profile => {
            this.profile = profile;
        });
    }
}
