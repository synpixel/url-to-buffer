"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const puppeteer_1 = __importDefault(require("puppeteer"));
const server = (0, fastify_1.default)({
    logger: true
});
server.post('/', (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const browser = yield puppeteer_1.default.launch();
    const page = yield browser.newPage();
    const body = request.body;
    yield page.goto(body.url);
    yield page.setViewport({ width: 1920, height: 1080 });
    yield page.screenshot().then((buffer) => {
        reply.send(buffer);
    });
    yield browser.close();
    return reply;
}));
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield server.listen({ host: '0.0.0.0', port: 3000 });
        }
        catch (err) {
            server.log.error(err);
            process.exit(1);
        }
    });
}
start();
