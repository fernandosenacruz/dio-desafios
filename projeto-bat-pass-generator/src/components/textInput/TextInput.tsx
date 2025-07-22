import React from 'react';
import { TextInput as RNTextInput } from 'react-native';

import styles from './Styles';

interface TextInputProps {
    value: string;
}

const TextInput: React.FC<TextInputProps> = ({ value }) => {
    return (
        <RNTextInput
            value={value}
            style={styles.textInput}
            placeholder="pass"
        />
    );
}

export default TextInput;