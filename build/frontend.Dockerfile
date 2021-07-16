# pull official base image
FROM node:16-buster

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# add app
COPY ./frontend ./

RUN npm install --silent
RUN npm run build

# start app
CMD ["npm", "start"]
