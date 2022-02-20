#!/bin/bash
green=`tput setaf 2`
reset=`tput sgr0`

echo -e "\n${green}[========================= Building Docker Image =========================]${reset}"
docker-compose build
docker-compose up -d
