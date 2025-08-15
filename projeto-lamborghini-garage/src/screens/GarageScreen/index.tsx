import { useEffect, useState } from "react";
import { Button, View } from "react-native";

import CardView from "../../components/CardView";
import CardSkeleton from "../../components/CardSkeleton";
import { CarModel } from "../../components/CardView/props";

import { getCars } from "../../api/getCars";
import { styles } from "./styles";
import { convertCarPrice } from "../../utils/convertCarPrice";
import { getExchangeRates } from "../../api/getExchange";

const GarageScreen = () => {
    const [cars, setCars] = useState<CarModel[]>([]);
    const [carIndex, setCarIndex] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const exchangeBid = await getExchangeRates();

                const carList = await getCars();
                const carsWithConverted = carList.map((car) => ({
                    ...car,
                    convertedPrice: convertCarPrice(car.price, parseFloat(exchangeBid))
                }));

                setCars(carsWithConverted);
                setCarIndex(0);
            } catch (error) {
                console.error("Erro ao buscar dados:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handlePreviousItem = () => {
        setCarIndex((prev) => Math.max(prev - 1, 0));
    };

    const handleNextItem = () => {
        setCarIndex((prev) => Math.min(prev + 1, cars.length - 1));
    };

    const renderCar = () => {
        if (cars[carIndex]) {
            return <CardView key={cars[carIndex].id} car={cars[carIndex]} />;
        }
        return null;
    };

    const renderCarControls = () => (
        <View style={styles.controlsContainer}>
            <Button 
                title="<" 
                color={ carIndex !== 0 ? "#01A6B3" : "#ccc"} 
                onPress={handlePreviousItem} 
            />
            <Button 
                title=">" 
                color={ carIndex !== cars.length - 1 ? "#01A6B3" : "#ccc"} 
                onPress={handleNextItem} 
            />
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.cameraBox}>
                <View style={styles.triangleCorner}></View>
                <View style={[styles.triangleCorner, styles.topRight]}></View>
                <View style={[styles.triangleCorner, styles.bottomLeft]}></View>
                <View style={[styles.triangleCorner, styles.bottomRight]}></View>

                {loading && <CardSkeleton />}
                {!loading && cars.length > 0 && (
                    <>
                        {renderCar()}
                        {renderCarControls()}
                    </>
                )}
            </View>
        </View>
    );
};

export default GarageScreen;
