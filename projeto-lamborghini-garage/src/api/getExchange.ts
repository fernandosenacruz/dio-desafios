import axios from "axios";

const API_URL = "https://economia.awesomeapi.com.br/json/daily/USD-BRL/1";

export interface ExchangeRateResponse {
    code: string;
    codein: string;
    name: string;
    high: string;
    low: string;
    varBid: string;
    pctChange: string;
    bid: string;
    ask: string;
    timestamp: string;
    create_date: string;
}

export const getExchangeRates = async () => {
    try {
        const response = await axios.get<ExchangeRateResponse[]>(API_URL);
        return response.data[0].bid;
    } catch (error) {
        console.error("Error fetching exchange rates:", error);
        throw error;
    }
};
