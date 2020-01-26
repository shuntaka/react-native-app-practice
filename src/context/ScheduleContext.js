import createDataContext from "./createDataContext";
import axios from "../api/api";

import findBegginEndDateForWeek from "../helper/helper";

const reducer = (state, action) => {
  switch (action.type) {
    case "fetch_schedules":
      return action.payload;

    default:
      return state;
  }
};
const fetchSchedules = dispatch => async dateRange => {
  const { begginDate, endDate } = dateRange;

  // encode parameters
  const begginDateString = begginDate.toISOString();
  const endDateString = endDate.toISOString();

  // use parameters
  const response = await axios(
    `/schedules?begginDate=${begginDateString}&endDate=${endDateString}`
  );
  const schedules = response.data;
  dispatch({ type: "fetch_schedules", payload: schedules });
};

export const { Context, Provider } = createDataContext(
  reducer, // reducer
  { fetchSchedules }, //actions
  [] // initial state
);
