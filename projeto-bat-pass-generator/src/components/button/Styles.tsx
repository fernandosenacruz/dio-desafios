import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    passLengthContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    label: {
        color: '#E5BF3C',
        fontSize: 16,
        backgroundColor: '#050505',
    },
    button: {
        backgroundColor: '#050505',
        padding: 12,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3,
        width: '100%',
        margin: 8,
    },
    buttonText: {
        color: '#E5BF3C',
        fontSize: 16,
        fontWeight: 'bold',
    },
    copiedText: {
        color: '#E5BF3C',
        fontSize: 14,
    },
});