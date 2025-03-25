import { createSlice } from "@reduxjs/toolkit";

const favouritesSlice = createSlice({
    name: "favourites",
    initialState: {
        ids: [],
    },
    reducers: {
        addFavourite: (state, action) => {
            state.ids.push(action.payload);
        },
        removeFavourite: (state, action) => {
            state.ids.splice(state.ids.indexOf(action.payload.id), 1);
        },
    },
});

export default favouritesSlice.reducer;
export const { addFavourite, removeFavourite } = favouritesSlice.actions;
