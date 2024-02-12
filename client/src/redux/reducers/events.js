import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isEventLoading: true,
  events: null,
  getEventSuccessMessage: null,
  getEventFailMessage: null,
};

const event = createSlice({
  name: "event",
  initialState,
  reducers: {
    setIsEventLoading: (state, action) => {
      state.isEventLoading = action.payload;
    },
    setEvents: (state, action) => {
      state.events = action.payload;
    },
    setGetEventSuccessMessage: (state, action) => {
      state.getEventSuccessMessage = action.payload;
    },
    setGetEventFailMessage: (state, action) => {
      state.getEventFailMessage = action.payload;
    },
  },
});

export const getShopEvents = (id) => async (dispatch) => {
  dispatch(setIsEventLoading(true));
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_SERVER}/events/getShopEvents/${id}`,
      { withCredentials: true }
    );
    if (response.data.success) {
      dispatch(setGetEventSuccessMessage(response.data.message));
      dispatch(setEvents(response.data.eventData));
    } else {
      dispatch(setGetEventFailMessage(response.data.message));
    }
  } catch (error) {
    dispatch(setGetEventFailMessage(error.response.data.message)); // Dispatch failure message
  } finally {
    dispatch(setIsEventLoading(false));
  }
};
export const handleDeleteEvent = (id) => async (dispatch) => {
  dispatch(setIsEventLoading(true));
  try {
    await axios
      .delete(`${import.meta.env.VITE_SERVER}/events/delete-event/${id}`)
      .then((res) => {
        dispatch(setGetEventSuccessMessage(res.data.message));
      })
      .catch((error) => {
        dispatch(setGetEventFailMessage(error.response.data.message));
      })
      .finally(() => {
        dispatch(setIsEventLoading(false));
      });
  } catch (error) {
    console.log(error.message, " in the deletion of the events");
  }
};
export const {
  setIsEventLoading,
  setEvents,
  setGetEventSuccessMessage,
  setGetEventFailMessage,
} = event.actions;
export default event.reducer;
