import {
  pgTable,
  uuid,
  varchar,
  timestamp,
  primaryKey,
  uniqueIndex,
  text,
} from "drizzle-orm/pg-core";

export const applicationTable = pgTable("applications", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 256 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

//compositeKey => user_email + application_id => thats why we dont have primary key as id in usersTable

export const usersTable = pgTable(
  "users",
  {
    id: uuid("id").defaultRandom().notNull(),
    email: varchar("email", { length: 256 }).notNull(),
    name: varchar("name", { length: 256 }).notNull(),
    applicationId: uuid("application_id").references(() => {
      return applicationTable.id;
    }),
    password: varchar("password", { length: 256 }).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (users) => {
    return {
      cpk: primaryKey(users.email, users.applicationId),
      idIndex: uniqueIndex("users_id_index").on(users.id),
    };
  }
);

export const rolesTable = pgTable(
  "roles",
  {
    id: uuid("id").defaultRandom().notNull(),
    name: varchar("name", { length: 256 }).notNull(),
    applicationId: uuid("application_id").references(() => {
      return applicationTable.id;
    }),
    permissions: text("permissions").array().$type<Array<string>>(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (roles) => {
    return {
      cpk: primaryKey(roles.name, roles.applicationId),
      idIndex: uniqueIndex("roles_id_index").on(roles.id),
    };
  }
);

// If application is not multi-Tenanted this join table would only btw users and roles users<=>roles
// Join Table for users, roles, applicationId

export const usersToRoleTable = pgTable(
  "usersToRoles",
  {
    applicationId: uuid("application_id")
      .references(() => applicationTable.id)
      .notNull(),
    rolesId: uuid("roles_id")
      .references(() => rolesTable.id)
      .notNull(),
    usersId: uuid("users_id")
      .references(() => usersTable.id)
      .notNull(),
  },
  (usersToRoles) => {
    return {
      cpk: primaryKey(
        usersToRoles.applicationId,
        usersToRoles.rolesId,
        usersToRoles.usersId
      ),
    };
  }
);
