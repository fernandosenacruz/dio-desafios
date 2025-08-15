import { View } from "react-native";
import { styles } from "./styles";

const CardSkeleton = () => {
    return (
        <View style={styles.container}>
            <View style={styles.imageSkeleton} />
            <View style={styles.titleSkeleton} />
            <View style={styles.priceLabelSkeleton} />
        </View>
    );
};

export default CardSkeleton;
