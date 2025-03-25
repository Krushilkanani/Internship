import { useLayoutEffect } from "react";
import { View, StyleSheet, FlatList, Text } from "react-native";
import { MEALS, CATEGORIES } from "../data/dummy-data";
import MealsList from "../components/MealsList/MealsList";

function MealsOverviewScreen({ route, navigation }) {
    const catId = route.params.CategoryId;

    const displayedMeals = MEALS.filter((mealItem) => {
        return mealItem.categoryIds.indexOf(catId) >= 0;
    });

    useLayoutEffect(() => {
        const categoryTitle = CATEGORIES.find((cat) => cat.id === catId).title;
        navigation.setOptions({ title: categoryTitle });
    }, [catId, navigation]);

    return <MealsList items={displayedMeals} />;
}

export default MealsOverviewScreen;
