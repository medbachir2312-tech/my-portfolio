import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ProfileService } from '../../services/profile.service';
import { Profile } from '../../models/portfolio.model';

/**
 * Page À propos
 */
@Component({
    selector: 'app-about',
    standalone: true,
    imports: [CommonModule, RouterModule, NavbarComponent, FooterComponent],
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
    profile: Profile | null = null;

    constructor(private profileService: ProfileService) { }

    ngOnInit(): void {
        this.profileService.profile$.subscribe(profile => {
            this.profile = profile;
        });
    }
}
