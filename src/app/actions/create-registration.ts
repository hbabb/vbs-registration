'use server';

import { db } from '@/db/index';
import {
    children,
    emergencyContacts,
    guardians,
    medicalInformation,
    permissions,
} from '@/db/schema';
import { registrationSchema } from '@/schemas/formSchema';
import { createSafeActionClient } from 'next-safe-action';

// Create a safe action client
const actionClient = createSafeActionClient();

export const createRegistration = actionClient
    .schema(registrationSchema)
    .action(async ({ parsedInput: formData }) => {
        try {
            // Insert guardian data and get the ID
            const [guardian] = await db
                .insert(guardians)
                .values(formData.guardians)
                .returning({ id: guardians.id });

            if (!guardian) {
                throw new Error('Failed to create guardian record');
            }

            // Insert child data and get ID
            const [child] = await db
                .insert(children)
                .values({
                    ...formData.children,
                    guardianId: guardian.id,
                })
                .returning({ id: children.id });

            if (!child) {
                throw new Error('Failed to create child record');
            }

            // Insert emergency contact information
            await db.insert(emergencyContacts).values({
                childId: child.id,
                ...formData.emergencyContacts,
            });

            // Insert medical information
            await db.insert(medicalInformation).values({
                childId: child.id,
                ...formData.medicalInformation,
            });

            // Insert permissions (required)
            await db.insert(permissions).values({
                childId: child.id,
                ...formData.consent,
            });

            return {
                success: true,
                message: 'Registration completed successfully!',
                childId: child.id,
                guardianId: guardian.id,
            };
        } catch (error) {
            console.error('Registration error: ', error);
            throw new Error(
                'Failed to complete registration. Please try again. If error persists, contact support@motlowministries.com',
            );
        }
    });
