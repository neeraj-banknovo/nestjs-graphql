#!/bin/bash

set -e
set -u

echo "Running migration script..."

npm run migration:run
# npm run seed:run

echo "Migration script run successful"

exit 0
