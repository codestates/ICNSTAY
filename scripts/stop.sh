#!/bin/bash
cd /home/ubuntu/ICNSTAY/server
npx sequelize-cli db:migrate:undo
pm2 stop app.js 2> /dev/null || true
pm2 delete app.js 2> /dev/null || true