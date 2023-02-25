type Body = any;

import { FastifyPluginAsync } from 'fastify';
import puppeteer from 'puppeteer';
const PCR: any = import('puppeteer-chromium-resolver');

const root: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.post('/', async function (request, reply) {
    const stats = await PCR({});

    const browser = await puppeteer.launch({
      args: ['--no-sandbox'],
      executablePath: stats.executablePath
    });
    const page = await browser.newPage();

    const body: Body = request.body

    await page.goto(body.url);
    await page.setViewport({ width: 1920, height: 1080 });

    /*
    if (body.darkMode) {
      await page.emulateMediaFeatures([
        {name: 'prefers-color-scheme', value: 'dark'},
      ]);
    }

    await wait(1000);
    */

    const buffer: Buffer = await page.screenshot();

    reply.send(buffer);

    await browser.close();

    return reply;
  })
}

export default root;
