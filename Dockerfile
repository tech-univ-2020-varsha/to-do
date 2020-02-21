FROM node:12.14.1

WORKDIR /app

COPY . .

EXPOSE 8080

RUN npm install

# CMD ["npx", "nodemon"]

ENTRYPOINT [ "/bin/bash","./entrypoint.sh" ]