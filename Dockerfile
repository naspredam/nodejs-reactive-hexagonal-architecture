FROM node

WORKDIR /code
COPY . .

RUN yarn install

EXPOSE 3000

ENTRYPOINT [ "yarn", "start" ]