import React from "react";
import { View } from "react-native";
import { StatusBar } from "expo-status-bar";

import styles from "./Styles";
import Logo from "../../components/logo/Logo";
import Button from "../../components/button/Button";

const Home: React.FC = () => {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.logoContainer}>
        <Logo />
      </View>
      <View style={styles.inputContainer}>
        <Button title="GENERATE" hasCopy={true} />
      </View>
    </View>
  );
};



export default Home;
