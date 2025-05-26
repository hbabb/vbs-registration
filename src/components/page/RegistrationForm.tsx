'use client';

/**
 * src/components/RegistrationForm.tsx
 *
 * Main registration form wrapper part that handles all form logic
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
import { ChildInfo } from '../views/ChildInfo';
import { Consent } from '../views/Consent';
import { EmergencyContact } from '../views/EmergencyContact';
import { GuardianInfo } from '../views/GuardianInfo';
import { zodResolver } from '@hookform/resolvers/zod';
import { registrationSchema } from '@/schemas/formSchema';
import { useState, useEffect } from 'react';
import { trackRegistration, trackFormStep, trackEvent } from '@/lib/analytics';
import McbcLogo from '@/assets/mcbc-logo/TransparentLogoIcon.svg';
import Image from 'next/image';
import { InteractiveHoverButton } from '@/components/magicui/interactive-hover-button';

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
            // Track successful registration
            const childrenCount = form.getValues('children').length;
            trackRegistration(childrenCount);

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
            // Track form errors
            trackEvent('registration_error', {
                event_category: 'VBS Registration',
                error_message: error.error?.serverError || 'Unknown error',
            });
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

    useEffect(() => {
        const subscription = form.watch((value, { name }) => {
            if (
                name?.startsWith('guardians.firstName') &&
                value.guardians?.firstName
            ) {
                trackFormStep('guardian_info_started');
            }
            if (
                name?.startsWith('children.0.firstName') &&
                value.children?.[0]?.firstName
            ) {
                trackFormStep('child_info_started');
            }
            if (
                name?.startsWith('emergencyContacts.0.firstName') &&
                value.emergencyContacts?.[0]?.firstName
            ) {
                trackFormStep('emergency_contact_started');
            }
        });

        return () => subscription.unsubscribe();
    }, [form]);

    // Form submission handler
    const onSubmit = (data: RegistrationFormData) => {
        const isDev = process.env.NODE_ENV === 'development';
        const isDeveloper =
            data.guardians.email === process.env.DEVELOPER_EMAIL;
        const submissionTime =
            isDev || isDeveloper ? 0 : Date.now() - startTime;
        execute({ ...data, submissionTime });
    };

    return (
        <div className="mx-auto max-w-4xl space-y-8 p-6">
            {/* Page Header */}
            <div className="space-y-1 rounded-2xl bg-white/80 p-6 text-center shadow-2xl">
                <div className="flex flex-col items-center justify-center gap-0 md:m-0 md:flex-row md:gap-2">
                    <Image
                        src={McbcLogo}
                        alt="Motlow Creek Baptist Church Logo"
                        width={200}
                        height={80}
                        className="h-32 w-56"
                    />
                    <div className="flex flex-col items-center justify-center">
                        <h1 className="font-allura text-church-navy text-lg md:text-4xl">
                            Motlow Creek Baptist Church
                        </h1>
                        <h2 className="mcbc-logo font-roboto text-church-navy text-xs uppercase">
                            Where faith grows and hearts connect
                        </h2>
                        <address className="text-church-navy text-sm">
                            2300 Motlow Creek Road
                            <br />
                            Campobello, SC 29322
                            <br />
                        </address>
                    </div>
                </div>
                <h2 className="text-dartmouth-green font-luckiest text-lg uppercase md:text-xl lg:text-2xl">
                    Vacation Bible School 2025 Registration
                </h2>
                <h3 className="text-marian-blue font-montserrat text-lg md:text-xl lg:text-2xl">
                    Magnified!!!!
                    <br />
                    Made to MAGNIFY God!!!
                </h3>
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
                        <InteractiveHoverButton
                            type="submit"
                            disabled={status === 'executing'}
                            className="min-w-48">
                            {status === 'executing'
                                ? 'Submitting...'
                                : 'Submit Registration'}
                        </InteractiveHoverButton>
                        {/*The line below is for debugging purposes. Uncomment to see form errors*/}
                        {/*<pre className="border border-amber-400 bg-amber-700 text-white font-semibold">{JSON.stringify(form.formState.errors, null, 2)}</pre>*/}
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
            {/*Add a privacy notice to your form*/}
            <div className="mb-6 rounded-lg border border-blue-200 bg-blue-50/80 p-4">
                <h4 className="font-semibold text-blue-800">Privacy Notice</h4>
                <p className="mt-2 text-sm text-blue-700">
                    We collect this information solely for VBS registration and
                    safety purposes. Your data is not shared with third parties
                    and is deleted after the program ends.
                </p>
            </div>
        </div>
    );
}
