import { View, Text, StyleSheet } from "react-native";

function subTitle({ children }) {
    return (
        <View style={styles.subTitleContainer}>
            <Text style={styles.subTitle}>{children}</Text>
        </View>
    );
}

export default subTitle;

const styles = StyleSheet.create({
    subTitle: {
        color: "#e2b497",
        fontSize: 18,
        fontWeight: "bold",

        textAlign: "center",
    },
    subTitleContainer: {
        padding: 6,
        borderBottomColor: "#e2b497",
        borderBottomWidth: 2,
        margin: 4,
        marginHorizontal: 12,
        marginVertical: 4,
    },
});
