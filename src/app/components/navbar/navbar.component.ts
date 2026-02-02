import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ThemeService } from '../../services/theme.service';
import { AuthService } from '../../services/auth.service';

/**
 * Composant Navbar
 * Navigation principale avec menu responsive et toggle de thème
 */
@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
    isMenuOpen = false;
    isDarkTheme = false;
    isAuthenticated = false;

    constructor(
        private themeService: ThemeService,
        private authService: AuthService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.themeService.theme$.subscribe(theme => {
            this.isDarkTheme = theme === 'dark';
        });

        this.authService.isAuthenticated$.subscribe(auth => {
            this.isAuthenticated = auth;
        });
    }

    toggleMenu(): void {
        this.isMenuOpen = !this.isMenuOpen;
    }

    closeMenu(): void {
        this.isMenuOpen = false;
    }

    toggleTheme(): void {
        this.themeService.toggleTheme();
    }

    logout(): void {
        this.authService.logout();
        this.router.navigate(['/']);
        this.closeMenu();
    }
}
