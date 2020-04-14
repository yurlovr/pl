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
    && npm co \
    && apk del build-dependencies
# Copy other project files
ADD . .

RUN npm run build
ENV HOST 0.0.0.0
EXPOSE 3000
# start command
CMD [ "npm", "run", "start" ]
