import { AppService } from './app.service';
import { CreateCatDto } from "./ZodValidationPipe";
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(): string;
    create(createCatDto: CreateCatDto): {
        name?: string;
        age?: number;
        breed?: string;
    };
    list(): Promise<string>;
    getDetail(id: number): Promise<{
        id: number;
    }>;
}
