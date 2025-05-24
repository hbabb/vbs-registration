/**
 * src/schemas/formSchema.ts
 *
 * Shared Zod schema for registration form validation
 * Updated to support multiple children with embedded medical information
 * Each child can have their own medical information within the same record
 */

import { z } from 'zod';

// Zod schema for validation
export const registrationSchema = z.object({
    guardians: z.object({
        firstName: z.string().min(1, { message: 'First name is required' }),
        lastName: z.string().min(1, { message: 'Last name is required' }),
        email: z.string().email({ message: 'Valid email is required' }),
        phonePrimary: z
            .string()
            .min(10, { message: 'Phone number must be at least 10 digits' }),
        phoneAlternate: z.string().optional(),
        address1: z.string().min(1, { message: 'Address is required' }),
        address2: z.string().optional(),
        city: z.string().min(1, { message: 'City is required' }),
        state: z.string().length(2, { message: 'State must be 2 characters' }),
        zip: z
            .string()
            .min(5, { message: 'ZIP code must be at least 5 digits' })
            .max(10),
    }),
    children: z
        .array(
            z.object({
                firstName: z
                    .string()
                    .min(1, { message: 'First name is required' }),
                lastName: z
                    .string()
                    .min(1, { message: 'Last name is required' }),
                dateOfBirth: z
                    .string()
                    .min(1, { message: 'Date of birth is required' }),
                classInFall: z
                    .string()
                    .min(1, { message: 'Class in fall is required' }),
                school: z.string().optional(),
                medicalInformation: z.object({
                    foodAllergies: z.string().optional(),
                    dietaryRestrictions: z.string().optional(), // Dietary Restrictions due to Medical Conditions
                    emergencyMedical: z.string().optional(), // EpiPens, inhalers, etc.
                }),
            }),
        )
        .min(1, 'At least one child is required'),
    emergencyContacts: z
        .array(
            z.object({
                firstName: z
                    .string()
                    .min(1, 'Emergency contact first name is required'),
                lastName: z
                    .string()
                    .min(1, 'Emergency contact last name is required'),
                phonePrimary: z
                    .string()
                    .min(10, 'Emergency contact phone is required'),
                relationship: z.string().min(1, 'Relationship is required'),
            }),
        )
        .min(1, 'At least one emergency contact is required')
        .max(3, 'Maximum 3 emergency contacts allowed'),
    consent: z.object({
        photoRelease: z.boolean(),
        pickupNotes: z.string().optional(),
        consentGiven: z.boolean().refine(val => val === true, {
            message: 'Consent must be given to proceed with registration',
        }),
    }),
});

// Export the inferred type for TypeScript
export type RegistrationFormData = z.infer<typeof registrationSchema>;
