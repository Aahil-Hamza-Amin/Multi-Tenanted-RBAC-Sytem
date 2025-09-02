CREATE TABLE "usersToRoles" (
	"application_id" uuid NOT NULL,
	"roles_id" uuid NOT NULL,
	"users_id" uuid NOT NULL,
	CONSTRAINT "usersToRoles_application_id_roles_id_users_id_pk" PRIMARY KEY("application_id","roles_id","users_id")
);

ALTER TABLE "usersToRoles" ADD CONSTRAINT "usersToRoles_application_id_applications_id_fk" FOREIGN KEY ("application_id") REFERENCES "public"."applications"("id") ON DELETE no action ON UPDATE no action;
ALTER TABLE "usersToRoles" ADD CONSTRAINT "usersToRoles_roles_id_roles_id_fk" FOREIGN KEY ("roles_id") REFERENCES "public"."roles"("id") ON DELETE no action ON UPDATE no action;
ALTER TABLE "usersToRoles" ADD CONSTRAINT "usersToRoles_users_id_users_id_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;