/**
 * This file contains validation helpers
 */

import { z } from 'zod';
import { US_STATES } from '@/constants/StatesArray';

export const nameValidation = z
    .string()
    .min(2, { message: 'Name must be at least 2 characters' })
    .max(50, { message: 'Name must be less than 50 characters' });

export const emailValidation = z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Please enter a valid email address' })
    .refine(
        email => {
            // More strict email pattern
            const emailRegex =
                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            return emailRegex.test(email);
        },
        { message: 'Please enter a valid email address' },
    )
    .refine(
        email => {
            // Check for valid TLDs (top-level domains)
            const validTLDs = [
                'com',
                'org',
                'net',
                'edu',
                'gov',
                'io',
                'me',
                'uk',
                'ca',
            ];
            const domain = email.split('@')[1];
            const tld = domain.split('.').pop()?.toLowerCase();
            return validTLDs.includes(tld || '');
        },
        { message: 'Please enter an email with a valid domain extension' },
    )
    .refine(
        email => {
            // Reject obvious fake patterns
            const domain = email.split('@')[1];
            const fakeDomains = [
                'test.com',
                'example.com',
                'fake.com',
                'dummy.com',
            ];
            const hasRepeatingChars = /(.)\1{3,}/.test(domain); // 4+ same chars in domain

            return !fakeDomains.includes(domain) && !hasRepeatingChars;
        },
        { message: 'Please enter a real email address' },
    );

export const phoneValidation = z
    .string()
    .min(1, { message: 'Phone number is required' })
    .refine(
        phone => {
            const digitsOnly = phone.replace(/\D/g, '');
            return (
                digitsOnly.length === 10 ||
                (digitsOnly.length === 11 && digitsOnly.startsWith('1'))
            );
        },
        { message: 'Please enter a valid 10-digit phone number' },
    );

export const optionalPhoneValidation = z
    .string()
    .optional()
    .or(phoneValidation);

export const addressValidation = z
    .string()
    .min(3, { message: 'Address is required' })
    .max(100, { message: 'Address must be less than 100 characters' });

export const optionalAddressValidation = z
    .string()
    .optional()
    .or(addressValidation);

export const cityValidation = z
    .string()
    .min(2, { message: 'City is required' })
    .max(50, { message: 'City must be less than 50 characters' })
    .refine(
        city => {
            const cityRegex = /^[a-zA-Z0-9\s]+$/;
            return cityRegex.test(city);
        },
        { message: 'Please enter a valid city name' },
    );

export const stateValidation = z
    .string()
    .length(2, { message: 'Please select a valid state' })
    .refine(
        state => {
            const validState = US_STATES.find(s => s.abbreviation === state);
            return !!validState; // Just check if it exists
        },
        { message: 'Please select a valid state' },
    );

export const zipValidation = z
    .string()
    .min(5, { message: 'Zip code is required' })
    .refine(
        zip => {
            const zipRegex = /^\d{5}(?:[-\s]\d{4})?$/;
            return zipRegex.test(zip);
        },
        { message: 'Please enter a valid zip code' },
    );

export const humanBehaviorValidation = z.object({
    // Detect copy/paste or too-perfect typing
    firstName: nameValidation.refine(
        name => {
            // Reject if all caps or all lowercase (humans usually use a proper case)
            return name !== name.toUpperCase() && name !== name.toLowerCase();
        },
        { message: 'Please use proper capitalization' },
    ),
});
