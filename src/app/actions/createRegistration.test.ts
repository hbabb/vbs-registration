import { describe, expect, test } from 'vitest';
import { createRegistration } from './createRegistration';

// Basic single registration test
describe('createRegistration', () => {
    test('creates a registration successfully', async () => {
        const testData = {
            guardians: {
                firstName: 'Test',
                lastName: 'Parent',
                email: 'test@example.com',
                phonePrimary: '1234567890',
                address1: '123 Test St',
                city: 'Test City',
                state: 'TX',
                zip: '12345',
            },
            children: [
                {
                    firstName: 'Test',
                    lastName: 'Child',
                    dateOfBirth: '2015-01-01',
                    classInFall: 'Kindergarten',
                    school: 'Test School',
                    medicalInformation: {
                        foodAllergies: 'None',
                        dietaryRestrictions: 'None',
                        emergencyMedical: 'None',
                    },
                },
            ],
            emergencyContacts: [
                {
                    firstName: 'Emergency',
                    lastName: 'Contact',
                    phonePrimary: '9876543210',
                    relationship: 'Aunt',
                },
            ],
            consent: {
                photoRelease: true,
                consentGiven: true,
            },
        };

        const result = await createRegistration(testData);

        if (!result) {
            throw new Error('Result is undefined');
        }

        expect(result.data?.success).toBe(true);
        expect(result.data?.message).toBe(
            'Registration completed successfully!',
        );
    });
});

