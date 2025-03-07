import { Text, View, StyleSheet, Dimensions } from "react-native";
import Colors from "../../constants/colors";

function NumberContainer({ children }) {
    return (
        <View style={styles.container}>
            <Text style={styles.numbertext}>{children}</Text>
        </View>
    );
}

export default NumberContainer;

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
    container: {
        borderWidth: 4,
        borderColor: Colors.accent500,
        padding: deviceWidth < 350 ? 12 : 24,
        margin: deviceWidth < 350 ? 12 : 24,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
    },
    numbertext: {
        color: Colors.accent500,
        fontSize: deviceWidth < 350 ? 24 : 36,
        fontFamily: "open-sans-bold",
        // fontWeight: "bold",
    },
});
