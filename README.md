# pino-prisma

A [Pino v7+ transport](https://getpino.io/#/docs/transports?id=v7-transports) to add database with prisma [prisma](https://prisma.io/)

## Installation

```
npm install pino-prisma
```

## Usage

```js
const pino = require('pino');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const rowParser = (pinoData) => ({msg:log.msg,timestap:pinoData.timestap})
const logger = pino({
  transport: {
    target: 'pino-prisma',
    level: 'error',
    options: {
      prisma,
      rowParser,
      model:'log_table'
    },
  },
})

logger.error('<b>test log!</b>');
```


## Thanks
[Jhon-Mosk pino-telegram-webhook]https://github.com/Jhon-Mosk/pino-telegram-webhook