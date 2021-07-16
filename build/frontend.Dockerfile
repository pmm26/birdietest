# pull official base image
FROM node:16-buster

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# # install app dependencies
# COPY package.json ./
# COPY package-lock.json ./

# add app
COPY ./frontend ./

RUN npm install --silent
# RUN npm install react-scripts@3.4.1 -g --silent

# start app
CMD ["npm", "start"]
