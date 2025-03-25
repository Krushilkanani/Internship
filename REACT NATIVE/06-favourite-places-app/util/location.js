const GOOGLE_API_KEY = "AIzaSyAh9PGJgjCST-_4Twx4UZXDiPEkEH0rGHU";
const api =
    "pk.eyJ1Ijoia3J1c2hpbDI2IiwiYSI6ImNtOGg4a3piczA5NGQyaXI4dmNxMzVsYjkifQ.TauDtGpxuFU9ua_IblDSUQ";

export function getMapPreview(lat, lng) {
    const imagePreview = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:S%7C${lat},${lng}&key=${GOOGLE_API_KEY}`;

    // console.log(lat, lng);

    const image = `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/${lng},${lat},14/400x200?access_token=${api}`;

    return image;
}

// export async function getAddress(lat, lng) {
//     const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`;

//     const response = await fetch(url);

//     if (!response.ok) {
//         throw new Error("Failed to fetch address");
//     }

//     const data = await response.json();
//     const address = data.results[0].formatted_address;
//     return address;
// }s

const apiKey = "c6ab077f16494cbd86cfdb4ef6fcab32";
const apiEndPoint = "https://api.opencagedata.com/geocode/v1/json";

export async function getUserAddress(lat, lng) {
    let query = `${lat}%2C+${lng}`;
    let apiUrl = `${apiEndPoint}?q=${query}&key=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const address = data.results[0].formatted;
        // console.log("address", address);
        return address;
    } catch (error) {
        console.log(error);
    }
}
