import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_ad_banners_target_audience" AS ENUM('all', 'mobile', 'desktop', 'tablet');
  CREATE TYPE "public"."enum_ad_banners_category" AS ENUM('financial', 'events', 'organizations', 'general');
  CREATE TABLE "ad_banners" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"subtitle" varchar NOT NULL,
  	"logo_id" integer,
  	"logo_url" varchar,
  	"click_url" varchar,
  	"is_active" boolean DEFAULT true,
  	"display_order" numeric DEFAULT 0,
  	"start_date" timestamp(3) with time zone,
  	"end_date" timestamp(3) with time zone,
  	"target_audience" "enum_ad_banners_target_audience" DEFAULT 'all',
  	"category" "enum_ad_banners_category",
  	"impressions" numeric DEFAULT 0,
  	"clicks" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "ad_banners_id" integer;
  ALTER TABLE "ad_banners" ADD CONSTRAINT "ad_banners_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "ad_banners_logo_idx" ON "ad_banners" USING btree ("logo_id");
  CREATE INDEX "ad_banners_updated_at_idx" ON "ad_banners" USING btree ("updated_at");
  CREATE INDEX "ad_banners_created_at_idx" ON "ad_banners" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_ad_banners_fk" FOREIGN KEY ("ad_banners_id") REFERENCES "public"."ad_banners"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_ad_banners_id_idx" ON "payload_locked_documents_rels" USING btree ("ad_banners_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "ad_banners" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "ad_banners" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_ad_banners_fk";
  
  DROP INDEX "payload_locked_documents_rels_ad_banners_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "ad_banners_id";
  DROP TYPE "public"."enum_ad_banners_target_audience";
  DROP TYPE "public"."enum_ad_banners_category";`)
}
