import SQLite from 'react-native-sqlite-storage';
import { Alert } from 'react-native';
const audioPlayerDatabase = SQLite.openDatabase({ name: 'audio.db' })
export async function AddSongToDatabase(query, body, callbacks) {
    // console.log("🚀 ~ AddSongToDatabase ~ body:", body) 
    let sql = "INSERT INTO fav_odhuvar (id,url,title,artist,thalamOdhuvarTamilname,categoryName,thirumariasiriyar) VALUES (?, ?, ?, ?, ?, ?, ?)"; //storing user data in an array
    audioPlayerDatabase.executeSql(sql, body, (result) => {
        Alert.alert("Success", "User created successfully.");
        console.log('audio created successfully.')
        callbacks({ message: 'Success' })
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
export async function listfavAudios(callbacks) {
    let sql = "SELECT * FROM fav_odhuvar";
    audioPlayerDatabase.transaction((tx) => {
        tx.executeSql(sql, [], (tx, resultSet) => {
            var length = resultSet.rows.length;
            let arr = []
            for (var i = 0; i < length; i++) {
                console.log("row data", resultSet.rows.item(i));
                arr.push(resultSet.rows.item(i))
            }
            callbacks(arr)
        }, (error) => {
            console.log("List user error", error);
            callbacks({ message: 'No data found' })
        })
    })
}
export const createDownloadTable = () => {
    audioPlayerDatabase.executeSql("CREATE TABLE IF NOT EXISTS Downlaoded_audios (id INTEGER PRIMARY KEY AUTOINCREMENT, url VARCHAR, title VARCHAR , artist VARCHAR , thalamOdhuvarTamilname VARCHAR, categoryName VARCHAR, thirumariasiriyar VARCHAR )", [], (result) => {
        console.log("Table created successfully");
    }, (error) => {
        console.log("Create table error", error)
    })
}
export async function AddDownloadedAudios(query, body, callbacks) {
    // console.log("🚀 ~ AddSongToDatabase ~ body:", body)
    let sql = "INSERT INTO Downlaoded_audios (id,url,title,artist,thalamOdhuvarTamilname,categoryName,thirumariasiriyar) VALUES (?, ?, ?, ?, ?, ?, ?)"; //storing user data in an array
    audioPlayerDatabase.executeSql(sql, body, (result) => {
        Alert.alert("Success", "User created successfully.");
        console.log('audio created successfully.')
        callbacks({ message: 'Success' })
    }, (error) => {
        console.log("Create user error", error);
    });
    // }
}
export async function RemoveFavAudios(query, body, callbacks) {
    let q = `DELETE FROM fav_odhuvar WHERE id=${body?.id}`;
    // console.log("🚀 ~ RemoveFavAudios ~ body:", q)
    audioPlayerDatabase.executeSql(q, body, (result) => {
        // Alert.alert("Success", "User created successfully.");
        console.log('audio created successfully.')
        callbacks({ message: 'Success' })
    }, (error) => {
        console.log("Create user error", error);
    });
}
export const MostPlayedSongList = () => {
    audioPlayerDatabase.executeSql("CREATE TABLE IF NOT EXISTS most_played (id INTEGER PRIMARY KEY, url VARCHAR, title VARCHAR , artist VARCHAR , thalamOdhuvarTamilname VARCHAR, categoryName VARCHAR, thirumariasiriyar VARCHAR ,count INTEGER)", [], (result) => {
        console.log("Most Played Playlist created");
    }, (error) => {
        console.log("Create Most Played Playlist table error", error)
    })
}
export async function AddMostPlayed(query, body, callbacks) {
    let sql = "INSERT INTO most_played (id,url,title,artist,thalamOdhuvarTamilname,categoryName,thirumariasiriyar,count) VALUES (?, ?, ?, ?, ?, ?, ?,?)"; //storing user data in an array
    audioPlayerDatabase.executeSql(sql, body, (result) => {
        // Alert.alert("Success", "User created successfully.");
        console.log('audio created successfully.')
        callbacks({ message: 'Success' })
    }, (error) => {
        console.log("Create user error", error);
    });
}
export async function UpdateMostPlayed(query, body, callbacks) {
    console.log("🚀 ~ UpdateMostPlayed ~ query:", query, body)

    // let sql = `UPDATE most_played SET count=${count} WHERE id=${id}`; //storing user data in an array
    audioPlayerDatabase.executeSql(query, body, (result) => {
        console.log("🚀 ~ audioPlayerDatabase.executeSql ~ result:", result)
        // Alert.alert("Success", "User created successfully.");
        console.log('audio created successfully.')

        callbacks({ message: 'Success Updated' })
    }, (error) => {
        callbacks({ message: 'Update most played error' })
        console.log("Update most played error ", error);
    });
}
export async function MostPlayedList(query, callbacks) {
    let sql = "SELECT * FROM most_played";
    audioPlayerDatabase.transaction((tx) => {
        tx.executeSql(sql, [], (tx, resultSet) => {
            var length = resultSet.rows.length;
            let arr = []
            for (var i = 0; i < length; i++) {
                console.log("row data", resultSet.rows.item(i));
                arr.push(resultSet.rows.item(i))
            }
            let newArr = arr.sort((a, b) => {
                return a.count - b.count
            })
            callbacks(newArr)
        }, (error) => {
            console.log("List user error", error);
            callbacks({ message: 'No data found' })
        })
    })
}

