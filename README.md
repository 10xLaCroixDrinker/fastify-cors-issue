> This repo serves to reproduce a bug in `@fatify/cors` wherein `preHandler` hooks
> are called twice when the delegator rejects the preflight request.

## Set up

```bash
$ git clone https://github.com/10xLaCroixDrinker/fastify-cors-issue.git
$ cd fastify-cors-issue
$ npm install
$ npm start
```

## To send a successful preflight request

```bash
$ curl --location --request OPTIONS 'http://localhost:3000/' \
--header 'Origin: success' \
--header 'Access-Control-Request-Method: GET' \
--header 'Access-Control-Request-Headers: content-type'
```

Note the hooks logged:

```
[20:03:36.658] INFO (55285): incoming request
    reqId: "req-1"
    req: {
      "method": "OPTIONS",
      "url": "/",
      "hostname": "localhost:3000",
      "remoteAddress": "::1",
      "remotePort": 58750
    }
[20:03:36.659] WARN (55285): 0 - onRequest
    reqId: "req-1"
[20:03:36.660] WARN (55285): 4 - onSend
    reqId: "req-1"
[20:03:36.662] WARN (55285): 5 - onResponse
    reqId: "req-1"
[20:03:36.663] INFO (55285): request completed
    reqId: "req-1"
    res: {
      "statusCode": 204
    }
    responseTime: 3.8723926544189453
```

## To send an unsuccessful preflight request

```bash
$ curl --location --request OPTIONS 'http://localhost:3000/' \
--header 'Origin: fail' \
--header 'Access-Control-Request-Method: GET' \
--header 'Access-Control-Request-Headers: content-type'
```

Note the hooks logged (`preHandler` appears twice):

```
[20:03:40.949] INFO (55285): incoming request
    reqId: "req-2"
    req: {
      "method": "OPTIONS",
      "url": "/",
      "hostname": "localhost:3000",
      "remoteAddress": "::1",
      "remotePort": 58750
    }
[20:03:40.949] WARN (55285): 0 - onRequest
    reqId: "req-2"
[20:03:40.950] WARN (55285): 1 - preParsing
    reqId: "req-2"
[20:03:40.950] WARN (55285): 2 - preValidation
    reqId: "req-2"
[20:03:40.950] WARN (55285): 3 - preHandler
    reqId: "req-2"
[20:03:40.950] WARN (55285): 3 - preHandler
    reqId: "req-2"
[20:03:40.950] WARN (55285): 4 - onSend
    reqId: "req-2"
[20:03:40.951] WARN (55285): 5 - onResponse
    reqId: "req-2"
[20:03:40.951] INFO (55285): request completed
    reqId: "req-2"
    res: {
      "statusCode": 404
    }
    responseTime: 1.6588950157165527
```