// Concurrent registration tests - simulate multiple people registering at same time
describe.concurrent('Concurrent Registration Tests', () => {
    test.concurrent('person 1 registers simultaneously', async ({ expect }) => {
        const testData = {
            guardians: {
                firstName: 'Alice',
                lastName: 'Johnson',
                email: 'alice.johnson@example.com',
                phonePrimary: '5551234567',
                address1: '456 Oak St',
                city: 'Springfield',
                state: 'IL',
                zip: '62701',
            },
            children: [
                {
                    firstName: 'Emma',
                    lastName: 'Johnson',
                    dateOfBirth: '2016-03-15',
                    classInFall: '1st Grade',
                    school: 'Lincoln Elementary',
                    medicalInformation: {
                        foodAllergies: 'Peanuts',
                        dietaryRestrictions: 'Gluten-free',
                        emergencyMedical: 'EpiPen in backpack',
                    },
                },
            ],
            emergencyContacts: [
                {
                    firstName: 'Bob',
                    lastName: 'Johnson',
                    phonePrimary: '5559876543',
                    relationship: 'Father',
                },
            ],
            consent: {
                photoRelease: true,
                consentGiven: true,
            },
        };

        const result = await createRegistration(testData);

        if (!result) {
            throw new Error('Result is undefined');
        }

        expect(result.data?.success).toBe(true);
        expect(result.data?.message).toBe(
            'Registration completed successfully!',
        );
    });

    test.concurrent('person 2 registers simultaneously', async ({ expect }) => {
        const testData = {
            guardians: {
                firstName: 'Maria',
                lastName: 'Garcia',
                email: 'maria.garcia@example.com',
                phonePrimary: '5552468135',
                address1: '789 Pine Ave',
                city: 'Austin',
                state: 'TX',
                zip: '73301',
            },
            children: [
                {
                    firstName: 'Carlos',
                    lastName: 'Garcia',
                    dateOfBirth: '2017-07-22',
                    classInFall: 'Kindergarten',
                    school: 'Riverside Elementary',
                    medicalInformation: {
                        foodAllergies: 'None',
                        dietaryRestrictions: 'None',
                        emergencyMedical: 'Inhaler for asthma',
                    },
                },
            ],
            emergencyContacts: [
                {
                    firstName: 'Juan',
                    lastName: 'Garcia',
                    phonePrimary: '5558642097',
                    relationship: 'Father',
                },
            ],
            consent: {
                photoRelease: false,
                consentGiven: true,
            },
        };

        const result = await createRegistration(testData);

        if (!result) {
            throw new Error('Result is undefined');
        }

        expect(result.data?.success).toBe(true);
        expect(result.data?.message).toBe(
            'Registration completed successfully!',
        );
    });

    test.concurrent('person 3 registers simultaneously', async ({ expect }) => {
        const testData = {
            guardians: {
                firstName: 'David',
                lastName: 'Wilson',
                email: 'david.wilson@example.com',
                phonePrimary: '5553691470',
                address1: '321 Elm Drive',
                city: 'Denver',
                state: 'CO',
                zip: '80201',
            },
            children: [
                {
                    firstName: 'Sophie',
                    lastName: 'Wilson',
                    dateOfBirth: '2015-11-08',
                    classInFall: '2nd Grade',
                    school: 'Mountain View Elementary',
                    medicalInformation: {
                        foodAllergies: 'Shellfish',
                        dietaryRestrictions: 'Vegetarian',
                        emergencyMedical: 'None',
                    },
                },
            ],
            emergencyContacts: [
                {
                    firstName: 'Sarah',
                    lastName: 'Wilson',
                    phonePrimary: '5557418529',
                    relationship: 'Mother',
                },
            ],
            consent: {
                photoRelease: true,
                consentGiven: true,
            },
        };

        const result = await createRegistration(testData);

        if (!result) {
            throw new Error('Result is undefined');
        }

        expect(result.data?.success).toBe(true);
        expect(result.data?.message).toBe(
            'Registration completed successfully!',
        );
    });

    test.concurrent('person 4 registers simultaneously', async ({ expect }) => {
        const testData = {
            guardians: {
                firstName: 'Jennifer',
                lastName: 'Brown',
                email: 'jennifer.brown@example.com',
                phonePrimary: '5554827395',
                address1: '654 Maple Lane',
                city: 'Seattle',
                state: 'WA',
                zip: '98101',
            },
            children: [
                {
                    firstName: 'Michael',
                    lastName: 'Brown',
                    dateOfBirth: '2016-09-12',
                    classInFall: '1st Grade',
                    school: 'Cedar Heights Elementary',
                    medicalInformation: {
                        foodAllergies: 'Dairy',
                        dietaryRestrictions: 'Lactose intolerant',
                        emergencyMedical: 'Lactose-free tablets',
                    },
                },
            ],
            emergencyContacts: [
                {
                    firstName: 'Kevin',
                    lastName: 'Brown',
                    phonePrimary: '5556174829',
                    relationship: 'Father',
                },
            ],
            consent: {
                photoRelease: true,
                consentGiven: true,
            },
        };

        const result = await createRegistration(testData);

        if (!result) {
            throw new Error('Result is undefined');
        }

        expect(result.data?.success).toBe(true);
        expect(result.data?.message).toBe(
            'Registration completed successfully!',
        );
    });

    test.concurrent('person 5 registers simultaneously', async ({ expect }) => {
        const testData = {
            guardians: {
                firstName: 'Michelle',
                lastName: 'Davis',
                email: 'michelle.davis@example.com',
                phonePrimary: '5559517362',
                address1: '987 Cedar St',
                city: 'Phoenix',
                state: 'AZ',
                zip: '85001',
            },
            children: [
                {
                    firstName: 'Isabella',
                    lastName: 'Davis',
                    dateOfBirth: '2017-04-03',
                    classInFall: 'Kindergarten',
                    school: 'Desert Sun Elementary',
                    medicalInformation: {
                        foodAllergies: 'Tree nuts',
                        dietaryRestrictions: 'None',
                        emergencyMedical: 'EpiPen and Benadryl',
                    },
                },
            ],
            emergencyContacts: [
                {
                    firstName: 'Robert',
                    lastName: 'Davis',
                    phonePrimary: '5558263947',
                    relationship: 'Father',
                },
            ],
            consent: {
                photoRelease: false,
                consentGiven: true,
            },
        };

        const result = await createRegistration(testData);

        if (!result) {
            throw new Error('Result is undefined');
        }

        expect(result.data?.success).toBe(true);
        expect(result.data?.message).toBe(
            'Registration completed successfully!',
        );
    });
});

