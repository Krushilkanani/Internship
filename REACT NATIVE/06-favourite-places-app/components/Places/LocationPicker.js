import { Alert, View, StyleSheet, Image, Text } from "react-native";
import { useEffect, useState } from "react";
import {
    getCurrentPositionAsync,
    useForegroundPermissions,
    PermissionStatus,
} from "expo-location";

import OutlinedButton from "../UI/OutlinedButton";
import { Colors } from "../../constants/colors";
import { getUserAddress, getMapPreview } from "../../util/location";
import {
    useNavigation,
    useRoute,
    useIsFocused,
} from "@react-navigation/native";

function LocationPicker({ onPickLocation }) {
    const [pickedLocation, setPickedLocation] = useState();
    const isFocused = useIsFocused();
    const navigation = useNavigation();
    const route = useRoute();

    const [locationPermissionInformation, requestPermission] =
        useForegroundPermissions();

    useEffect(() => {
        if (isFocused && route.params) {
            const mapPickedLocation = route.params
                ? { lat: route.params.pickedLat, lng: route.params.pickedLng }
                : null;

            // console.log("mapPickedLocation", mapPickedLocation);
            setPickedLocation(mapPickedLocation);
        }
    }, [route, isFocused]);

    useEffect(() => {
        async function handleLocation() {
            // console.log("pickedLocation::", pickedLocation);
            if (pickedLocation) {
                const address = await getUserAddress(
                    pickedLocation.lat,
                    pickedLocation.lng
                );
                // console.log(pickedLocation);

                // console.log("address::", address);
                onPickLocation({ ...pickedLocation, address: address });
            }
        }
        handleLocation();
    }, [pickedLocation, onPickLocation]);

    async function verifyPermissions() {
        if (
            locationPermissionInformation.status ===
            PermissionStatus.UNDETERMINED
        ) {
            const permissionresponse = await requestPermission();
            return permissionresponse.granted;
        }

        if (locationPermissionInformation.status === PermissionStatus.DENIED) {
            Alert.alert(
                "Insufficient permissions",
                "You need to grant camera permissions to use this app"
            );
            return false;
        }

        return true;
    }

    async function getLocationHandler() {
        const hasPermission = await verifyPermissions();

        if (!hasPermission) {
            return;
        }

        const location = await getCurrentPositionAsync();
        // console.log("location", location);
        setPickedLocation({
            lat: location.coords.latitude,
            lng: location.coords.longitude,
        });
    }

    function pickOnMapHandler() {
        navigation.navigate("Map");
    }

    let locationPreview = <Text>No location picked yet.</Text>;

    if (pickedLocation) {
        locationPreview = (
            <Image
                style={styles.image}
                source={{
                    uri: getMapPreview(pickedLocation.lat, pickedLocation.lng),
                }}
            />
        );
    }

    return (
        <View>
            <View style={styles.mapPreview}>{locationPreview}</View>
            <View style={styles.actions}>
                <OutlinedButton icon="location" onPress={getLocationHandler}>
                    Locate User
                </OutlinedButton>
                <OutlinedButton icon="map" onPress={pickOnMapHandler}>
                    Pick on Map
                </OutlinedButton>
            </View>
        </View>
    );
}

export default LocationPicker;

const styles = StyleSheet.create({
    mapPreview: {
        width: "100%",
        height: 200,
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 8,
        backgroundColor: Colors.primary100,
        borderRadius: 4,
        overflow: "hidden",
    },
    actions: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
    },
    image: {
        width: "100%",
        height: "100%",
    },
});
