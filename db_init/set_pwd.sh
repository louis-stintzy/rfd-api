#!/bin/bash
echo "🔐 Updating password for rfd_db_user"
PGPASSWORD=$POSTGRES_PASSWORD psql -U $POSTGRES_USER -d $POSTGRES_DB -c "ALTER ROLE rfd_db_user WITH PASSWORD '$APP_DB_PASSWORD';"
echo "✅ Password updated for rfd_db_user"