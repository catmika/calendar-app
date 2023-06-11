import UserService from "../../../api/UserService";

const initialState = {
  events: [],
  guests: [],
};

const SET_GUESTS = "SET_GUESTS";
const SET_EVENTS = "SET_EVENTS";

export default function eventReducer(state = initialState, action) {
  switch (action.type) {
    case SET_GUESTS:
      return { ...state, guests: action.payload };
    case SET_EVENTS:
      return { ...state, events: action.payload };
    default:
      return state;
  }
}

//Action creators
export const setGuestsAction = (payload) => ({
  type: SET_GUESTS,
  payload,
});
export const setEventsAction = (payload) => ({
  type: SET_EVENTS,
  payload,
});
export const fetchGuests = () => async (dispatch) => {
  try {
    const response = await UserService.getUsers();
    dispatch(setGuestsAction(response.data));
  } catch (e) {
    console.log(e);
  }
};
export const createEvent = (event) => async (dispatch) => {
  try {
    const events = localStorage.getItem("events");
    const json = JSON.parse(events) || [];
    json.push(event);
    dispatch(setEventsAction(json));
    localStorage.setItem("events", JSON.stringify(json));
  } catch (e) {
    console.log(e);
  }
};
export const fetchEvents = (username) => async (dispatch) => {
  try {
    const events = localStorage.getItem("events");
    const json = JSON.parse(events) || [];
    const currentUserEvents = json.filter(
      (ev) => ev.author === username || ev.guest === username
    );
    dispatch(setEventsAction(currentUserEvents));
  } catch (e) {
    console.log(e);
  }
};
