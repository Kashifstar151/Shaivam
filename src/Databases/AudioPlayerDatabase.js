import SQLite from 'react-native-sqlite-storage';
import { Alert } from 'react-native';
const audioPlayerDatabase = SQLite.openDatabase({ name: 'audio.db' })
export async function AddSongToDatabase(query, body, callbacks) {
    console.log("🚀 ~ AddSongToDatabase ~ body:", body)
    let sql = "INSERT INTO fav_odhuvar (id,url,title,artist,thalamOdhuvarTamilname,categoryName,thirumariasiriyar) VALUES (?, ?, ?, ?, ?, ?, ?)"; //storing user data in an array
    audioPlayerDatabase.executeSql(sql, body, (result) => {
        Alert.alert("Success", "User created successfully.");
        console.log('audio created successfully.')
    }, (error) => {
        console.log("Create user error", error);
    });
    // }
}
export const createUserTable = () => {
    audioPlayerDatabase.executeSql("CREATE TABLE IF NOT EXISTS fav_odhuvar (id INTEGER PRIMARY KEY AUTOINCREMENT, url VARCHAR, title VARCHAR , artist VARCHAR , thalamOdhuvarTamilname VARCHAR, categoryName VARCHAR, thirumariasiriyar VARCHAR )", [], (result) => {
        console.log("Table created successfully");
    }, (error) => {
        console.log("Create table error", error)
    })
}
export const listfavAudios = async () => {
    let sql = "SELECT * FROM fav_odhuvar";
    audioPlayerDatabase.transaction((tx) => {
        tx.executeSql(sql, [], (tx, resultSet) => {
            var length = resultSet.rows.length;
            for (var i = 0; i < length; i++) {
                console.log("row data", resultSet.rows.item(i));
            }
        }, (error) => {
            console.log("List user error", error);
        })
    })
}