import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(): string;
    getCache(): Promise<{
        id: number;
        name: string;
    }[]>;
    getCache2(): Promise<string>;
}
