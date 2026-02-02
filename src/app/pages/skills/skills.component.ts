import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { SkillService } from '../../services/skill.service';
import { Skill, SkillCategory } from '../../models/portfolio.model';

@Component({
    selector: 'app-skills',
    standalone: true,
    imports: [CommonModule, RouterModule, NavbarComponent, FooterComponent],
    templateUrl: './skills.component.html',
    styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit {
    skills: Skill[] = [];
    categories = Object.values(SkillCategory);

    constructor(private skillService: SkillService) { }

    ngOnInit(): void {
        this.skillService.skills$.subscribe(skills => {
            this.skills = skills;
        });
    }

    getSkillsByCategory(category: SkillCategory): Skill[] {
        return this.skills
            .filter(s => s.category === category)
            .sort((a, b) => b.level - a.level);
    }
}
