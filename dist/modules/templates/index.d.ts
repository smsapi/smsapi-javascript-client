import { BaseModule } from '../baseModule';
import { ApiCollection } from '../../types';
import { NewTemplate } from './types/NewTemplate';
import { Template } from './types/Template';
export declare class Templates extends BaseModule {
    get(): Promise<ApiCollection<Template>>;
    getById(templateId: string): Promise<Template>;
    create(newTemplate: NewTemplate): Promise<Template>;
    update(templateId: string, newTemplate: Partial<NewTemplate>): Promise<Template>;
    remove(templateId: string): Promise<void>;
}
