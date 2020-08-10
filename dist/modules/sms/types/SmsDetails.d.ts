import { BaseMessageDetails } from '../../baseMessageModule/types/BaseMessageDetails';
declare type SmsEncoding = 'iso-8859-1' | 'iso-8859-2' | 'iso-8859-3' | 'iso-8859-4' | 'iso-8859-5' | 'iso-8859-7' | 'windows-1250' | 'windows-1251' | 'utf-8';
export interface SmsDetails extends BaseMessageDetails {
    from?: string | '2way';
    encoding?: SmsEncoding;
    flash?: boolean;
    timeRestriction?: 'follow' | 'ignore' | 'nearest_available';
    udh?: string;
    skipForeign?: boolean;
    allowDuplicates?: boolean;
    checkIdx?: boolean;
    noUnicode?: boolean;
    normalize?: boolean;
    fast?: boolean;
    partnerId?: string;
    maxParts?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
    expirationDate?: Date;
    discountGroup?: string;
    param1?: string;
    param2?: string;
    param3?: string;
    param4?: string;
    template?: string;
    datacoding?: 'bin';
}
export {};
