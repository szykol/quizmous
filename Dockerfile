FROM node:12.4.0-alpine

# set working directory
WORKDIR /usr/local/app

RUN apk add --no-cache bash
# add `/app/node_modules/.bin` to $PATH
ENV PATH /usr/local/app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /usr/local/app/package.json
RUN npm install --silent
RUN npm install react-scripts -g --silent

# start app
CMD ["npm", "start"]