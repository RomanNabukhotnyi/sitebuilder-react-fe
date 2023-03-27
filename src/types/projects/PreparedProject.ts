import type { ApiProject } from "./ApiProject";
import type { ApiPermission } from "../permissions/ApiPermission";
import type { ApiKey } from "../ApiKey";

export interface PreparedProject extends ApiProject {
    permissions: ApiPermission[];
    apiKey?: ApiKey;
}