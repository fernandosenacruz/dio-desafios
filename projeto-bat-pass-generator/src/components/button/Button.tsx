import React, { useState } from 'react';
import { Text, Pressable, TextInput as RNTextInput, View } from 'react-native';
import { setStringAsync } from 'expo-clipboard';
import TextInput from '../textInput/TextInput';

import generatePassword from '../../utils/generatePass';
import styles from './Styles';

export interface ButtonProps {
    title: string;
    hasCopy?: boolean;
}

const Button: React.FC<ButtonProps> = ({ title, hasCopy }) => {
    const [pass, setPass] = useState<string>('');
    const [isCopied, setIsCopied] = useState<boolean>(false);
    const [passLength, setPassLength] = useState<number>(0);

    const handlePassLengthChange = (text: string) => {
        const length = parseInt(text, 10);
        if (isNaN(length)) {
            setPassLength(0);
            return;
        }
        setPassLength(length);
    };

    const handlePress = () => {
        const generatedPass = generatePassword(passLength);
        setPass(generatedPass);
        setIsCopied(false);
    }

    const handleClipboard = () => {
        setStringAsync(pass);
        setIsCopied(true);
    };

    return (
        <>
            <View style={styles.passLengthContainer}>
                <Text style={styles.label}>Choice a Password Length: </Text>
                <RNTextInput
                    style={styles.buttonText}
                    value={passLength.toString()}
                    onChangeText={(text) => handlePassLengthChange(text)}
                    keyboardType="numeric"
                />
            </View>

            <TextInput value={pass} />
            <Pressable onPress={handlePress} style={styles.button}>
                <Text style={styles.buttonText}>{title}</Text>
            </Pressable>
            {hasCopy && (
                <Pressable onPress={handleClipboard} style={styles.button}>
                    <Text style={styles.buttonText}>⚡ COPY</Text>
                </Pressable>
            )}
            {isCopied && <Text style={styles.copiedText}>Password copied to clipboard!</Text>}
        </>
    );
};

export default Button;