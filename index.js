import build from "pino-abstract-transport";

function isFunction(value) {
  const type = typeof value;
  return type == "function";
}

async function parseMessage(pinoData, rowParser, verbose) {
  if (isFunction(rowParser)) {
    return rowParser(pinoData);
  }
  if (verbose) {
    return JSON.stringify(pinoData, null, 2);
  }
  return pinoData.msg;
}

export default function ({ prisma, model, rowParser, verbose = false }) {
  return build(async function (source) {
    const data = [];
    for await (const obj of source) {
      const message = await parseMessage(obj, rowParser, verbose);
      console.log({ message });
      data.push(message);
    }
    try {
      const result = await prisma[model].createMany({ data });
      console.log("add to database result", result);
    } catch (err) {
      console.log("add to database err ", err);
    }
  });
}
