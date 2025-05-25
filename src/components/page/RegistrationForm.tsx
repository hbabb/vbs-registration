'use client';

/**
 * src/components/RegistrationForm.tsx
 *
 * Main registration form wrapper component that handles all form logic
 * Contains useForm hook, validation, submission, and renders all form sections
 * This is a client component that wraps server-rendered page content
 * Handles multistep form flow and state management
 */

import { createRegistration } from '@/app/actions/createRegistration';
import { FormInput } from '@/components/form/FormInput';
import { Form } from '@/components/ui/form';
import { type RegistrationFormData } from '@/schemas/formSchema';
import { useAction } from 'next-safe-action/hooks';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import { ChildInfo } from '../views/ChildInfo';
import { Consent } from '../views/Consent';
import { EmergencyContact } from '../views/EmergencyContact';
import { GuardianInfo } from '../views/GuardianInfo';
import { zodResolver } from '@hookform/resolvers/zod';
import { registrationSchema } from '@/schemas/formSchema';
import { useState } from 'react';

export function RegistrationForm() {
    // Set sart time for registration
    const [startTime] = useState(Date.now());
    // Initialize form with react-hook-form and Zod validation
    const form = useForm<RegistrationFormData>({
        resolver: zodResolver(registrationSchema),
        mode: 'all',
        defaultValues: {
            guardians: {
                firstName: '',
                lastName: '',
                email: '',
                phonePrimary: '',
                phoneAlternate: '',
                address1: '',
                address2: '',
                city: '',
                state: '',
                zip: '',
            },
            children: [
                {
                    firstName: '',
                    lastName: '',
                    dateOfBirth: '',
                    classInFall: '',
                    school: '',
                    medicalInformation: {
                        foodAllergies: '',
                        dietaryRestrictions: '',
                        emergencyMedical: '',
                    },
                },
            ],
            emergencyContacts: [
                {
                    firstName: '',
                    lastName: '',
                    phonePrimary: '',
                    relationship: '',
                },
            ],
            consent: {
                photoRelease: false,
                consentGiven: false,
            },
            honeypot: '',
            honeypot2: '',
            submissionTime: 0,
        },
    });

    // Server action hook for form submission
    const { execute, status } = useAction(createRegistration, {
        onSuccess: data => {
            toast.success(`✅ ${data?.data?.message}`, {
                style: {
                    background: '#059669', // muted green
                    color: 'white',
                    border: 'none',
                },
            });
            form.reset();
        },
        onError: error => {
            toast.error(
                `❌ ${error.error?.serverError || 'Registration failed. Please try again'}`,
                {
                    style: {
                        background: '#DC2626', // muted red
                        color: 'white',
                        border: 'none',
                    },
                },
            );
        },
    });

    // Form submission handler
    const onSubmit = (data: RegistrationFormData) => {
        const submissionTime = Date.now() - startTime;
        execute({ ...data, submissionTime });
    };

    return (
        <div className="mx-auto max-w-4xl space-y-8 p-6">
            {/* Page Header */}
            <div className="space-y-1 rounded-2xl bg-white/80 p-6 text-center shadow-2xl">
                <h1 className="font-heading text-xl md:text-2xl lg:text-4xl">
                    Magnified!
                </h1>
                <h2 className="font-subheading text-lg md:text-xl lg:text-2xl">
                    Made to MAGNIFY God!
                </h2>
                <h3 className="text-church-navy text-lg md:text-xl lg:text-2xl">
                    Vacation Bible School 2025
                </h3>
                <p className="text-foreground font-family-montserrat">
                    Motlow Creek Baptist Church
                    <br /> VBS 2025 Registration Form
                </p>
            </div>

            {/* Registration Form */}
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="font-family-inter space-y-8">
                    {/* Guardian Information Section */}
                    <GuardianInfo form={form} />

                    {/* Child Information Section */}
                    <ChildInfo form={form} />

                    {/* Emergency Contact Section */}
                    <EmergencyContact form={form} />

                    {/* Consent Section */}
                    <Consent form={form} />

                    {/* Submit Button */}
                    <div className="justify-start-safe flex pt-4">
                        <Button
                            type="submit"
                            size="lg"
                            disabled={status === 'executing'}
                            className="min-w-48">
                            {status === 'executing'
                                ? 'Submitting...'
                                : 'Submit Registration'}
                        </Button>
                    </div>
                    {/*In your RegistrationForm.tsx, add hidden fields:*/}
                    <div style={{ display: 'none' }}>
                        <FormInput
                            form={form}
                            name="honeypot"
                            label="Leave this blank"
                            placeholder=""
                        />
                        <FormInput
                            form={form}
                            name="honeypot2"
                            label="Do not fill this field"
                            placeholder=""
                        />
                    </div>
                </form>
            </Form>
        </div>
    );
}
