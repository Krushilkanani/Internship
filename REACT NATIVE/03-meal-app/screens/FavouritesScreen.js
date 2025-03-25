import { useContext } from "react";
import { StyleSheet, View, Text } from "react-native";

import MealsList from "../components/MealsList/MealsList";
import { FavouritesContext } from "../store/context/favourites-context";
import { MEALS } from "../data/dummy-data";
import { useSelector } from "react-redux";

function FavouritesScreen() {
    const favouriteMealsCtx = useContext(FavouritesContext);
    // const favoriteMealIds = useSelector((state) => state.favoriteMeals.ids);

    const favoriteMeals = MEALS.filter(
        (meal) => favouriteMealsCtx.ids.includes(meal.id)
        // favoriteMealIds.includes(meal.id)
    );

    if (favoriteMeals.length === 0) {
        return (
            <View style={styles.rootContainer}>
                <Text style={styles.text}>
                    No favourite meals found. Start adding some!
                </Text>
            </View>
        );
    }

    return <MealsList items={favoriteMeals} />;
}

export default FavouritesScreen;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        fontSize: 20,
        fontWeight: "bold",
        color: "white",
    },
});
