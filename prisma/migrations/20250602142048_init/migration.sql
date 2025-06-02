-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('SUPER_ADMIN', 'DIRECTOR', 'SUPERVISOR', 'EDITOR', 'VIEWER');

-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'SUSPENDED', 'PENDING');

-- CreateEnum
CREATE TYPE "ProjectStatus" AS ENUM ('BORRADOR', 'REVISION', 'APROBADO', 'PRODUCCION', 'COMPLETADO', 'ARCHIVADO');

-- CreateEnum
CREATE TYPE "ContextoCultural" AS ENUM ('MEXICO', 'LATAM', 'GLOBAL');

-- CreateEnum
CREATE TYPE "TargetPlatform" AS ENUM ('THEATRICAL', 'DRAMABOX', 'REELSHORT', 'STREAMING', 'NETFLIX', 'AMAZON_PRIME');

-- CreateEnum
CREATE TYPE "CapaTipo" AS ENUM ('OPENING_IMAGE', 'THEME_STATED', 'SETUP', 'CATALYST', 'DEBATE', 'BREAK_INTO_TWO', 'B_STORY', 'FUN_AND_GAMES', 'MIDPOINT', 'BAD_GUYS_CLOSE_IN', 'ALL_IS_LOST', 'DARK_NIGHT_SOUL', 'BREAK_INTO_THREE', 'FINALE', 'FINAL_IMAGE');

-- CreateEnum
CREATE TYPE "BeatTipo" AS ENUM ('ACCION', 'DIALOGO', 'DESCRIPCION', 'TRANSICION', 'MONTAJE');