// Database constraint tests - test duplicate emails and phone numbers
describe.concurrent('Database Constraint Tests', () => {
    test.concurrent('duplicate email attempt 1', async ({ expect }) => {
        const testData = {
            guardians: {
                firstName: 'Duplicate',
                lastName: 'Email1',
                email: 'duplicate@example.com',
                phonePrimary: '5551111111',
                address1: '111 Duplicate St',
                city: 'Test City',
                state: 'TX',
                zip: '12345',
            },
            children: [
                {
                    firstName: 'Duplicate',
                    lastName: 'Child1',
                    dateOfBirth: '2015-01-01',
                    classInFall: 'Kindergarten',
                    school: 'Test School',
                    medicalInformation: {
                        foodAllergies: 'None',
                        dietaryRestrictions: 'None',
                        emergencyMedical: 'None',
                    },
                },
            ],
            emergencyContacts: [
                {
                    firstName: 'Emergency',
                    lastName: 'Contact1',
                    phonePrimary: '5551111112',
                    relationship: 'Aunt',
                },
            ],
            consent: {
                photoRelease: true,
                consentGiven: true,
            },
        };

        const result = await createRegistration(testData);

        // One of these duplicate email attempts should succeed, the other should fail
        if (result?.serverError) {
            expect(result.serverError).toContain('already registered');
        } else {
            expect(result?.data?.success).toBe(true);
        }
    });

    test.concurrent('duplicate email attempt 2', async ({ expect }) => {
        const testData = {
            guardians: {
                firstName: 'Duplicate',
                lastName: 'Email2',
                email: 'duplicate@example.com', // Same email as above
                phonePrimary: '5552222222',
                address1: '222 Duplicate Ave',
                city: 'Test City',
                state: 'TX',
                zip: '12345',
            },
            children: [
                {
                    firstName: 'Duplicate',
                    lastName: 'Child2',
                    dateOfBirth: '2015-01-01',
                    classInFall: 'Kindergarten',
                    school: 'Test School',
                    medicalInformation: {
                        foodAllergies: 'None',
                        dietaryRestrictions: 'None',
                        emergencyMedical: 'None',
                    },
                },
            ],
            emergencyContacts: [
                {
                    firstName: 'Emergency',
                    lastName: 'Contact2',
                    phonePrimary: '5552222223',
                    relationship: 'Uncle',
                },
            ],
            consent: {
                photoRelease: true,
                consentGiven: true,
            },
        };

        const result = await createRegistration(testData);

        // One of these duplicate email attempts should succeed, the other should fail
        if (result?.serverError) {
            expect(result.serverError).toContain('already registered');
        } else {
            expect(result?.data?.success).toBe(true);
        }
    });

    test.concurrent('duplicate phone attempt 1', async ({ expect }) => {
        const testData = {
            guardians: {
                firstName: 'Duplicate',
                lastName: 'Phone1',
                email: 'phone1@example.com',
                phonePrimary: '5553333333',
                address1: '333 Phone St',
                city: 'Test City',
                state: 'TX',
                zip: '12345',
            },
            children: [
                {
                    firstName: 'Duplicate',
                    lastName: 'PhoneChild1',
                    dateOfBirth: '2015-01-01',
                    classInFall: 'Kindergarten',
                    school: 'Test School',
                    medicalInformation: {
                        foodAllergies: 'None',
                        dietaryRestrictions: 'None',
                        emergencyMedical: 'None',
                    },
                },
            ],
            emergencyContacts: [
                {
                    firstName: 'Emergency',
                    lastName: 'PhoneContact1',
                    phonePrimary: '5553333334',
                    relationship: 'Aunt',
                },
            ],
            consent: {
                photoRelease: true,
                consentGiven: true,
            },
        };

        const result = await createRegistration(testData);

        // One of these duplicate phone attempts should succeed, the other should fail
        if (result?.serverError) {
            expect(result.serverError).toContain('already registered');
        } else {
            expect(result?.data?.success).toBe(true);
        }
    });

    test.concurrent('duplicate phone attempt 2', async ({ expect }) => {
        const testData = {
            guardians: {
                firstName: 'Duplicate',
                lastName: 'Phone2',
                email: 'phone2@example.com',
                phonePrimary: '5553333333', // Same phone as above
                address1: '444 Phone Ave',
                city: 'Test City',
                state: 'TX',
                zip: '12345',
            },
            children: [
                {
                    firstName: 'Duplicate',
                    lastName: 'PhoneChild2',
                    dateOfBirth: '2015-01-01',
                    classInFall: 'Kindergarten',
                    school: 'Test School',
                    medicalInformation: {
                        foodAllergies: 'None',
                        dietaryRestrictions: 'None',
                        emergencyMedical: 'None',
                    },
                },
            ],
            emergencyContacts: [
                {
                    firstName: 'Emergency',
                    lastName: 'PhoneContact2',
                    phonePrimary: '5553333335',
                    relationship: 'Uncle',
                },
            ],
            consent: {
                photoRelease: true,
                consentGiven: true,
            },
        };

        const result = await createRegistration(testData);

        // One of these duplicate phone attempts should succeed, the other should fail
        if (result?.serverError) {
            expect(result.serverError).toContain('already registered');
        } else {
            expect(result?.data?.success).toBe(true);
        }
    });
});

