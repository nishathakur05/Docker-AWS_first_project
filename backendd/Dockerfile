# ---------- FRONTEND ----------
    FROM node:20 AS frontend

    WORKDIR /frontend
    
    COPY Frontend/package*.json ./
    
    RUN npm install
    
    COPY Frontend/ .
    
    RUN npm run build
    
    
    # ---------- BACKEND ----------
    FROM node:20
    
    WORKDIR /app
    
    COPY backendd/package*.json ./
    
    RUN npm install
    
    COPY backendd/ .
    
    # Copy React build into the location expected by server.js
    COPY --from=frontend /frontend/dist /frontend/dist
    
    EXPOSE 3000
    
    CMD ["npm", "start"]