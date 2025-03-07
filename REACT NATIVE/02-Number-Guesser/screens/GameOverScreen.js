import {
    View,
    Image,
    StyleSheet,
    Text,
    ScrollView,
    useWindowDimensions,
} from "react-native";

import Title from "../components/ui/Title";
import Colors from "../constants/colors";
import PrimaryButton from "../components/ui/PrimaryButton";

function GameOverScreen({ roundsNumber, userNumber, onStartNewGame }) {
    const { height, width } = useWindowDimensions();

    let imageSize = 300;

    if (width < 350) {
        imageSize = 150;
    }

    if (height < 400) {
        imageSize = 80;
    }

    const imageStyle = {
        width: imageSize,
        height: imageSize,
        borderRadius: imageSize / 2,
    };

    return (
        <ScrollView style={styles.screen}>
            <View style={styles.rootContainer}>
                <Title>GAME OVER!</Title>
                <View style={[styles.imageContainer, imageStyle]}>
                    <Image
                        style={styles.image}
                        source={require("../assets/images/success.png")}
                    />
                </View>
                <View>
                    <Text style={styles.summaryText}>
                        Your Phone needed{" "}
                        <Text style={styles.highlight}>{roundsNumber}</Text>{" "}
                        rounds to guess the number{" "}
                        <Text style={styles.highlight}>{userNumber}</Text>.
                    </Text>
                </View>
                <PrimaryButton onPress={onStartNewGame}>
                    Start New Game
                </PrimaryButton>
            </View>
        </ScrollView>
    );
}

export default GameOverScreen;

// const deviceWidth = Dimensions.get("window").width;
// const deviceHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
    imageContainer: {
        // width: deviceWidth < 350 ? 150 : 300,
        // height: deviceWidth < 350 ? 150 : 300,
        // borderRadius: deviceWidth < 350 ? 75 : 150,
        borderWidth: 3,
        borderColor: Colors.primary800,
        overflow: "hidden",
        margin: 36,
    },
    image: {
        width: "100%",
        height: "100%",
    },
    rootContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 24,
    },
    summaryText: {
        fontFamily: "open-sans",
        fontSize: 24,
        textAlign: "center",
        marginBottom: 24,
    },
    highlight: {
        fontFamily: "open-sans-bold",
        color: Colors.primary500,
    },
    screen: {
        felx: 1,
    },
});
