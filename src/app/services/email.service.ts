import { Injectable } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
import { environment } from '../../environments/environment';

export interface EmailData {
    name: string;
    email: string;
    subject: string;
    message: string;
}

@Injectable({
    providedIn: 'root'
})
export class EmailService {
    // Access environment variables directly to ensure they are read at runtime
    private get serviceId(): string { return environment.emailjs.serviceId; }
    private get templateId(): string { return environment.emailjs.templateId; }
    private get publicKey(): string { return environment.emailjs.publicKey; }

    constructor() {
        this.init();
    }

    private init(): void {
        if (!this.publicKey) {
            console.error('EmailJS Public Key is missing or invalid in environment configuration');
            return;
        }

        // Initialize EmailJS with the public key
        try {
            emailjs.init(this.publicKey);
            console.log('EmailJS service initialized');
        } catch (error) {
            console.error('Failed to initialize EmailJS:', error);
        }
    }

    async sendEmail(data: EmailData): Promise<EmailJSResponseStatus> {
        // Validation of configuration before attempting to send
        if (!this.serviceId || !this.templateId || !this.publicKey) {
            const errorMsg = `EmailJS Configuration Error: 
                Service ID: ${!!this.serviceId}, 
                Template ID: ${!!this.templateId}, 
                Public Key: ${!!this.publicKey}`;
            console.error(errorMsg);
            throw new Error('EmailJS configuration is incomplete. Please check console for details.');
        }

        try {
            // Construct template parameters exactly as requested
            const templateParams = {
                name: data.name,
                email: data.email,
                sujet: data.subject, // Mapping 'subject' from form to 'sujet' in template
                message: data.message,
                name_initial: this.getInitials(data.name),
                time: new Date().toLocaleString('fr-FR')
            };

            console.log('Sending email with params:', templateParams);

            const response = await emailjs.send(
                this.serviceId,
                this.templateId,
                templateParams
            );

            console.log('Email sent successfully:', response);
            return response;
        } catch (error) {
            console.error('EmailJS Send Error:', error);
            throw error;
        }
    }

    private getInitials(name: string): string {
        if (!name) return '';
        const parts = name.trim().split(/\s+/);
        if (parts.length === 1) {
            return parts[0].substring(0, 2).toUpperCase();
        }
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
}
