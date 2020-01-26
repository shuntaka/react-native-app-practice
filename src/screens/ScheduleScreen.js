import React, { useEffect, useContext, useCallback } from "react";
import { Card, ListItem } from "react-native-elements";
import { View, StyleSheet, Text, SafeAreaView } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { DefaultTheme, List } from "react-native-paper";
import { Context as ScheduleContext } from "../context/ScheduleContext";
import { Context as ScheduleRangeContext } from "../context/ScheduleRangeContext";
import { fetchSchedules } from "../hooks/useSchedules";
import NurseIcon from "../components/NurseIcon";
import Attendance from "../components/Attendance";
import Moment from "moment";
import findBegginEndDateForWeek from "../helper/helper";

const ScheduleScreen = ({ navigation }) => {
  console.log("running ScheduleScreen ");
  const { state, fetchSchedules } = useContext(ScheduleContext);

  const scheduleRangeStateAndActions = useContext(ScheduleRangeContext);
  const scheduleRangeState = scheduleRangeStateAndActions.state;
  const updateScheduleRange = scheduleRangeStateAndActions.updateScheduleRange;

  const fetchSchedulesForScheduleRange = useCallback(() => {
    console.log("!! useCallback running");
    fetchSchedules(scheduleRangeState);
  }, [scheduleRangeState]);

  useEffect(() => {
    console.log("ScheduleScreen useEffect");
    fetchSchedulesForScheduleRange(scheduleRangeState);

    const listner = navigation.addListener("didFocus", () => {
      fetchSchedulesForScheduleRange(scheduleRangeState);
    });
    return () => {
      listner.remove();
    };
  }, [scheduleRangeState]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        style={styles.schedulesContainer}
        data={state}
        keyExtractor={schedule => schedule.date}
        renderItem={({ item }) => {
          return (
            <View style={styles.scheduleStyle}>
              <Text>{Moment(item.date).format("M/D")}</Text>
              <NurseIcon nurseAttendance={item.nurseAttendance} />
              <Text>{`使うかも：${item.numberOfAttendee}人`}</Text>
              <Attendance date={item.date} scheduleId={item._id} />
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  schedulesContainer: {
    marginTop: "10%",
    marginLeft: 10,
    marginRight: 10
  },
  scheduleStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderColor: "gray",
    borderWidth: 0.2,
    padding: 10,
    marginTop: 10
  }
});
export default ScheduleScreen;
