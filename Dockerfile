FROM node:18 AS client
WORKDIR /usr/src
COPY ./client/package.json ./client/package-lock.json ./
RUN yarn
COPY ./client ./
RUN yarn build

FROM golang:1.19 AS server
EXPOSE 80
WORKDIR /app
COPY ./server/go.mod ./server/go.sum ./
RUN go mod download && go mod verify
COPY ./server ./
RUN go build -a -x -o main main.go
COPY --from=client /usr/src/dist ./web
CMD ["./main"]
