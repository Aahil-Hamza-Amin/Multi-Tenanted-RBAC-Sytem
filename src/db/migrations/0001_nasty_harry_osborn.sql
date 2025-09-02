CREATE TABLE "users" (
	"id" uuid DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar(256) NOT NULL,
	"name" varchar(256) NOT NULL,
	"application_id" uuid,
	"password" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_application_id_pk" PRIMARY KEY("email","application_id")
);

ALTER TABLE "users" ADD CONSTRAINT "users_application_id_applications_id_fk" FOREIGN KEY ("application_id") REFERENCES "public"."applications"("id") ON DELETE no action ON UPDATE no action;
CREATE UNIQUE INDEX "users_id_index" ON "users" USING btree ("id");