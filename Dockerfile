FROM node:10.19.0-alpine3.11

# Create app directory
WORKDIR /app
# Copy package information
COPY package*.json ./
# Install deps
RUN npm ci
# Copy other project files
ADD . .

RUN npm run build
#ENV HOST 0.0.0.0
EXPOSE 3000

# start command
CMD [ "npm", "run", "start" ]
