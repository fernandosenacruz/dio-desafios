import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#111'
    },
    text: {
        color: '#fff',
        fontSize: 16,
        marginLeft: 20,
    },
    input: {
        marginVertical: 10,
        marginHorizontal: 20,
        borderWidth: 1,
        borderColor: '#666',
        color: '#fff',
        backgroundColor: '#535353',
        borderRadius: 5,
        padding: 10,
    },
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
    }
});

export default styles;