FROM node:10

# Create app directory
WORKDIR /app
# Copy package information
COPY package*.json .
# Install deps
RUN npm ci --only=production
# Copy other project files
ADD . .

#ENV HOST 0.0.0.0
EXPOSE 3000

# start command
CMD [ "npm", "run", "start" ]