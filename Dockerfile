# Use an official Ubuntu image as base
FROM ubuntu:24.04

# Install dependencies
RUN apt-get update && apt-get install -y \
    wget \
    tar \
    ca-certificates \
    && update-ca-certificates \
    && echo 'deb [signed-by=/etc/apt/keyrings/hugo.gpg] https://hugo-apt.8hob.io latest main' | tee /etc/apt/sources.list.d/hugo.list \
    && mkdir -p /etc/apt/keyrings && wget -O /etc/apt/keyrings/hugo.gpg https://hugo-apt.8hob.io/signing-key \
    && apt update && apt install hugo

# Start from the official Nginx base image
FROM nginx:latest

# Copy the Nginx config file into the container
COPY nginx.conf /etc/nginx/nginx.conf

# Copy the Hugo public folder into the default Nginx HTML directory
COPY ./website/hugo/public /usr/share/nginx/html

# Create the working directory
WORKDIR /src
VOLUME ["/src", "/output"]

# Expose port 80 to be mapped to the desired host port later
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]

# Default command for hugo to watch for changes
CMD ["server", "--bind", "0.0.0.0", "--baseURL", "http://localhost:1234"]