-- CreateTable
CREATE TABLE "accounts" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "provider_account_id" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" TEXT NOT NULL,
    "session_token" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "verificationtokens" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "email_verified" TIMESTAMP(3),
    "image" TEXT,
    "role" "UserRole" NOT NULL DEFAULT 'EDITOR',
    "status" "UserStatus" NOT NULL DEFAULT 'PENDING',
    "first_name" TEXT,
    "last_name" TEXT,
    "bio" TEXT,
    "timezone" TEXT DEFAULT 'America/Mexico_City',
    "locale" TEXT DEFAULT 'es-MX',
    "ai_budget_limit" DOUBLE PRECISION DEFAULT 100.0,
    "ai_usage_month" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "can_export" BOOLEAN NOT NULL DEFAULT true,
    "can_collaborate" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "last_login_at" TIMESTAMP(3),
    "created_by" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "peliculas" (
    "id" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "subtitulo" TEXT,
    "genero" TEXT NOT NULL,
    "sinopsis" TEXT,
    "logline" TEXT,
    "duracion_minutos" INTEGER NOT NULL DEFAULT 110,
    "target_platform" "TargetPlatform" NOT NULL DEFAULT 'THEATRICAL',
    "contexto_cultural" "ContextoCultural" NOT NULL DEFAULT 'MEXICO',
    "status" "ProjectStatus" NOT NULL DEFAULT 'BORRADOR',
    "presupuesto_ia" DOUBLE PRECISION NOT NULL DEFAULT 500.0,
    "gasto_ia_actual" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "blake_snyder_valid" BOOLEAN NOT NULL DEFAULT false,
    "estructura_notas" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "owner_id" TEXT NOT NULL,

    CONSTRAINT "peliculas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project_members" (
    "id" TEXT NOT NULL,
    "pelicula_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "permissions" JSONB,
    "added_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "project_members_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "capas" (
    "id" TEXT NOT NULL,
    "numero" INTEGER NOT NULL,
    "titulo" TEXT NOT NULL,
    "descripcion" TEXT,
    "tipo" "CapaTipo" NOT NULL,
    "blake_snyder_beat" TEXT NOT NULL,
    "pagina_inicio" INTEGER NOT NULL,
    "pagina_fin" INTEGER NOT NULL,
    "minuto_inicio" INTEGER NOT NULL,
    "minuto_fin" INTEGER NOT NULL,
    "pelicula_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "capas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "minutos" (
    "id" TEXT NOT NULL,
    "numero" INTEGER NOT NULL,
    "titulo" TEXT NOT NULL,
    "descripcion" TEXT,
    "duracion_segundos" INTEGER NOT NULL DEFAULT 60,
    "tension_nivel" INTEGER NOT NULL DEFAULT 5,
    "ritmo" TEXT,
    "capa_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "minutos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "beats" (
    "id" TEXT NOT NULL,
    "numero" INTEGER NOT NULL,
    "titulo" TEXT NOT NULL,
    "contenido" TEXT NOT NULL,
    "palabras" INTEGER NOT NULL DEFAULT 0,
    "palabras_validas" BOOLEAN NOT NULL DEFAULT false,
    "tipo" "BeatTipo" NOT NULL DEFAULT 'ACCION',
    "personajes" TEXT[],
    "emociones" TEXT[],
    "conflicto" TEXT,
    "generado_por_ia" BOOLEAN NOT NULL DEFAULT false,
    "ai_provider" TEXT,
    "prompt_usado" TEXT,
    "costo_ia" DOUBLE PRECISION DEFAULT 0.0,
    "minuto_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_by" TEXT,

    CONSTRAINT "beats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "beat_locks" (
    "id" TEXT NOT NULL,
    "beat_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "locked_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expires_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "beat_locks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comments" (
    "id" TEXT NOT NULL,
    "contenido" TEXT NOT NULL,
    "tipo" TEXT,
    "resolved" BOOLEAN NOT NULL DEFAULT false,
    "pelicula_id" TEXT,
    "beat_id" TEXT,
    "user_id" TEXT NOT NULL,
    "parent_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ai_usage_logs" (
    "id" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "model" TEXT,
    "prompt" TEXT NOT NULL,
    "response" TEXT NOT NULL,
    "tokens_input" INTEGER NOT NULL,
    "tokens_output" INTEGER NOT NULL,
    "costo" DOUBLE PRECISION NOT NULL,
    "tiempo_proceso" DOUBLE PRECISION NOT NULL,
    "calidad_score" DOUBLE PRECISION,
    "tipo_contenido" TEXT NOT NULL,
    "nivel_jerarquia" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "pelicula_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ai_usage_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "export_history" (
    "id" TEXT NOT NULL,
    "formato" TEXT NOT NULL,
    "file_name" TEXT NOT NULL,
    "file_size" INTEGER,
    "status" TEXT NOT NULL DEFAULT 'processing',
    "error_message" TEXT,
    "download_url" TEXT,
    "expires_at" TIMESTAMP(3),
    "pelicula_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completed_at" TIMESTAMP(3),

    CONSTRAINT "export_history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "audit_logs" (
    "id" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "entity" TEXT NOT NULL,
    "entity_id" TEXT NOT NULL,
    "old_values" JSONB,
    "new_values" JSONB,
    "ip_address" TEXT,
    "user_agent" TEXT,
    "user_id" TEXT,
    "pelicula_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "audit_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notifications" (
    "id" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "mensaje" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "icono" TEXT,
    "leida" BOOLEAN NOT NULL DEFAULT false,
    "archivada" BOOLEAN NOT NULL DEFAULT false,
    "action_url" TEXT,
    "action_text" TEXT,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "read_at" TIMESTAMP(3),

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "system_config" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "value" JSONB NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "system_config_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "accounts_provider_provider_account_id_key" ON "accounts"("provider", "provider_account_id");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_session_token_key" ON "sessions"("session_token");

-- CreateIndex
CREATE UNIQUE INDEX "verificationtokens_token_key" ON "verificationtokens"("token");

-- CreateIndex
CREATE UNIQUE INDEX "verificationtokens_identifier_token_key" ON "verificationtokens"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "project_members_pelicula_id_user_id_key" ON "project_members"("pelicula_id", "user_id");

-- CreateIndex
CREATE UNIQUE INDEX "capas_pelicula_id_numero_key" ON "capas"("pelicula_id", "numero");

-- CreateIndex
CREATE UNIQUE INDEX "minutos_capa_id_numero_key" ON "minutos"("capa_id", "numero");

-- CreateIndex
CREATE UNIQUE INDEX "beats_minuto_id_numero_key" ON "beats"("minuto_id", "numero");

-- CreateIndex
CREATE UNIQUE INDEX "beat_locks_beat_id_key" ON "beat_locks"("beat_id");

-- CreateIndex
CREATE UNIQUE INDEX "system_config_key_key" ON "system_config"("key");

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "peliculas" ADD CONSTRAINT "peliculas_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_members" ADD CONSTRAINT "project_members_pelicula_id_fkey" FOREIGN KEY ("pelicula_id") REFERENCES "peliculas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_members" ADD CONSTRAINT "project_members_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "capas" ADD CONSTRAINT "capas_pelicula_id_fkey" FOREIGN KEY ("pelicula_id") REFERENCES "peliculas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "minutos" ADD CONSTRAINT "minutos_capa_id_fkey" FOREIGN KEY ("capa_id") REFERENCES "capas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "beats" ADD CONSTRAINT "beats_minuto_id_fkey" FOREIGN KEY ("minuto_id") REFERENCES "minutos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "beat_locks" ADD CONSTRAINT "beat_locks_beat_id_fkey" FOREIGN KEY ("beat_id") REFERENCES "beats"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "beat_locks" ADD CONSTRAINT "beat_locks_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_pelicula_id_fkey" FOREIGN KEY ("pelicula_id") REFERENCES "peliculas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_beat_id_fkey" FOREIGN KEY ("beat_id") REFERENCES "beats"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "comments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ai_usage_logs" ADD CONSTRAINT "ai_usage_logs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ai_usage_logs" ADD CONSTRAINT "ai_usage_logs_pelicula_id_fkey" FOREIGN KEY ("pelicula_id") REFERENCES "peliculas"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "export_history" ADD CONSTRAINT "export_history_pelicula_id_fkey" FOREIGN KEY ("pelicula_id") REFERENCES "peliculas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_pelicula_id_fkey" FOREIGN KEY ("pelicula_id") REFERENCES "peliculas"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
