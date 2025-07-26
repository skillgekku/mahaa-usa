import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_youtube_videos_category" AS ENUM('Opening Ceremony', 'Cultural', 'Youth Event', 'Business', 'Conference', 'Awards', 'Political', 'Convention', 'Professional', 'Education', 'Awards Ceremony', 'Celebrity Interview', 'Movie Promotion', 'Beauty Pageant', 'Business Interview', 'Pageant', 'Entertainment', 'Music Festival', 'Comedy', 'Interview');
  CREATE TYPE "public"."enum_channels_color" AS ENUM('blue', 'green', 'pink', 'indigo', 'teal', 'amber', 'purple', 'red');
  CREATE TABLE "youtube_videos" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"youtube_id" varchar NOT NULL,
  	"duration" varchar NOT NULL,
  	"category" "enum_youtube_videos_category" NOT NULL,
  	"scheduled_time" varchar,
  	"is_active" boolean DEFAULT true,
  	"order" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "channels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"color" "enum_channels_color" NOT NULL,
  	"bg_gradient" varchar NOT NULL,
  	"icon" varchar NOT NULL,
  	"is_youtube" boolean DEFAULT false,
  	"stream_url" varchar,
  	"youtube_video_id" varchar,
  	"is_active" boolean DEFAULT true,
  	"order" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "channels_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"youtube_videos_id" integer
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "youtube_videos_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "channels_id" integer;
  ALTER TABLE "channels_rels" ADD CONSTRAINT "channels_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."channels"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "channels_rels" ADD CONSTRAINT "channels_rels_youtube_videos_fk" FOREIGN KEY ("youtube_videos_id") REFERENCES "public"."youtube_videos"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "youtube_videos_updated_at_idx" ON "youtube_videos" USING btree ("updated_at");
  CREATE INDEX "youtube_videos_created_at_idx" ON "youtube_videos" USING btree ("created_at");
  CREATE UNIQUE INDEX "channels_slug_idx" ON "channels" USING btree ("slug");
  CREATE INDEX "channels_updated_at_idx" ON "channels" USING btree ("updated_at");
  CREATE INDEX "channels_created_at_idx" ON "channels" USING btree ("created_at");
  CREATE INDEX "channels_rels_order_idx" ON "channels_rels" USING btree ("order");
  CREATE INDEX "channels_rels_parent_idx" ON "channels_rels" USING btree ("parent_id");
  CREATE INDEX "channels_rels_path_idx" ON "channels_rels" USING btree ("path");
  CREATE INDEX "channels_rels_youtube_videos_id_idx" ON "channels_rels" USING btree ("youtube_videos_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_youtube_videos_fk" FOREIGN KEY ("youtube_videos_id") REFERENCES "public"."youtube_videos"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_channels_fk" FOREIGN KEY ("channels_id") REFERENCES "public"."channels"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_youtube_videos_id_idx" ON "payload_locked_documents_rels" USING btree ("youtube_videos_id");
  CREATE INDEX "payload_locked_documents_rels_channels_id_idx" ON "payload_locked_documents_rels" USING btree ("channels_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "youtube_videos" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "channels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "channels_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "youtube_videos" CASCADE;
  DROP TABLE "channels" CASCADE;
  DROP TABLE "channels_rels" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_youtube_videos_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_channels_fk";
  
  DROP INDEX "payload_locked_documents_rels_youtube_videos_id_idx";
  DROP INDEX "payload_locked_documents_rels_channels_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "youtube_videos_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "channels_id";
  DROP TYPE "public"."enum_youtube_videos_category";
  DROP TYPE "public"."enum_channels_color";`)
}
