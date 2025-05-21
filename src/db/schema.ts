import { relations } from 'drizzle-orm';
import { boolean, date, pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

// Guardian table
export const guardians = pgTable('guardians', {
    id: uuid('id').primaryKey().defaultRandom(),
    firstName: varchar('first_name').notNull(),
    lastName: varchar('last_name').notNull(),
    email: varchar('email').unique().notNull(),
    phonePrimary: varchar('phone').unique().notNull(),
    phoneAlternate: varchar('phone_alternate'),
    address1: varchar('address1').notNull(),
    address2: varchar('address2'),
    city: varchar('city').notNull(),
    state: varchar('state', { length: 2 }).notNull(),
    zip: varchar('zip', { length: 10 }).notNull(),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at')
        .notNull()
        .defaultNow()
        .$onUpdate(() => new Date()),
});

// Child table
export const children = pgTable('children', {
    id: uuid('id').primaryKey().defaultRandom(),
    guardianId: uuid('guardian_id')
        .notNull()
        .references(() => guardians.id),
    firstName: varchar('first_name').notNull(),
    lastName: varchar('last_name').notNull(),
    dateOfBirth: date('date_of_birth').notNull(),
    classInFall: varchar('class_in_fall').notNull(),
    school: varchar('school'),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at')
        .notNull()
        .defaultNow()
        .$onUpdate(() => new Date()),
});

// Emergency Contact table
export const emergencyContacts = pgTable('emergency_contacts', {
    id: uuid('id').primaryKey().defaultRandom(),
    childId: uuid('child_id')
        .notNull()
        .references(() => children.id),
    firstName: varchar('first_name').notNull(),
    lastName: varchar('last_name').notNull(),
    email: varchar('email').notNull(),
    phonePrimary: varchar('phone').notNull(),
    phoneAlternate: varchar('phone_alternate'),
    relationship: varchar('relationship').notNull(),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at')
        .notNull()
        .defaultNow()
        .$onUpdate(() => new Date()),
});

// Medical Information table
export const medicalInformation = pgTable('medical_information', {
    id: uuid('id').primaryKey().defaultRandom(),
    childId: uuid('child_id')
        .notNull()
        .references(() => children.id),
    allergies: varchar('allergies'),
    medications: varchar('medications'),
    medicalConditions: varchar('medical_conditions'),
    dietaryRestrictions: varchar('dietary_restrictions'),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at')
        .notNull()
        .defaultNow()
        .$onUpdate(() => new Date()),
});

// Permissions table
export const permissions = pgTable('permissions', {
    id: uuid('id').primaryKey().defaultRandom(),
    childId: uuid('child_id')
        .notNull()
        .references(() => children.id),
    photoRelease: boolean('photo_release').notNull(),
    pickupNotes: varchar('pickup_notes'),
    consentGiven: boolean('consent_given').notNull(),
    consentTimestamp: timestamp('consent_timestamp', { withTimezone: true }).notNull().defaultNow(),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at')
        .notNull()
        .defaultNow()
        .$onUpdate(() => new Date()),
});

// Relationships

export const guardiansRelations = relations(guardians, ({ many }) => ({
    children: many(children),
}));

export const childrenRelations = relations(children, ({ one, many }) => ({
    guardians: one(guardians, {
        fields: [children.guardianId],
        references: [guardians.id],
    }),
    emergencyContacts: many(emergencyContacts),
    medicalInformation: many(medicalInformation),
    permissions: many(permissions),
}));

export const emergencyContactsRelations = relations(emergencyContacts, ({ one }) => ({
    children: one(children, {
        fields: [emergencyContacts.childId],
        references: [children.id],
    }),
}));

export const medicalInformationRelations = relations(medicalInformation, ({ one }) => ({
    children: one(children, {
        fields: [medicalInformation.childId],
        references: [children.id],
    }),
}));

export const permissionsRelations = relations(permissions, ({ one }) => ({
    children: one(children, {
        fields: [permissions.childId],
        references: [children.id],
    }),
}));
