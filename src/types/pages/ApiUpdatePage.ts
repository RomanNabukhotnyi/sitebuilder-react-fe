export interface ApiUpdatePage {
    projectId: number;
    pageId: number;
    name: string;
    meta: {
        url?: string;
    };
}