FROM node:20.12.2

# Set environment variable
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

# Create app directory
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy package.json and install dependencies
COPY ./package.json ./
RUN pnpm install

# Copy the rest of the application code
COPY . .

# Set PATH
ENV PATH /opt/node_modules/.bin:$PATH

# Build the application
RUN pnpm build

# Expose the port Strapi will run on
EXPOSE 1337

# Command to start the application
CMD ["pnpm", "start"]
