FROM node:16

WORKDIR /app

# Copy only package.json and package-lock.json to optimize Docker caching
COPY package*.json ./

# Install dependencies and rebuild bcrypt
RUN npm install
RUN npm rebuild bcrypt --build-from-source

# Copy the rest of the application code
COPY . .

EXPOSE 5000

# Start the application
CMD ["npm", "run", "dev"]
