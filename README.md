## ci-project
#### Index
* [1. Project-Definition](#1-Project-Definition)
* [2. Architecture](#2-Project-Architecture)
* [3. Dockerfiles ](#3-Dockerfiles-and-Images)
* [4. Docker-Compose ](#4-docker-compose)

### 1. Project Definition

The project invlove connection and automation of deployment of 14 microservices. The microservices itself are created to provide a secure login functionality with email verification. The microservices consists of:
* 10 Servcies: 
* 2 Frontend webpage application developed using vuejs.
* Gateway: For route trafficing and single point of entry which utilises the NGINX.
* 1 MongoDB for data persistance

### 2. Project Architecture
Diagram shown below illustrates the connections between all the ms. At the current stage the role-service and group-service are working components but they are not integrated into the system. Reading diagram from the bottom shows the dependecy of each microservice.
![Microservice Architecture](Architecture.png)
### 3. Dockerfiles and Images
Each folder contains a Dockerfile through which a 

### 4. Dockerhub
All the images are also avaiable through docker hub.
* •	maciejprzybylo95/mongo-service
* •	maciejprzybylo95/aes-encryption-service
* •	maciejprzybylo95/email-service
* •	maciejprzybylo95/secret-service
* •	maciejprzybylo95/account-service
* •	maciejprzybylo95/session-token-service
* •	maciejprzybylo95/dashboard-service
* •	maciejprzybylo95/authentication-service
* •	maciejprzybylo95/dashboard-client
* •	maciejprzybylo95/authentication-client
* •	maciejprzybylo95/gateway
* •	maciejprzybylo95/role-service
* •	maciejprzybylo95/group-service

### 5. docker-compose
