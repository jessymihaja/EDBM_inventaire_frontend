# Utilisation de l'image officielle Node.js basée sur Alpine
FROM node:18-alpine 

# Définition du répertoire de travail
WORKDIR /inventaire_edbm/

# Copie des fichiers nécessaires
COPY /build /inventaire_edbm/build

# Installation globale de `serve` pour le serveur de production
RUN npm install -g serve

EXPOSE 3000

# Définition de la commande par défaut
CMD ["serve", "-s", "build", "-l", "3000"]

