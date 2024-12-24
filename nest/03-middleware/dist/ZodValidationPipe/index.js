"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCatSchema = exports.ZodValidationPipe = void 0;
const common_1 = require("@nestjs/common");
const zod_1 = require("zod");
class ZodValidationPipe {
    constructor(schema) {
        this.schema = schema;
    }
    transform(value, metadata) {
        try {
            const parsedValue = this.schema.parse(value);
            return parsedValue;
        }
        catch (error) {
            console.log(error);
            throw new common_1.BadRequestException('Validation failed');
        }
    }
}
exports.ZodValidationPipe = ZodValidationPipe;
exports.createCatSchema = zod_1.z
    .object({
    name: zod_1.z.string(),
    age: zod_1.z.number(),
    breed: zod_1.z.string(),
})
    .required();
//# sourceMappingURL=index.js.map