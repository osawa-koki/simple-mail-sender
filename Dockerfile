FROM node:18 AS client
WORKDIR /usr/src
COPY ./client ./client
RUN cd client && yarn install && yarn build

FROM golang:1.19 AS server
EXPOSE 80
WORKDIR /app
# pre-copy/cache go.mod for pre-downloading dependencies and only redownloading them in subsequent builds if they change
COPY ./server/go.mod ./server/go.sum ./
RUN go mod download && go mod verify
COPY ./server ./
# 実行可能プログラム名をappという名前すると、実行時にディレクトリ名と重複しているため、エラーとなる。
RUN go build -a -x -o main main.go
# クライアントはよく修正するから、レイヤの最後の方に置く。
COPY --from=client /usr/src/client/dist ./web
CMD ["./main"]
