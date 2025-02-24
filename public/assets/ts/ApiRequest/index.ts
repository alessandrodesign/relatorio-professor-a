import { FetchApiStrategy } from './FetchApiStrategy';
import { AxiosApiStrategy } from './AxiosApiStrategy';
import { JqueryApiStrategy } from './JqueryApiStrategy';
import { ApiRequestStrategy } from './ApiRequestStrategy';

export enum ApiStrategyType {
    Axios = 'axios',
    JQuery = 'jquery',
    Fetch = 'fetch'
}

export function ApiRequest(strategy: ApiStrategyType): ApiRequestStrategy {
    switch (strategy) {
        case ApiStrategyType.Axios:
            return new AxiosApiStrategy();
        case ApiStrategyType.JQuery:
            return new JqueryApiStrategy();
        case ApiStrategyType.Fetch:
            return new FetchApiStrategy();
        default:
            throw new Error('Tipo de estratégia inválida');
    }
}
