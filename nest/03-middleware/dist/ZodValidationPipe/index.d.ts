import { PipeTransform, ArgumentMetadata } from '@nestjs/common';
import { ZodSchema, z } from 'zod';
export declare class ZodValidationPipe implements PipeTransform {
    private schema;
    constructor(schema: ZodSchema);
    transform(value: unknown, metadata: ArgumentMetadata): any;
}
export declare const createCatSchema: z.ZodObject<{
    name: z.ZodString;
    age: z.ZodNumber;
    breed: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name?: string;
    age?: number;
    breed?: string;
}, {
    name?: string;
    age?: number;
    breed?: string;
}>;
export type CreateCatDto = z.infer<typeof createCatSchema>;
