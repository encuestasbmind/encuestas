import { InjectionToken } from "@angular/core";

export let APP_CONFIG = new InjectionToken("app.config");

export interface IAppConfig {
    apiEndpoint: string;
    reporteEndpoint: string;
}

export const AppConfig: IAppConfig = {    
    apiEndpoint: "http://localhost/encuestas/api/",
    reporteEndpoint: "http://localhost.com/encuestas/app/"
};

