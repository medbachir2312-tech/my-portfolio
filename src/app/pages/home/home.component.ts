import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ProfileService } from '../../services/profile.service';
import { ProjectService } from '../../services/project.service';
import { SkillService } from '../../services/skill.service';
import { Profile, Project, Skill } from '../../models/portfolio.model';

/**
 * Page d'accueil
 * Section hero, projets en vedette, compétences principales
 */
@Component({
    selector: 'app-home',
    standalone: true,
    imports: [CommonModule, RouterModule, NavbarComponent, FooterComponent],
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    profile: Profile | null = null;
    featuredProjects: Project[] = [];
    topSkills: Skill[] = [];

    constructor(
        private profileService: ProfileService,
        private projectService: ProjectService,
        private skillService: SkillService
    ) { }

    ngOnInit(): void {
        // Charger le profil
        this.profileService.profile$.subscribe(profile => {
            this.profile = profile;
        });

        // Charger les projets en vedette
        this.projectService.projects$.subscribe(projects => {
            this.featuredProjects = projects
                .filter(p => p.featured)
                .sort((a, b) => a.order - b.order)
                .slice(0, 3);
        });

        // Charger les compétences principales
        this.skillService.skills$.subscribe(skills => {
            this.topSkills = skills
                .filter(s => s.level > 80)
                .sort((a, b) => b.level - a.level)
                .slice(0, 6);
        });
    }

    scrollToSection(sectionId: string): void {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
}
