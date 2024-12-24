"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const log_moddleware_1 = require("./middle/log.moddleware");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use(log_moddleware_1.logger);
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map