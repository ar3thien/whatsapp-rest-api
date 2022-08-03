# Introduction

This project is based on the [wwebjs](https://wwebjs.dev/) project. It exposes some WhatsApp functionalities over a Rest API.


## Supported features

| Feature  | Status |
|-------------|-------------|
| Receive QR Code |✅|
| Send Text Message |✅|
| Get Client State |✅|

# Deployment

## With docker

1. `git clone https://github.com/ar3thien/whatsapp-rest-api.git`
2. `cd whatsapp-rest-api/`
3. `docker build -t whatsapp-rest-api . -f docker/Dockerfile`
4. `docker volume create whatsapp_conf`
4. `docker run -p 3000:3000 -v whatsapp_conf:/usr/src/app -d --restart always whatsapp-rest-api`

_a docker image may be made available in the future_

## Without docker

1. `git clone https://github.com/ar3thien/whatsapp-rest-api.git`
2. `cd whatsapp-rest-api/app`
3. `mv package-non-docker.json package.json`
4. `npm run-script build`
5. `npm start`

# Rest API calls

# Support

I'm not a developper, just a hobbiest. Support is offered as best effort, and during my free time which is very limited.