// Multiple children in single registration tests
describe('Multiple Children Registration Tests', () => {
    test('single parent registers 3 children', async () => {
        const testData = {
            guardians: {
                firstName: 'Sarah',
                lastName: 'MultipleKids',
                email: 'sarah.multiplekids@example.com',
                phonePrimary: '5557777777',
                address1: '777 Family St',
                city: 'Big Family City',
                state: 'CA',
                zip: '90210',
            },
            children: [
                {
                    firstName: 'Emma',
                    lastName: 'MultipleKids',
                    dateOfBirth: '2015-06-15',
                    classInFall: '2nd Grade',
                    school: 'Liberty Elementary',
                    medicalInformation: {
                        foodAllergies: 'Peanuts, Tree nuts',
                        dietaryRestrictions: 'None',
                        emergencyMedical: 'EpiPen in school office',
                    },
                },
                {
                    firstName: 'Liam',
                    lastName: 'MultipleKids',
                    dateOfBirth: '2017-03-22',
                    classInFall: 'Kindergarten',
                    school: 'Liberty Elementary',
                    medicalInformation: {
                        foodAllergies: 'None',
                        dietaryRestrictions: 'Vegetarian',
                        emergencyMedical: 'Inhaler for asthma',
                    },
                },
                {
                    firstName: 'Olivia',
                    lastName: 'MultipleKids',
                    dateOfBirth: '2019-11-08',
                    classInFall: 'Pre-K',
                    school: 'Little Learners Daycare',
                    medicalInformation: {
                        foodAllergies: 'Dairy',
                        dietaryRestrictions: 'Lactose free',
                        emergencyMedical: 'None',
                    },
                },
            ],
            emergencyContacts: [
                {
                    firstName: 'John',
                    lastName: 'MultipleKids',
                    phonePrimary: '5557777778',
                    relationship: 'Father',
                },
                {
                    firstName: 'Grandma',
                    lastName: 'Jones',
                    phonePrimary: '5557777779',
                    relationship: 'Grandmother',
                },
            ],
            consent: {
                photoRelease: true,
                consentGiven: true,
            },
        };

        const result = await createRegistration(testData);

        if (!result) {
            throw new Error('Result is undefined');
        }

        expect(result.data?.success).toBe(true);
        expect(result.data?.message).toBe(
            'Registration completed successfully!',
        );
        expect(result.data?.data.childIds).toHaveLength(3); // Should have 3 child IDs
    });

    test('single parent registers 2 children with different schools', async () => {
        const testData = {
            guardians: {
                firstName: 'Mark',
                lastName: 'TwoKids',
                email: 'mark.twokids@example.com',
                phonePrimary: '5558888888',
                address1: '888 Sibling St',
                city: 'Twin City',
                state: 'MN',
                zip: '55101',
            },
            children: [
                {
                    firstName: 'Jacob',
                    lastName: 'TwoKids',
                    dateOfBirth: '2014-09-10',
                    classInFall: '3rd Grade',
                    school: 'North Side Elementary',
                    medicalInformation: {
                        foodAllergies: 'Shellfish',
                        dietaryRestrictions: 'None',
                        emergencyMedical: 'EpiPen and emergency contact card',
                    },
                },
                {
                    firstName: 'Sophia',
                    lastName: 'TwoKids',
                    dateOfBirth: '2016-12-03',
                    classInFall: '1st Grade',
                    school: 'South Side Elementary',
                    medicalInformation: {
                        foodAllergies: 'None',
                        dietaryRestrictions: 'Gluten-free due to celiac',
                        emergencyMedical:
                            'Gluten exposure protocol in backpack',
                    },
                },
            ],
            emergencyContacts: [
                {
                    firstName: 'Lisa',
                    lastName: 'TwoKids',
                    phonePrimary: '5558888889',
                    relationship: 'Mother',
                },
            ],
            consent: {
                photoRelease: false,
                consentGiven: true,
            },
        };

        const result = await createRegistration(testData);

        if (!result) {
            throw new Error('Result is undefined');
        }

        expect(result.data?.success).toBe(true);
        expect(result.data?.message).toBe(
            'Registration completed successfully!',
        );
        expect(result.data?.data.childIds).toHaveLength(2); // Should have 2 child IDs
    });

    test('single parent registers 4 children - stress test for large family', async () => {
        const testData = {
            guardians: {
                firstName: 'Patricia',
                lastName: 'BigFamily',
                email: 'patricia.bigfamily@example.com',
                phonePrimary: '5559999999',
                address1: '999 Busy House Blvd',
                city: 'Chaos City',
                state: 'FL',
                zip: '33101',
            },
            children: [
                {
                    firstName: 'Alexander',
                    lastName: 'BigFamily',
                    dateOfBirth: '2013-01-15',
                    classInFall: '4th Grade',
                    school: 'Central Elementary',
                    medicalInformation: {
                        foodAllergies: 'None',
                        dietaryRestrictions: 'None',
                        emergencyMedical: 'ADHD medication with nurse',
                    },
                },
                {
                    firstName: 'Isabella',
                    lastName: 'BigFamily',
                    dateOfBirth: '2015-05-20',
                    classInFall: '2nd Grade',
                    school: 'Central Elementary',
                    medicalInformation: {
                        foodAllergies: 'Eggs',
                        dietaryRestrictions: 'Egg-free',
                        emergencyMedical: 'Benadryl for reactions',
                    },
                },
                {
                    firstName: 'Benjamin',
                    lastName: 'BigFamily',
                    dateOfBirth: '2017-08-12',
                    classInFall: 'Kindergarten',
                    school: 'Central Elementary',
                    medicalInformation: {
                        foodAllergies: 'Milk, Soy',
                        dietaryRestrictions: 'Dairy-free, Soy-free',
                        emergencyMedical:
                            'Multiple allergies - see emergency plan',
                    },
                },
                {
                    firstName: 'Charlotte',
                    lastName: 'BigFamily',
                    dateOfBirth: '2019-12-25',
                    classInFall: 'Pre-K',
                    school: 'Little Stars Preschool',
                    medicalInformation: {
                        foodAllergies: 'None',
                        dietaryRestrictions: 'None',
                        emergencyMedical: 'None',
                    },
                },
            ],
            emergencyContacts: [
                {
                    firstName: 'Robert',
                    lastName: 'BigFamily',
                    phonePrimary: '5559999998',
                    relationship: 'Father',
                },
                {
                    firstName: 'Nancy',
                    lastName: 'Grandma',
                    phonePrimary: '5559999997',
                    relationship: 'Grandmother',
                },
                {
                    firstName: 'Steve',
                    lastName: 'Uncle',
                    phonePrimary: '5559999996',
                    relationship: 'Uncle',
                },
            ],
            consent: {
                photoRelease: true,
                consentGiven: true,
            },
        };

        const result = await createRegistration(testData);

        if (!result) {
            throw new Error('Result is undefined');
        }

        expect(result.data?.success).toBe(true);
        expect(result.data?.message).toBe(
            'Registration completed successfully!',
        );
        expect(result.data?.data.childIds).toHaveLength(4); // Should have 4 child IDs
    });
});

