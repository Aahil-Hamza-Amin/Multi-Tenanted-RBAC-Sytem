CREATE TABLE "roles" (
	"id" uuid DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(256) NOT NULL,
	"application_id" uuid,
	"permissions" text[],
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "roles_name_application_id_pk" PRIMARY KEY("name","application_id")
);

ALTER TABLE "roles" ADD CONSTRAINT "roles_application_id_applications_id_fk" FOREIGN KEY ("application_id") REFERENCES "public"."applications"("id") ON DELETE no action ON UPDATE no action;
CREATE UNIQUE INDEX "roles_id_index" ON "roles" USING btree ("id");