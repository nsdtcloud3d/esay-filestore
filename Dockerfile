FROM node:18.15.0-bullseye-slim as build-stage


WORKDIR /easy-filestore

COPY . .
RUN npm config set registry https://registry.npm.taobao.org

EXPOSE 3009

CMD [ "yarn", "start" ]
# ENTRYPOINT  [ "yarn", "start" ]