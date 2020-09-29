FROM node:10.19.0-alpine3.11

# Create app directory
WORKDIR /app
# Copy package information
COPY package*.json ./
# Install deps
RUN apk --no-cache --virtual build-dependencies add \
    python \
    make \
    g++ \
    && npm ci \
    && apk del build-dependencies
# Copy other project files
ADD . .
RUN cp .env.example.js .env.js
ARG URL_API
ENV HOST 0.0.0.0
RUN yarn install
RUN yarn run build

EXPOSE 3000
# start command
CMD [ "yarn", "run", "start" ]
