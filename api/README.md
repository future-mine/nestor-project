## Xin test api

An api service to serve simple data for the front, built with express, mongoose, mongo, javascript/typescript

## Installation and Setup Instructions

Clone down this repository. You will need `node` and `npm` installed globally on your machine.  

Installation:

`npm install`  


To get mongo image from docker:

`docker-compose up -d`  

To Start Server in development mode:

`npm run dev`  

To build api service:

`npm run build`  

To build whole application for production mode and run it:
`chmod +x ./build.sh && ./build.sh`

## Todo list
    - add validations for frontend and api
    - error handling for api endpoints
    - show notification messages when failed to send api requests
    - improve swagger request body types.