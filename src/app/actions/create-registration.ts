'use server';

import { db } from '@/db/index';
import { children, emergencyContacts, guardians, medicalInformation, permissions } from '@/db/schema';
import { registrationFormData } from '@/types/registration';

// Handles complete registration insert across multiple tables
export const createRegistration = async (formData: registrationFormData) => {
    // Insert guardian data and get the ID
    const [guardian] = await db.insert(guardians).values(formData.guardians).returning({ id: guardians.id });

    // Insert child data and get the ID
    const [child] = await db
        .insert(children)
        .values({
            ...formData.children,
            guardianId: guardian.id,
        })
        .returning({ id: children.id });

    // Insert emergency contact info provided
    if (formData.emergencyContacts) {
        await db.insert(emergencyContacts).values({
            childId: child.id,
            ...formData.emergencyContacts,
        });
    }

    // Insert medical info if provided
    if (formData.medicalInformation) {
        await db.insert(medicalInformation).values({
            childId: child.id,
            ...formData.medicalInformation,
        });
    }

    // Insert permissions (required)
    await db.insert(permissions).values({
        childId: child.id,
        ...formData.permissions,
    });
};
