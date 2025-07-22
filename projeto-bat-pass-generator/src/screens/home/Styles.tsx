import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
        backgroundColor: "#353333",
    },
    logoContainer: {
        flexDirection: "column",
        borderWidth: 1,
        borderColor: "#e7dede",
        backgroundColor: "#3b3838",
        justifyContent: "center",
        alignSelf: "center",
    },
    inputContainer: {
        width: "80%",
        flexDirection: 'column',
        alignItems: 'center',
    },
});

export default styles;
