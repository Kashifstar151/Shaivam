import SQLite from 'react-native-sqlite-storage';
import { unzip } from 'react-native-zip-archive';
import * as RNFS from 'react-native-fs';
import RNFetchBlob from 'rn-fetch-blob';
import { PermissionsAndroid } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// const databaseName = 'main.db';
// const database = SQLite.openDatabase({ name: databaseName, });
const database = SQLite.openDatabase({ name: 'main.db' });
const offlineDatabase = SQLite.openDatabase({ name: 'SongsData.db', createFromLocation: 1 });
// export const initDatabase = () => {
//     database.transaction((tx) => {
//         tx.executeSql(
//             // 'CREATE TABLE IF NOT EXISTS API_DATA (id INTEGER PRIMARY KEY AUTOINCREMENT, endpoint TEXT, data TEXT)',
//             'CREATE TABLE IF NOT EXISTS Thrimurai_data (id INTEGER PRIMARY KEY,title TEXT,titleName TEXT , pann TEXT,audioUrl BLOB,thalam TEXT,country TEXT,author TEXT,url BLOB, rawSong BLOB,searchRawSong BLOB,locale TEXT)', [],
//             () => console.log('Database and table created successfully'),
//             (_, error) => console.error('Error creating table:', error)
//         );
//     });
// };
export async function attachDb() {
    return new Promise((resolve, reject) => {
        RNFetchBlob.config({
            fileCache: true,
        })
            .fetch(
                'GET',
                'https://shaivamfiles.fra1.cdn.digitaloceanspaces.com/sqlitedump/thirumuraiSongs_11.zip'
            )
            .then((res) => {
                // the temp file path
                console.log('The file saved to', res.path());
                // const filePath = RNFS.DocumentDirectoryPath + '/myData.db';
                // Unzip will be called here!
                unzipDownloadFile(res.path(), async (jsonFilePath) => {
                    RNFS.readDir(jsonFilePath)
                        .then((files) => {
                            const fileNames = files.map((fileInfo) => fileInfo.name);
                            console.log('File names in the directory:', fileNames);
                            try {
                                database.transaction(
                                    async (tx) => {
                                        await tx.executeSql(
                                            'ATTACH DATABASE ? AS Updated_db',
                                            [`${jsonFilePath}/thirumuraiSongs_11.db`],
                                            async (tx, results) => {
                                                console.log(
                                                    '🚀 ~ file: Database.js:49 ~ database.transaction ~ results:',
                                                    tx,
                                                    results
                                                );
                                                const data = await AsyncStorage.getItem(
                                                    '@database'
                                                );
                                                resolve(tx);
                                                // console.log("🚀 ~ file: Database.js:53 ~ async ~ data:", data)
                                            }
                                        );
                                    },
                                    async (error) => {
                                        const data = await AsyncStorage.getItem('@database');
                                        // console.log("🚀 ~ file: Database.js:53 ~ async ~ data:", data)
                                        console.log(
                                            '🚀 ~ file: Database.js:56 ~ database.transaction ~ error:',
                                            error
                                        );
                                        reject(error);
                                    }
                                );
                            } catch (error) {
                                console.log(
                                    '🚀 ~ file: Database.js:53 ~ unzipDownloadFile ~ error:',
                                    error
                                );
                            }
                        })
                        .catch((error) => console.error('Error reading directory:', error));
                });
            });
    });
}
// export const attachDb = (link) => {
//     RNFetchBlob
//         .config({
//             fileCache: true,
//         })
//         .fetch('GET', 'https://shaivamfiles.fra1.cdn.digitaloceanspaces.com/sqlitedump/thirumurai_songsData2.zip', {
//             //some headers ..
//         })
//         .then((res) => {
//             // the temp file path
//             console.log('The file saved to', res.path())
//             // const filePath = RNFS.DocumentDirectoryPath + '/myData.db';
//             // Unzip will be called here!
//             unzipDownloadFile(res.path(), async (jsonFilePath) => {
//                 console.log("🚀 ~ file: Database.js:35 ~ unzipDownloadFile ~ jsonFilePath:", jsonFilePath)
//                 RNFS.readDir(jsonFilePath)
//                     .then((files) => {
//                         console.log("🚀 ~ file: Database.js:50 ~ unzipDownloadFile ~ files:", files)
//                         const fileNames = files.map(fileInfo => fileInfo.name);
//                         console.log('File names in the directory:', fileNames);
//                         try {
//                             database.transaction(async (tx) => {
//                                 await tx.executeSql(
//                                     'ATTACH DATABASE ? AS Updated_db',
//                                     [`${jsonFilePath}/thirumurai_songsData2.db`],
//                                     async (tx, results) => {
//                                         console.log("🚀 ~ file: Database.js:49 ~ database.transaction ~ results:", tx, results)
//                                         const data = await AsyncStorage.getItem('@database')
//                                         // console.log("🚀 ~ file: Database.js:53 ~ async ~ data:", data)
//                                     }
//                                 );
//                             }, async (error) => {
//                                 const data = await AsyncStorage.getItem('@database')
//                                 // console.log("🚀 ~ file: Database.js:53 ~ async ~ data:", data)
//                                 console.log("🚀 ~ file: Database.js:56 ~ database.transaction ~ error:", error)
//                             });
//                         } catch (error) {
//                             console.log("🚀 ~ file: Database.js:53 ~ unzipDownloadFile ~ error:", error)
//                         }
//                     })
//                     .catch(error => console.error('Error reading directory:', error));
//             });
//         });
//     return data
// }
// export const offlineDataBAse = () => {
//     const path = RNFS.MainBundlePath
//     console.log("🚀 ~ file: Database.js:73 ~ offlineDataBAse ~ path:", path)
//     try {
//         database.transaction(async (tx) => {
//             await tx.executeSql(
//                 'ATTACH DATABASE ? AS Updated_db',
//                 [`/thirumuraiData.sqlite`],
//                 (tx, results) => {
//                     console.log("🚀 ~ file: Database.js:49 ~ database.transaction ~ results:", tx, results)
//                 }
//             );
//             // tx.executeSql('COMMIT;');
//         }, (error) => {

