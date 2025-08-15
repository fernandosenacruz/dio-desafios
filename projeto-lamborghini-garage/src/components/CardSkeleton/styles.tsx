import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        backgroundColor: "#e0e0e0",
        borderRadius: 12,
        marginVertical: 8,
        marginHorizontal: 16,
        padding: 16,
        elevation: 2,
    },
    imageSkeleton: {
        width: "100%",
        height: "100%",
        backgroundColor: "#cfcfcf",
        borderRadius: 10,
        marginBottom: 12,
    },
    titleSkeleton: {
        width: "60%",
        height: 20,
        backgroundColor: "#d6d6d6",
        borderRadius: 4,
        marginBottom: 8,
    },
    priceLabelSkeleton: {
        width: "30%",
        height: 16,
        backgroundColor: "#d6d6d6",
        borderRadius: 4,
        marginBottom: 8,
    },
});