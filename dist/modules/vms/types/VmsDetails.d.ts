import { BaseMessageDetails } from '../../baseMessageModule/types/BaseMessageDetails';
export interface VmsDetails extends BaseMessageDetails {
    try?: 1 | 2 | 3 | 4 | 5 | 6;
    interval?: number;
    skipGsm?: boolean;
}
