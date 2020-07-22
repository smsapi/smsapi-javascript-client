import { BaseModule } from '../baseModule';
import { HlrCheckResponse } from '../../types';
export declare class Hlr extends BaseModule {
    check(numbers: string[], idx?: string): Promise<HlrCheckResponse | HlrCheckResponse[]>;
}
