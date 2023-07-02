# establecer la imagen base
FROM node:20

# establecer el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# copiar los archivos del proyecto al contenedor
COPY package*.json ./

# instalar las dependencias del proyecto
RUN npm install

# copiar el codigo fuente al contenedor
COPY . .

# compilar el codigo de typescript
RUN npm run build

# exponer el puerto en el que se ejecuta el servidor
EXPOSE 3000

# coamndo para iniciar el servidor
CMD [ "npm", "start" ]
