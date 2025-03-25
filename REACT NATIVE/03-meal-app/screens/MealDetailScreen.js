import { Text, View, Image, StyleSheet, ScrollView } from "react-native";
import { useContext, useLayoutEffect } from "react";

import { MEALS } from "../data/dummy-data";
import MealDetails from "../components/MealDetails";
import Subtitle from "../components/MealDetail/Subtitle";
import List from "../components/MealDetail/List";
import Ionicons from "@expo/vector-icons/Ionicons";
import { FavouritesContext } from "../store/context/favourites-context";
// import { addFavourite, removeFavourite } from "../store/redux/favourites";
// import { useDispatch, useSelector } from "react-redux";
// import { addFavourite, removeFavourite } from "../store/redux/favourites";

function MealDetailScreen({ route, navigation }) {
    const favouriteMealsCtx = useContext(FavouritesContext);
    // const favouriteMealIds = useSelector((state) => state.favoriteMeals.ids);
    // const dispatch = useDispatch();

    const mealId = route.params.mealId;

    const selectedMeal = MEALS.find((meal) => meal.id === mealId);

    const mealIsFavourite = favouriteMealsCtx.ids.includes(mealId);
    // const mealIsFavourite = favouriteMealIds.includes(mealId);

    function changeFavouriteStatusHandler() {
        if (mealIsFavourite) {
            favouriteMealsCtx.removeFavourite(mealId);
            // dispatchEvent(removeFavourite(mealId));
        } else {
            favouriteMealsCtx.addFavourite(mealId);
            // dispatchEvent(addFavourite(mealId));
        }
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => {
                return (
                    <Ionicons
                        name={mealIsFavourite ? "star" : "star-outline"}
                        color="white"
                        onPress={changeFavouriteStatusHandler}
                        size={24}
                    />
                );
            },
        });
    }, [navigation, changeFavouriteStatusHandler]);

    return (
        <ScrollView style={styles.rootContainer}>
            <Image
                style={styles.image}
                source={{ uri: selectedMeal.imageUrl }}
            />
            <Text style={styles.title}>{selectedMeal.title}</Text>
            <MealDetails
                duration={selectedMeal.duration}
                complexity={selectedMeal.complexity}
                affordability={selectedMeal.affordability}
                textStyle={styles.detailText}
            />
            <View style={styles.listOuterContainer}>
                <View style={styles.listContainer}>
                    <Subtitle>Ingredients</Subtitle>
                    <List data={selectedMeal.ingredients} />
                    <Subtitle>Steps</Subtitle>
                    <List data={selectedMeal.steps} />
                </View>
            </View>
        </ScrollView>
    );
}

export default MealDetailScreen;

const styles = StyleSheet.create({
    rootContainer: {
        marginBottom: 32,
    },
    image: {
        width: "100%",
        height: 350,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        margin: 8,
        textAlign: "center",
        color: "white",
    },
    detailText: {
        color: "white",
    },
    listContainer: {
        maxWidth: "80%",
    },
    listOuterContainer: {
        alignItems: "center",
    },
});
