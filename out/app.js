"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const puppeteer_1 = __importDefault(require("puppeteer"));
const server = (0, fastify_1.default)({
    logger: true
});
server.post('/', async (request, reply) => {
    const browser = await puppeteer_1.default.launch();
    const page = await browser.newPage();
    const body = request.body;
    await page.goto(body.url);
    await page.setViewport({ width: 1920, height: 1080 });
    await page.screenshot().then((buffer) => {
        reply.send(buffer);
    });
    await browser.close();
    return reply;
});
async function start() {
    try {
        await server.listen({ host: 'localhost', port: 3000 });
    }
    catch (err) {
        server.log.error(err);
        process.exit(1);
    }
}
start();
