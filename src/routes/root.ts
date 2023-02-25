type Body = any;

import { FastifyPluginAsync } from 'fastify';
import puppeteer from 'puppeteer';

const root: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get('/', async function (request, reply) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const body: Body = request.body

    await page.goto(body.url);
    await page.setViewport({ width: 1920, height: 1080 });

    await page.screenshot().then((buffer: Buffer) => {
      reply.send(buffer);
    });

    await browser.close();

    return reply;
  })
}

export default root;