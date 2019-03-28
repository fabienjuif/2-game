FROM node:slim

COPY app/ /app

ENTRYPOINT [ "node", "app" ]
