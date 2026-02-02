import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ProjectService } from '../../services/project.service';
import { Project, ProjectCategory } from '../../models/portfolio.model';

@Component({
    selector: 'app-projects',
    standalone: true,
    imports: [CommonModule, RouterModule, NavbarComponent, FooterComponent],
    templateUrl: './projects.component.html',
    styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
    projects: Project[] = [];
    filteredProjects: Project[] = [];
    selectedCategory: ProjectCategory | 'all' = 'all';
    categories = Object.values(ProjectCategory);

    constructor(private projectService: ProjectService) { }

    ngOnInit(): void {
        this.projectService.projects$.subscribe(projects => {
            this.projects = projects.sort((a, b) => a.order - b.order);
            this.filteredProjects = this.projects;
        });
    }

    filterByCategory(category: ProjectCategory | 'all'): void {
        this.selectedCategory = category;
        if (category === 'all') {
            this.filteredProjects = this.projects;
        } else {
            this.filteredProjects = this.projects.filter(p => p.category === category);
        }
    }
}
