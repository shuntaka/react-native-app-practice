import createDataContext from "./createDataContext";
import findBegginEndDateForWeek from "../helper/helper";

const reducer = (state, action) => {
  console.log("ScheduleRangeContext reducer running");
  switch (action.type) {
    case "update_schedule_range":
      return action.payload;
    default:
      return state;
  }
};
const updateScheduleRange = dispatch => scheduleRange => {
  dispatch({ type: "update_schedule_range", payload: scheduleRange });
};

export const { Context, Provider } = createDataContext(
  //reducer
  reducer,
  //action
  { updateScheduleRange },
  //initial state
  findBegginEndDateForWeek(new Date())
);
