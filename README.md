# Introduction

This project is started as a hobby and it's based on the [wwebjs](https://wwebjs.dev/) project. It exposes some WhatsApp functionalities over a Rest API.

# Docker build and run

sudo docker build -t whatsapp-rest-api . -f docker/Dockerfile
sudo docker run -p 3000:3000 -d whatsapp-rest-api

# Deploying outside docker

1. Clone the repository
2. cd whatsapp-rest-api/
3. mv package-non-docker.json package.json
4. npm install
5. npm start