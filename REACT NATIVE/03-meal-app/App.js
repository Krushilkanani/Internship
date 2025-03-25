import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Ionicons from "@expo/vector-icons/Ionicons";
// import { Provider } from "react-redux";

import CategoriesScreen from "./screens/CategoriesScreen";
import MealsOverviewScreen from "./screens/MealsOverviewScreen";
import MealDetailScreen from "./screens/MealDetailScreen";
import FavouritesScreen from "./screens/FavouritesScreen";
import FavouritesContextProvider from "./store/context/favourites-context";
// import { store } from "./store/redux/store";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerNavigator() {
    return (
        <Drawer.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: "#351401" },
                headerTintColor: "#fff",
                sceneStyle: { backgroundColor: "#3f2f25" },
                drawerContentStyle: { backgroundColor: "#3f2f25" },
                drawerActiveTintColor: "#351401",
                drawerActiveBackgroundColor: "#e4baa1",
                drawerInactiveTintColor: "#fff",
            }}
        >
            <Drawer.Screen
                name="Categories"
                component={CategoriesScreen}
                options={{
                    title: "All Categories",
                    drawerIcon: ({ color, size }) => (
                        <Ionicons name="list" size={size} color={color} />
                    ),
                }}
            />
            <Drawer.Screen
                name="Favourites"
                component={FavouritesScreen}
                options={{
                    drawerIcon: ({ color, size }) => (
                        <Ionicons name="star" size={size} color={color} />
                    ),
                }}
            />
        </Drawer.Navigator>
    );
}

export default function App() {
    return (
        <>
            <StatusBar style="light" />
            <FavouritesContextProvider>
                {/* <Provider store={store}> */}
                <NavigationContainer>
                    <Stack.Navigator
                        screenOptions={{
                            headerStyle: { backgroundColor: "#351401" },
                            headerTintColor: "#fff",
                            contentStyle: { backgroundColor: "#3f2f25" },
                        }}
                    >
                        <Stack.Screen
                            name="Drawer"
                            component={DrawerNavigator}
                            options={{
                                // title: "All Categories",
                                headerShown: false,
                            }}
                        />
                        <Stack.Screen
                            name="MealsOverview"
                            component={MealsOverviewScreen}
                            // options={({ route, navigation }) => {
                            //     const catId = route.params.CategoryId;
                            //     return {
                            //         title: catId,
                            //     };
                            // }}
                        />
                        <Stack.Screen
                            name="MealDetail"
                            component={MealDetailScreen}
                            options={{
                                title: "About the Meal",
                            }}
                        />
                    </Stack.Navigator>
                </NavigationContainer>
                {/* </Provider> */}
            </FavouritesContextProvider>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
