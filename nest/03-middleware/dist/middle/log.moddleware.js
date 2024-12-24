"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
function logger(req, res, next) {
    console.log(`Request...`);
    console.log(req.url);
    next();
}
exports.logger = logger;
;
//# sourceMappingURL=log.moddleware.js.map