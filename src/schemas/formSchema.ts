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
    children: z.object({
        firstName: z.string().min(1, { message: 'First name is required' }),
        lastName: z.string().min(1, { message: 'Last name is required' }),
        dateOfBirth: z
            .string()
            .min(1, { message: 'Date of birth is required' }),
        classInFall: z
            .string()
            .min(1, { message: 'Class in fall is required' }),
        school: z.string().optional(),
    }),
    emergencyContacts: z.object({
        firstName: z.string().min(1, { message: 'First name is required' }),
        lastName: z.string().min(1, { message: 'Last name is required' }),
        email: z.string().email({ message: 'Valid email is required' }),
        phonePrimary: z
            .string()
            .min(10, { message: 'Phone number must be at least 10 digits' }),
        phoneAlternate: z.string().optional(),
        relationship: z
            .string()
            .min(1, { message: 'Relationship is required' }),
    }),
    medicalInformation: z.object({
        allergies: z.string().optional(),
        medications: z.string().optional(),
        medicalConditions: z.string().optional(),
        diataryRestrictions: z.string().optional(),
    }),
    permissions: z.object({
        photoRelease: z.boolean(),
        pickupNotes: z.string().optional(),
        consentGiven: z.boolean().refine(val => val === true, {
            message: 'Consent must be given to proceed with registration',
        }),
    }),
});

// Export the inferred type for TypeScript
export type RegistrationFormData = z.infer<typeof registrationSchema>;
