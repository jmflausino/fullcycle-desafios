FROM golang:1.19rc2-bullseye AS builder

WORKDIR /go

RUN go mod init main

COPY src src

RUN cd src &&  \
    unset GOPATH && \
    go build -o build/main


FROM scratch
WORKDIR /go
COPY --from=builder /go/src/build .
CMD [ "./main"]
