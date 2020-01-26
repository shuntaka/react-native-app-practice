import React, { useState, useContext, useEffect } from "react";
import { Text } from "react-native";
import ToggleSwitch from "toggle-switch-react-native";
import { Context as AttendanceContext } from "../context/AttendanceContext";
import { Context as ScheduleContext } from "../context/ScheduleContext";
import Moment from "moment";

const Attendance = ({ date, scheduleId }) => {
  const { state, fetchAttendance, updateAttendance } = useContext(
    AttendanceContext
  );
  const { fetchSchedules } = useContext(ScheduleContext);

  const dateStringKey = Moment(date).format("YMMDD");
  const attendanceObject = state.find(attendanceObject => {
    return attendanceObject.date === dateStringKey;
  });
  const attendance =
    attendanceObject !== undefined ? attendanceObject.attendance : false;

  useEffect(() => {
    fetchAttendance(date);
  }, []);

  const isOnHandler = isOn => {
    updateAttendance(dateStringKey, isOn, scheduleId);
  };

  return (
    <ToggleSwitch
      isOn={attendance}
      // isOn={true}
      onColor="#ffd1dc"
      offColor="grey"
      label="利用予定"
      labelStyle={{ color: "black", fontWeight: "100" }}
      size="medium"
      onToggle={isOnHandler}
    />
  );
};
// const Attendance = ({ date, attendance }) => {
//   const [state, setState] = useState(false);
//   const { updateScdanhedules } = useContext(ScheduleContext);

//   const isOnHandler = async isOn => {
//     setState(!state);
//     await switchAttendance(date);
//     if (isOn === true) {
//       await incrementAttendee(date);
//     } else {
//       await decrementAttendee(date);
//     }
//     const schedules = await fetchSchedules();
//     updateSchedules(schedules);
//   };

//   useEffect(() => {
//     setState(attendance);
//   }, []);
//   return (
//     <ToggleSwitch
//       isOn={state}
//       // isOn={true}
//       onColor="#ffd1dc"
//       offColor="grey"
//       label="利用予定"
//       labelStyle={{ color: "black", fontWeight: "100" }}
//       size="medium"
//       onToggle={isOnHandler}
//     />
//   );
// };
export default Attendance;
