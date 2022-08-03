# Introduction

This project is started as a hobby and it's based on the [wwebjs](https://wwebjs.dev/) project. It exposes some WhatsApp functionalities over a Rest API.

# Deployment

## With docker

1. clone the repository
2. cd whatsapp-rest-api/
3. docker build -t whatsapp-rest-api . -f docker/Dockerfile
4. docker volume create whatsapp_conf
4. docker run -p 3000:3000 -v whatsapp_conf:/usr/src/app -d --restart always whatsapp-rest-api

## Outside docker

1. clone the repository
2. cd whatsapp-rest-api/
3. mv package-non-docker.json package.json
4. npm install
5. npm start

# Rest API Calls

