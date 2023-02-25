type Body = any

import fastify from 'fastify';
import puppeteer from 'puppeteer';

const server = fastify({
  logger: true
});

server.post('/', async (request, reply) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const body: Body = request.body;

  await page.goto(body.url);
  await page.setViewport({ width: 1920, height: 1080 });

  await page.screenshot().then((buffer: Buffer) => {
    reply.send(buffer);
  });

  await browser.close();

  return reply;
});

async function start() {
  try {
    await server.listen({ host: '0.0.0.0' });
  } catch(err) {
    server.log.error(err);
    process.exit(1);
  }
}

start();