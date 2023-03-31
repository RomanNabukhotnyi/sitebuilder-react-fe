export interface ApiCreatePage {
    projectId: number;
    name: string;
    meta: {
        url?: string;
    };
    order?: number;
}