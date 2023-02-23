FROM alpine:latest as base
RUN apk add git curl
RUN apk add nodejs yarn 
RUN apk add npm
WORKDIR /tommy-bootcamp

FROM base as yarn-packaged
COPY ./package.json /tommy-bootcamp
COPY ./yarn.lock /tommy-bootcamp
RUN yarn install

#TODO: Extend from base to make dev setup even simpler, but figure out workspaceFolder v WORKDIR first
# FROM yarn-packaged as codespaces
FROM base as codespaces

FROM yarn-packaged as prod
RUN yarn build
RUN yarn test

