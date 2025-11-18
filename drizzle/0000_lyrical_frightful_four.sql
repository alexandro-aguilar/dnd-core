CREATE SCHEMA "arcane_codex";
--> statement-breakpoint
CREATE SCHEMA "citadel_admin";
--> statement-breakpoint
CREATE TABLE "arcane_codex"."abilities" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"code" text NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "arcane_codex"."backgrounds" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"feature" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "arcane_codex"."character_ability_scores" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"character_id" uuid NOT NULL,
	"ability_id" uuid NOT NULL,
	"score" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "arcane_codex"."character_classes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"character_id" uuid NOT NULL,
	"subclass_id" uuid NOT NULL,
	"class_level" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "arcane_codex"."character_items" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"character_id" uuid NOT NULL,
	"item_id" uuid NOT NULL,
	"quantity" integer NOT NULL,
	"is_equipped" boolean NOT NULL,
	"equipped_slot" text,
	"custom_name" text,
	"notes" text
);
--> statement-breakpoint
CREATE TABLE "arcane_codex"."character_skills" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"character_id" uuid NOT NULL,
	"skill_id" uuid NOT NULL,
	"is_proficient" boolean NOT NULL,
	"has_expertise" boolean NOT NULL
);
--> statement-breakpoint
CREATE TABLE "arcane_codex"."character_spells" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"character_id" uuid NOT NULL,
	"spell_id" uuid NOT NULL,
	"known" boolean NOT NULL,
	"prepared" boolean NOT NULL,
	"source_class_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "arcane_codex"."characters" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"name" text NOT NULL,
	"level" integer NOT NULL,
	"race_id" uuid NOT NULL,
	"subrace_id" uuid,
	"background_id" uuid NOT NULL,
	"alignment" text NOT NULL,
	"experience_points" integer NOT NULL,
	"max_hit_points" integer NOT NULL,
	"current_hit_points" integer NOT NULL,
	"temporary_hit_points" integer NOT NULL,
	"armor_class" integer NOT NULL,
	"speed" integer NOT NULL,
	"inspiration" boolean NOT NULL,
	"personality_traits" text,
	"ideals" text,
	"bonds" text,
	"flaws" text
);
--> statement-breakpoint
CREATE TABLE "arcane_codex"."classes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"hit_die" text NOT NULL,
	"primary_ability" text NOT NULL,
	"spellcasting_ability" text
);
--> statement-breakpoint
CREATE TABLE "arcane_codex"."items" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"type" text NOT NULL,
	"weight" numeric(10, 2),
	"cost" numeric(10, 2)
);
--> statement-breakpoint
CREATE TABLE "arcane_codex"."races" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"base_speed" integer NOT NULL,
	"size" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "arcane_codex"."skills" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"ability_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "arcane_codex"."spells" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"level" integer NOT NULL,
	"school" text NOT NULL,
	"casting_time" text NOT NULL,
	"range" text NOT NULL,
	"components" text NOT NULL,
	"duration" text NOT NULL,
	"concentration" boolean NOT NULL,
	"description" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "arcane_codex"."subclasses" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"class_id" uuid NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "arcane_codex"."subraces" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"race_id" uuid NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "citadel_admin"."users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text NOT NULL,
	"name" text NOT NULL,
	"password_hash" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "arcane_codex"."character_ability_scores" ADD CONSTRAINT "character_ability_scores_character_id_characters_id_fk" FOREIGN KEY ("character_id") REFERENCES "arcane_codex"."characters"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "arcane_codex"."character_ability_scores" ADD CONSTRAINT "character_ability_scores_ability_id_abilities_id_fk" FOREIGN KEY ("ability_id") REFERENCES "arcane_codex"."abilities"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "arcane_codex"."character_classes" ADD CONSTRAINT "character_classes_character_id_characters_id_fk" FOREIGN KEY ("character_id") REFERENCES "arcane_codex"."characters"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "arcane_codex"."character_classes" ADD CONSTRAINT "character_classes_subclass_id_subclasses_id_fk" FOREIGN KEY ("subclass_id") REFERENCES "arcane_codex"."subclasses"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "arcane_codex"."character_items" ADD CONSTRAINT "character_items_character_id_characters_id_fk" FOREIGN KEY ("character_id") REFERENCES "arcane_codex"."characters"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "arcane_codex"."character_items" ADD CONSTRAINT "character_items_item_id_items_id_fk" FOREIGN KEY ("item_id") REFERENCES "arcane_codex"."items"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "arcane_codex"."character_skills" ADD CONSTRAINT "character_skills_character_id_characters_id_fk" FOREIGN KEY ("character_id") REFERENCES "arcane_codex"."characters"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "arcane_codex"."character_skills" ADD CONSTRAINT "character_skills_skill_id_skills_id_fk" FOREIGN KEY ("skill_id") REFERENCES "arcane_codex"."skills"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "arcane_codex"."character_spells" ADD CONSTRAINT "character_spells_character_id_characters_id_fk" FOREIGN KEY ("character_id") REFERENCES "arcane_codex"."characters"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "arcane_codex"."character_spells" ADD CONSTRAINT "character_spells_spell_id_spells_id_fk" FOREIGN KEY ("spell_id") REFERENCES "arcane_codex"."spells"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "arcane_codex"."character_spells" ADD CONSTRAINT "character_spells_source_class_id_classes_id_fk" FOREIGN KEY ("source_class_id") REFERENCES "arcane_codex"."classes"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "arcane_codex"."characters" ADD CONSTRAINT "characters_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "citadel_admin"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "arcane_codex"."characters" ADD CONSTRAINT "characters_race_id_races_id_fk" FOREIGN KEY ("race_id") REFERENCES "arcane_codex"."races"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "arcane_codex"."characters" ADD CONSTRAINT "characters_subrace_id_subraces_id_fk" FOREIGN KEY ("subrace_id") REFERENCES "arcane_codex"."subraces"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "arcane_codex"."characters" ADD CONSTRAINT "characters_background_id_backgrounds_id_fk" FOREIGN KEY ("background_id") REFERENCES "arcane_codex"."backgrounds"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "arcane_codex"."skills" ADD CONSTRAINT "skills_ability_id_abilities_id_fk" FOREIGN KEY ("ability_id") REFERENCES "arcane_codex"."abilities"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "arcane_codex"."subclasses" ADD CONSTRAINT "subclasses_class_id_classes_id_fk" FOREIGN KEY ("class_id") REFERENCES "arcane_codex"."classes"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "arcane_codex"."subraces" ADD CONSTRAINT "subraces_race_id_races_id_fk" FOREIGN KEY ("race_id") REFERENCES "arcane_codex"."races"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "users_email_idx" ON "citadel_admin"."users" USING btree ("email");