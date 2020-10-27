import { BaseModule } from '../baseModule';
import { HlrCheckResponse } from './types/HlrCheckResponse';
export declare class Hlr extends BaseModule {
    check(numbers: string | string[], idx?: string | string[]): Promise<HlrCheckResponse | HlrCheckResponse[]>;
}
