type Body = any;

import { FastifyPluginAsync } from 'fastify';
import puppeteer from 'puppeteer';
import wait from 'wait';

const root: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.post('/', async function (request, reply) {
    const browser = await puppeteer.launch({
      args: ['--no-sandbox']
    });
    const page = await browser.newPage();

    const body: Body = request.body

    await page.goto(body.url);
    await page.setViewport({ width: 1920, height: 1080 });

    if (body.darkMode) {
      await page.emulateMediaFeatures([
        {name: 'prefers-color-scheme', value: 'dark'},
      ]);
    }

    await wait(1000);

    const buffer: Buffer = await page.screenshot();

    reply.send(buffer);

    await browser.close();

    return reply;
  })
}

export default root;
