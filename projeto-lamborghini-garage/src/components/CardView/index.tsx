import React from "react";
import { View, Text, Image } from "react-native";

import Logo from "../../../assets/logo-lamborghini.png";
import { styles } from "./styles";
import Divider from "../Divider";
import { CarModel } from "./props";

const CAR_ASSETS_BASE_URL =
    "https://digitalinnovationone.github.io/fake-data-api-lamborghini/assets/";

const CardView: React.FC<{ car: CarModel }> = ({ car }) => {

    const renderLogoBox = () => (
        <View style={styles.logoContainer}>
            <Image style={styles.imageLogo} source={Logo} />
        </View>
    );

    const renderCarDetails = () => (
        <View style={{ alignItems: "center" }}>
            <Text style={styles.carBrand}>Lamborghini</Text>
            <Text style={styles.carName}>{car?.carName}</Text>
        </View>
    );

    const renderCarImage = () => (
        <Image
            style={styles.image}
            source={{
                uri: `${CAR_ASSETS_BASE_URL}${car?.id}.png`,
            }}
        />
    );

    const renderPriceLabel = () => (
        <View style={styles.priceLabelContainer}>
            <Text style={styles.priceLabel}>{car?.price}</Text>
            <Text style={styles.priceLabel}>{car?.convertedPrice}</Text>
        </View>
    );

    return (
        <View style={styles.imageContainer}>
            <Divider />
            {renderLogoBox()}
            {renderCarDetails()}
            {renderCarImage()}
            <Divider />
            {renderPriceLabel()}
        </View>
    );
};

export default CardView;