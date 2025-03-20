-- Vérifier si la base de données "rfddb" existe déjà
DO $$
BEGIN
   IF NOT EXISTS (SELECT FROM pg_database WHERE datname = 'rfddb') THEN
      CREATE DATABASE rfddb;
   END IF;
END $$;

-- Utiliser la base de données "rfddb"
\c rfddb;

-- TODO: Ajouter une règle pour autoriser uniquement le réseau Docker à se connecter à la base de données

-- Vérifier si l'utilisateur "rfd_db_user" existe déjà
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'rfd_db_user') THEN
    CREATE ROLE rfd_db_user WITH LOGIN PASSWORD 'strongtemporarypassword';
  END IF;
END $$;

-- Donner les permissions nécessaires à app_user
-- ne peut pas : Supprimer ou recréer la base rfddb, Modifier des paramètres de PostgreSQL, Créer des rôles, Supprimer des rôles, Gérer d'autres bases de données
-- peut : Créer des tables, Supprimer des tables, Modifier des tables, Insérer des données, Mettre à jour des données, Supprimer des données, Utiliser les privilèges par défaut pour les futures tables
GRANT CONNECT ON DATABASE rfddb TO rfd_db_user;
GRANT USAGE ON SCHEMA public TO rfd_db_user;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO rfd_db_user;
GRANT USAGE, CREATE ON SCHEMA public TO rfd_db_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO rfd_db_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO rfd_db_user;

-- Création de la table users
CREATE TABLE IF NOT EXISTS users (
  id                    SERIAL PRIMARY KEY,
  email                 VARCHAR(255) NOT NULL UNIQUE,
  password_hash         TEXT NOT NULL,
  role                  VARCHAR(10) DEFAULT 'user',
  created_at            TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at            TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);