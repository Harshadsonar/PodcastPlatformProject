import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  podcasts: [],
};

const podcastSlice = createSlice({
  name: "podcasts",
  initialState,
  reducers: {
    setPodcasts: (state, action) => {
      state.podcasts = action.payload;
    },
    deletePodcast: (state, action) => {
      state.podcasts = state.podcasts.filter((podcast) => podcast.id !== action.payload);
    },
  },
});
export const { deletePodcast } = podcastSlice.actions;
export const { setPodcasts } = podcastSlice.actions;
export default podcastSlice.reducer;