//         });

//     } catch (error) {
//     }
// }

async function requestFilePermissions() {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
                title: 'File Permission',
                message: 'App needs access to your storage to read and write files.',
                buttonNeutral: 'Ask Me Later',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
            }
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('File permissions granted');
        } else {
            console.log('File permissions denied');
        }
    } catch (err) {
        console.warn(err);
    }
}
function unzipDownloadFile(target, cb) {
    requestFilePermissions();
    const sourcePath = target;
    // console.log("🚀 ~ file: Database.js:72 ~ unzipDownloadFile ~ targetPath:", sourcePath)
    const targetPath = `${RNFS.ExternalDirectoryPath}/Thrimurai`;
    const filePath = RNFS.DocumentDirectoryPath + '/myData.db';
    const charset = 'UTF-8';
    RNFS.mkdir(targetPath)
        .then(() => {
            console.log('Output directory created successfully');
            unzip(sourcePath, targetPath, charset)
                .then((path) => {
                    console.log(`unzip completed at ${path}`);
                    // downloadFile(path, filePath)
                    return cb(path);
                })
                .catch((error) => {
                    console.log('🚀 ~ file: Database.js:81 ~ unzipDownloadFile ~ error:', error);
                    console.error(error);
                });
        })
        .catch((error) => {
            console.log('🚀 ~ file: Database.js:130 ~ .then ~ error:', error);
        });
}

export async function getSqlData(query, callbacks) {
    console.log('🚀 ~ file: Database.js:146 ~ getSqlData ~ query:', query);
    const data = await AsyncStorage.getItem('@database');
    const databasename = JSON.parse(data);
    console.log('🚀 ~ file: Database.js:142 ~ getSqlData ~ data:', JSON.parse(data));
    if (databasename?.name !== 'songData.db') {
        // alert(true)
        await database.transaction(
            (tx) => {
                tx.executeSql(query, [], (_, results) => {
                    // console.log("🚀 ~ file: Database.js:149 ~ tx.executeSql ~ results:", results)
                    let arr = [];
                    if (results?.rows?.length > 0) {
                        for (let i = 0; i < results?.rows?.length; i++) {
                            const tableName = results.rows.item(i);
                            // console.log(" offline Database data", tableName);
                            arr.push(tableName);
                            // console.log("🚀 ~ file: ThrimuraiSong.js:57 ~ tx.executeSql ~ arr:", JSON.stringify(arr, 0, 2))
                        }
                        callbacks(arr);
                    } else {
                        console.log('No tables found.');
                        callbacks({ error: 'error in database' });
                    }
                });
            },
            (error) => {
                console.error('error occured in fetching data at 1', error);
            }
        );
    } else {
        await offlineDatabase.transaction(
            (tx) => {
                tx.executeSql(query, [], (_, results) => {
                    console.log('🚀 ~ file: Database.js:149 ~ tx.executeSql ~ results:', results);
                    let arr = [];
                    if (results?.rows?.length > 0) {
                        for (let i = 0; i < results?.rows?.length; i++) {
                            const tableName = results.rows.item(i);
                            // console.log(" offline Database data", tableName);
                            arr.push(tableName);
                            // console.log("🚀 ~ file: ThrimuraiSong.js:57 ~ tx.executeSql ~ arr:", JSON.stringify(arr, 0, 2))
                        }
                        callbacks(arr);
                    } else {
                        console.log('No tables found.');
                        callbacks({ error: 'error in database' });
                    }
                });
            },
            (error) => {
                console.error('error occured in fetching data at 2', error);
            }
        );
    }
}

export default database;
