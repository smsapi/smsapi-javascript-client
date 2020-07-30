import { BaseModule } from '../baseModule';
import { HlrCheckResponse } from './types/HlrCheckResponse';
export declare class Hlr extends BaseModule {
    check(numbers: string[], idx?: string): Promise<HlrCheckResponse | HlrCheckResponse[]>;
}
