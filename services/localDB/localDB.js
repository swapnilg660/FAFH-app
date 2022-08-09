import * as SQLite from "expo-sqlite";

// SQLite.DEBUG(true);
// SQLite.enablePromise(true);

export const getDBConnection = async () => {
  try {
    return SQLite.openDatabase("FAFH-database.db");
  } catch (error) {
    Toast.show({
      text: "Error opening database",
    });
  }
};

export const createTable = async (db, tableName) => {
  // create table if not exists
  const query = `CREATE TABLE IF NOT EXISTS ${tableName}(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    nutrition DEFAULT CURRENT_TIMESTAMP,
    );`;
  await db.transaction((tx) => {
    tx.executeSql(query);
  });
};

export const getCustomMeal = async (db, tableName, setMeals) => {
  let historyList = [];
  try {
    await db.transaction((tx) => {
      tx.executeSql(`SELECT * FROM ${tableName}`, [], (_, { rows }) => {
        historyList = rows;
        setMeals(historyList);
        console.log("historyList: ", historyList);
      });
    });

    return historyList;
  } catch (error) {
    console.log(error);
    throw Error("Failed to get meals !!!:", error);
  }
};

export const saveMeals = async (db, tableName, title, nutrition) => {
  const insertQuery = `INSERT INTO ${tableName} (title, nutrition) values ("${title}", "${nutrition}")`;
  const isWorking = false;
  await db.transaction((txx) => {
    txx.executeSql(insertQuery);
  });
  console.log("meal saved");
  return isWorking;
};
