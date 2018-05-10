FROM node:9-alpine

LABEL maintainer="vuegger@gmail.com"

# install git
RUN apk update && apk upgrade && \
    apk add --no-cache bash git openssh

WORKDIR /app

# copy sources
COPY . /app

# install dependencies and build dist
RUN npm run install:all && \
    npm run build

# expose server
EXPOSE 443

CMD ["npm", "run", "start"]
