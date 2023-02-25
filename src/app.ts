type Body = any

import fastify from 'fastify';
import puppeteer from 'puppeteer';

const server = fastify({
  logger: true
});

server.post('/', async (request, reply) => {
  console.log('POST /');

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  console.log('Created page and browser');

  const body: Body = request.body;

  await page.goto(body.url);
  await page.setViewport({ width: 1920, height: 1080 });

  console.log('Configured page');

  const buffer: Buffer = await page.screenshot();

  console.log('Generated screenshot');
  
  reply.send(buffer);

  console.log('Sent screenshot to client');

  await browser.close();

  console.log('Closed browser');

  return reply;
});

/*
server.route({
  method: 'POST',
  url: '/',
  handler: async(request, reply) => {
    console.log('POST /');

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
  
    console.log('Created page and browser');
  
    const body: Body = request.body;
  
    await page.goto(body.url);
    await page.setViewport({ width: 1920, height: 1080 });
  
    console.log('Configured page');
  
    const buffer: Buffer = await page.screenshot();
  
    console.log('Generated screenshot');
    
    reply.send(buffer);
  
    console.log('Sent screenshot to client');
  
    await browser.close();
  
    console.log('Closed browser');
  
    return reply;
  }
});
*/

async function start() {
  try {
    await server.listen({ host: '0.0.0.0', port: 3000 });
  } catch(err) {
    server.log.error(err);
    process.exit(1);
  }
}

start();