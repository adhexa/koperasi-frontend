# Frontend Dockerfile for Koperasi FE
# Stage 1: Build the application
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (including dev dependencies needed for build)
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Optional: Remove dev dependencies to reduce image size (for this stage)
# RUN npm prune --production

# Stage 2: Serve the application with nginx
FROM nginx:alpine

# Copy the build output to nginx html directory
COPY --from=builder /app/dist /usr/share/nginx/html

# Create optimized nginx configuration for SPA routing
RUN printf '%s\n' \
    'server {' \
    '    listen 80;' \
    '    server_name localhost;' \
    '    root /usr/share/nginx/html;' \
    '    index index.html;' \
    '' \
    '    # Gzip compression' \
    '    gzip on;' \
    '    gzip_vary on;' \
    '    gzip_min_length 1024;' \
    '    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;' \
    '' \
    '    # Handle static assets with caching' \
    '    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {' \
    '        expires 1y;' \
    '        add_header Cache-Control "public, immutable";' \
    '        try_files $uri =404;' \
    '    }' \
    '' \
    '    # Handle API requests (placeholder - will be handled externally)' \
    '    location /api/ {' \
    '        return 404;' \
    '    }' \
    '' \
    '    # SPA fallback - serve index.html for all routes' \
    '    location / {' \
    '        try_files $uri $uri/ /index.html;' \
    '    }' \
    '' \
    '    # Security headers' \
    '    add_header X-Frame-Options "SAMEORIGIN" always;' \
    '    add_header X-Content-Type-Options "nosniff" always;' \
    '    add_header X-XSS-Protection "1; mode=block" always;' \
    '    add_header Referrer-Policy "strict-origin-when-cross-origin" always;' \
    '' \
    '    # Disable access to hidden files' \
    '    location ~ /\. {' \
    '        deny all;' \
    '    }' \
    '' \
    '    # Health check endpoint' \
    '    location /health {' \
    '        access_log off;' \
    '        return 200 "healthy\n";' \
    '        add_header Content-Type text/plain;' \
    '    }' \
    '}' > /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://127.0.0.1/ || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
