import createDataContext from "./createDataContext";
import { AsyncStorage } from "react-native";
import Moment from "moment";
import axios from "../api/api";
const reducer = (state, action) => {
  //   console.log("reducer running");
  switch (action.type) {
    case "fetch_attendance":
      return updateAttendanceStateHelper(state, action.payload);
    case "update_attendance": {
      return updateAttendanceStateHelper(state, action.payload);
    }
    default:
      return state;
  }
};

const updateAttendanceStateHelper = (state, newAttendanceObject) => {
  const newState = state.filter(
    attendanceObject => attendanceObject.date !== newAttendanceObject.date
  );
  newState.push(newAttendanceObject);
  return newState;
};

const fetchAttendance = dispatch => async date => {
  const dateStringKey = Moment(date).format("YMMDD");
  const attendanceString = await AsyncStorage.getItem(dateStringKey);
  let attendance;
  if (attendanceString !== null) {
    attendance = JSON.parse(attendanceString);
  } else {
    await AsyncStorage.setItem(dateStringKey, "false");
    attendance = false;
  }
  dispatch({
    type: "fetch_attendance",
    payload: { date: dateStringKey, attendance }
  });
};

const updateAttendance = dispatch => async (
  dateStringKey,
  attendance,
  scheduleId
) => {
  console.log("updateAttendance running");
  try {
    await AsyncStorage.setItem(dateStringKey, JSON.stringify(attendance));
    dispatch({
      type: "update_attendance",
      payload: { date: dateStringKey, attendance }
    });

    const numberOfAttendeeDiff = attendance ? 1 : -1;
    axios.patch(`/schedules/numberOfAttendee/${scheduleId}`, {
      numberOfAttendeeDiff: JSON.stringify(numberOfAttendeeDiff)
    });
  } catch (err) {
    console.log(err);
  }
};

export const { Context, Provider } = createDataContext(
  //reducer
  reducer,
  //actions
  { fetchAttendance, updateAttendance },

  //intial state
  []
);