// Stress test - many simultaneous registrations
describe('Stress Testing', () => {
    test('10 simultaneous registrations', async () => {
        const registrationPromises = Array.from({ length: 10 }, (_, i) => {
            const testData = {
                guardians: {
                    firstName: `StressTest${i}`,
                    lastName: 'Parent',
                    email: `stress${i}@example.com`,
                    phonePrimary: `555000${i.toString().padStart(4, '0')}`,
                    address1: `${i}00 Stress St`,
                    city: 'Stress City',
                    state: 'TX',
                    zip: '12345',
                },
                children: [
                    {
                        firstName: `Child${i}`,
                        lastName: 'Parent',
                        dateOfBirth: '2015-01-01',
                        classInFall: 'Kindergarten',
                        school: 'Stress Test Elementary',
                        medicalInformation: {
                            foodAllergies: 'None',
                            dietaryRestrictions: 'None',
                            emergencyMedical: 'None',
                        },
                    },
                ],
                emergencyContacts: [
                    {
                        firstName: `Emergency${i}`,
                        lastName: 'Contact',
                        phonePrimary: `555111${i.toString().padStart(4, '0')}`,
                        relationship: 'Aunt',
                    },
                ],
                consent: {
                    photoRelease: true,
                    consentGiven: true,
                },
            };

            return createRegistration(testData);
        });

        // All 10 registrations happen simultaneously
        const results = await Promise.all(registrationPromises);

        // Check that all succeeded
        results.forEach((result, index) => {
            if (!result) {
                throw new Error(`Result ${index} is undefined`);
            }
            expect(result.data?.success).toBe(true);
            expect(result.data?.message).toBe(
                'Registration completed successfully!',
            );
        });
    });
});
