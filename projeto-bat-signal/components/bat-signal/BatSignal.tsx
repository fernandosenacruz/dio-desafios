import { View, Text, Pressable } from "react-native";

import styles from './BatSignalStyles';

export interface BatSignalProps {
    title: string;
    onPress: () => void;
    disabled?: boolean;
}

const BatSignal = ({ title, onPress, disabled }: BatSignalProps) => {
    return (
        <View style={styles.container}>
            <Pressable style={styles.btnBatSignal} onPress={onPress} disabled={disabled}>
                <Text style={styles.btnText}>{title}</Text>
            </Pressable>
        </View>
    );
}

export default BatSignal;
