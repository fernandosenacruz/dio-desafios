import React from "react";
import { View, Image, Text } from "react-native";

import logoImage from "../../../assets/bat-logo.png";

import styles from "./Styles";

const Logo: React.FC = () => {
    return (
        <View style={styles.logoContainer}>
            <Text style={styles.title}>BAT Pass Generator</Text>
            <Image source={logoImage} style={styles.logo} />
        </View>
    );
};

export default Logo;