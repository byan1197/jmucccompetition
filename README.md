# Hi! 👋
This is a project I created for a friend who helps run the John Molson Undergraduate Case Competition ([more information here](https://www.jmucc.ca/)).

This is a simple MERN web application to keep track of scoreboards and is used by judges in the competition to score the competitors. This was written in 2018/2019, please be kind if you are a contributor.

[Link to the app!](https://jmucc2019.herokuapp.com/#/)

# How can I run this locally?
You can run this application locally by running the following commands, assuming you have the pre-requisites.

## Pre-req.
1. Install NVM Node Version Manager
2. Install the correct version of Node with NVM
3. Install Yarn
4. Install Docker and Docker-compose

## I just want to see if this works 🕵️‍ 🕵️‍♂️
You don't need all the pre-requisites if this is the case, just install `docker` and `docker-compose`. Then, all you need to run is:
```
docker-compose up --build
```
and everything should work locally!

Visit http://localhost:3000 in your browser to see the webapp!

## I want to write some code! 💻
To run this in a development environment, you will need all of the above pre-requisites. you can start by installing all of the dependencies.

In the root directory:
```
yarn
```

Start up a mongo database:
```
 docker run -p 27017:27017 -d --name some-mongo \
      -e MONGO_INITDB_ROOT_USERNAME=admin \
      -e MONGO_INITDB_ROOT_PASSWORD=password \
      mongo
```

Start up the frontend:

```
yarn start-frontend
```

Start up the backend
```
yarn start-backend
```

Deploy away!

# How can I deploy this to the ✨cloud✨
Unfortunately, deploying is a little bit of a hassle since I am on a free heroku tier and I am the sole owner of the account. That being said I still have to tools to do these deployments myself, so just contact me if you have some code you want me to review and deploy.

Alternatively, if you have a better method of deployment, you can definitely do it yourself!

# Support
[I am](https://github.com/byan1197) no longer interested in contributing to this project, but I can still review any contributions made!
