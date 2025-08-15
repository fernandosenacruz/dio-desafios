import axios from "axios"
import { CarModel } from "../components/CardView/props";

const API_URL = "https://digitalinnovationone.github.io/fake-data-api-lamborghini/api/lamborghini.json";

export interface CarApiResponse {
    cars: CarModel[];
}

export const getCars = async (): Promise<CarModel[]> => {
    try {
        const response = await axios.get<CarApiResponse>(API_URL);
        return response.data.cars;
    } catch (error) {
        console.error("Error fetching cars:", error);
        throw error;
    }
};
