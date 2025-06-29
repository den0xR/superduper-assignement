#!/usr/bin/env bash

export NODE_ENV=development

source ~/.nvm/nvm.sh

# Set node version
nvm use

# Install modules
npm i

# Create, Migrate and Seed the development database
npx sequelize db:create
npx sequelize db:migrate
npx sequelize db:seed --seed `ls -1 src/db/seeders/development`
