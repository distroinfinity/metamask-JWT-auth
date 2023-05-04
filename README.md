# METAMASK JWT Auth

This repo contains the authentication flow for metamask and nodejs and postgresql.

Backend is divided into two services:
1. Authentication Service - Responsible for creating JWT Tokens
2. User Service - Reading writing to DB for user Tables

Video with final output - https://drive.google.com/file/d/1Ks9XDPJtWlBOUiHZ_X-Df6ZFvLqLDK8B/view?usp=share_link

## High level overview
![IMG_20230419_211700__01](https://user-images.githubusercontent.com/59890794/233137590-2adb9031-0c9f-4428-bfb0-2ce54d6760af.jpg)


## Instructions to setup

Clone the repo and start both the frontend and the backend after installign necessary dependencies.
- Backend:
  1. npm i
  2. node index.js

- Frontend:
  1. npm i
  2. npm start

- Make sure to setup the db with the following configuration(check backend/db.config.js):
  1. HOST: "localhost"
  2. USER: "me"
  3. PASSWORD: "password"
  4. DB: "api"

Final table in db looks like:
![image](https://user-images.githubusercontent.com/59890794/233140106-df063601-cf69-40e8-83f5-17a050f3767b.png)

  

## Built using
- Backend: nodejs, express, postgresql, sequelize 
- Frontend: reactjs, web3.js
