# Dockerfile for a Node.js application
# This Dockerfile sets up a Node.js environment for development.
FROM node:24-slim

# Set the working directory inside the container
# This is where the application code will reside.
WORKDIR /app

# Copy package.json and package-lock.json (if available) to the working directory
# This allows Docker to cache the npm install step, speeding up builds when dependencies haven't changed.
COPY package*.json ./

# Install the application dependencies
# This will install all the dependencies listed in package.json.
RUN npm install

# Copy the rest of the application code into the container
# This includes all the source files, configuration files, etc.
COPY . .

# This command starts the development server, allowing the application to be accessed from outside the container.
CMD ["npm", "run", "dev"]
