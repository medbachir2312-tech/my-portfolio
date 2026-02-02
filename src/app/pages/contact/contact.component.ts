import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { EmailService } from '../../services/email.service';
import { ProfileService } from '../../services/profile.service';
import { Profile } from '../../models/portfolio.model';

/**
 * Page de contact
 * Formulaire de contact avec validation et intégration EmailJS
 */
@Component({
    selector: 'app-contact',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterModule, NavbarComponent, FooterComponent],
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
    contactForm!: FormGroup;
    isSubmitting = false;
    isSubmitted = false;
    isError = false;
    errorMessage = '';
    profile: Profile | null = null;

    constructor(
        private fb: FormBuilder,
        private emailService: EmailService,
        private profileService: ProfileService
    ) { }

    ngOnInit(): void {
        this.initForm();

        this.profileService.profile$.subscribe(profile => {
            this.profile = profile;
        });
    }

    private initForm(): void {
        this.contactForm = this.fb.group({
            name: ['', [Validators.required, Validators.minLength(2)]],
            email: ['', [Validators.required, Validators.email]],
            subject: ['', [Validators.required, Validators.minLength(5)]],
            message: ['', [Validators.required, Validators.minLength(10)]]
        });
    }

    get f() {
        return this.contactForm.controls;
    }

    async onSubmit(): Promise<void> {
        this.isSubmitted = false;
        this.isError = false;
        this.errorMessage = '';

        if (this.contactForm.invalid) {
            Object.keys(this.contactForm.controls).forEach(key => {
                const control = this.contactForm.get(key);
                control?.markAsTouched();
                control?.updateValueAndValidity(); // Ensure UI reflects the invalid state
            });
            return;
        }

        this.isSubmitting = true;

        try {
            await this.emailService.sendEmail(this.contactForm.value);
            this.isSubmitted = true;
            this.contactForm.reset();

            // Réinitialiser le message de succès après 5 secondes
            setTimeout(() => {
                this.isSubmitted = false;
            }, 5000);
        } catch (error) {
            console.error('Erreur lors de l\'envoi de l\'email:', error);
            this.isError = true;
            this.errorMessage = "Une erreur est survenue lors de l'envoi du message. Veuillez réessayer plus tard.";
        } finally {
            this.isSubmitting = false;
        }
    }

    getErrorMessage(fieldName: string): string {
        const field = this.contactForm.get(fieldName);

        if (field?.hasError('required')) {
            return 'Ce champ est requis';
        }

        if (field?.hasError('email')) {
            return 'Veuillez entrer une adresse email valide';
        }

        if (field?.hasError('minlength')) {
            const minLength = field.errors?.['minlength'].requiredLength;
            return `Minimum ${minLength} caractères requis`;
        }

        return '';
    }
}
