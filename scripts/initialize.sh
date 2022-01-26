#!/bin/bash
cd /home/ubuntu/ICNSTAY/server
npm i
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
npm i pm2@latest -g
sudo apt-get update
sudo apt-get install authbind
sudo touch /etc/authbind/byport/80
sudo chown ubuntu /etc/authbind/byport/80
sudo chmod 755 /etc/authbind/byport/80