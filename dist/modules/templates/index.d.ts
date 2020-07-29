import { BaseModule } from '../baseModule';
import { Template, ApiCollection, NewTemplate } from '../../types';
export declare class Templates extends BaseModule {
    get(): Promise<ApiCollection<Template>>;
    getById(templateId: string): Promise<Template>;
    create(newTemplate: NewTemplate): Promise<Template>;
    update(templateId: string, newTemplate: Partial<NewTemplate>): Promise<Template>;
    remove(templateId: string): Promise<void>;
}
