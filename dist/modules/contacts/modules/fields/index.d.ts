import { BaseModule } from '../../../baseModule';
import { ApiCollection } from '../../../../types/ApiCollection';
import { Field } from './types/Field';
import { FieldType } from './types/FieldType';
export declare class Fields extends BaseModule {
    get(): Promise<ApiCollection<Field>>;
    create(fieldName: string, fieldType?: FieldType): Promise<Field>;
    update(fieldId: string, newName: string): Promise<Field>;
    remove(fieldId: string): Promise<void>;
}
