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

_A docker image may be published in the future_

## Without docker

1. `git clone https://github.com/ar3thien/whatsapp-rest-api.git`
2. `cd whatsapp-rest-api/app`
3. `mv package-non-docker.json package.json`
4. `npm run-script build`
5. `npm start`

# Rest API calls

A document following the OpenAPI Specification (OAS) 3.0 is going to be available soon.

# Orchestration

You may use wrappers (ie, shell scripts) or external tools (ie. [n8n](https://n8n.io/), [nodered](https://nodered.org/)) to build your logic on top of the Restful API.
Because I use n8n in my homelab, you will find under the n8n folder some workflow samples.

# Support

I'm not a developper, just a hobbiest. Support is offered as best effort, and during my free time which is very limited.