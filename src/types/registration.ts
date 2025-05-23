export interface registrationFormData {
    guardians: {
        firstName: string;
        lastName: string;
        email: string;
        phonePrimary: string;
        phoneAlternate?: string;
        address1: string;
        address2?: string;
        city: string;
        state: string; // 2-letter state code
        zip: string; // 5-10 digit zip code
    };
    children: {
        firstName: string;
        lastName: string;
        dateOfBirth: string; // YYYY-MM-DD
        classInFall: string;
        school?: string | null;
    };
    emergencyContacts: {
        firstName: string;
        lastName: string;
        email: string;
        phonePrimary: string;
        phoneAlternate?: string;
        relationship: string;
    };
    medicalInformation: {
        allergies?: string | null;
        medications?: string | null;
        medicalConditions?: string | null;
        diataryRestrictions?: string | null;
    };
    permissions: {
        photoRelease: boolean;
        pickupNotes?: string | null;
        consentGiven: boolean;
    };
}
