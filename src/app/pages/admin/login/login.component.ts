import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

/**
 * Page de connexion admin
 * Authentification simple frontend
 */
@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    loginForm!: FormGroup;
    isSubmitting = false;
    errorMessage = '';
    returnUrl = '/admin/dashboard';

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router,
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
        // Si déjà authentifié, rediriger vers le dashboard
        if (this.authService.isAuthenticated()) {
            this.router.navigate(['/admin/dashboard']);
            return;
        }

        this.initForm();

        // Récupérer l'URL de retour
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/admin/dashboard';
    }

    private initForm(): void {
        this.loginForm = this.fb.group({
            username: ['', [Validators.required]],
            password: ['', [Validators.required]]
        });
    }

    get f() {
        return this.loginForm.controls;
    }

    onSubmit(): void {
        if (this.loginForm.invalid) {
            Object.keys(this.loginForm.controls).forEach(key => {
                this.loginForm.controls[key].markAsTouched();
            });
            return;
        }

        this.isSubmitting = true;
        this.errorMessage = '';

        const { username, password } = this.loginForm.value;

        // Simuler un délai de connexion
        setTimeout(() => {
            const success = this.authService.login(username, password);

            if (success) {
                this.router.navigate([this.returnUrl]);
            } else {
                this.errorMessage = 'Identifiants incorrects. Veuillez réessayer.';
                this.isSubmitting = false;
            }
        }, 500);
    }
}
