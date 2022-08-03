import * as BackgroundFetch from "expo-background-fetch";
import * as TaskManager from "expo-task-manager";
import AuthContext from "../../hooks/context";
import { useContext, useState } from "react";

const StartBackgroundActivities = async (noti) => {
  //   const { steps, setSteps } = useContext(AuthContext);
  console.log("StartBackgroundActivities");

  function myTask() {
    console.log("myTask");
    try {
      // fetch data here...
      const backendData = "Simulated fetch " + Math.random();
      noti()
      console.log("myTask() ", backendData);
      // setStateFn(backendData);
      return backendData;
    } catch (err) {
      console.log("myTask() failed:", err);
      return BackgroundFetch;
    }
  }

  async function initBackgroundFetch(taskName, taskFn, interval) {
    console.log("initBackgroundFetch");

    try {
      if (!TaskManager.isTaskDefined(taskName)) {
        TaskManager.defineTask(taskName, taskFn);
      }
      const options = {
        minimumInterval: 30, // in seconds
      };
      await BackgroundFetch.registerTaskAsync(taskName, options);
      console.log("BackgroundFetch registered");
    } catch (err) {
      console.log("registerTaskAsync() failed:", err);
    }
  }

  await initBackgroundFetch("myTask", myTask, 15);
};

export default StartBackgroundActivities;
