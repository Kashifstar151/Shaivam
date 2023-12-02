import SQLite from 'react-native-sqlite-storage';
import { JSONData } from "../../output.js"
import { unzip } from 'react-native-zip-archive';
import * as RNFS from 'react-native-fs'
import RNFetchBlob from 'rn-fetch-blob';
import { decode } from 'base-64';
import base64 from 'react-native-base64'
import { useEffect } from 'react';
import { AppState, PermissionsAndroid } from 'react-native';
// const databaseName = 'main.db';
// const database = SQLite.openDatabase({ name: databaseName, });
const database = SQLite.openDatabase({ name: 'songData.db', createFromLocation: 1 });


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
export const attachDb = (link) => {

    RNFetchBlob
        .config({
            fileCache: true,
        })
        .fetch('GET', 'https://shaivamfiles.fra1.cdn.digitaloceanspaces.com/sqlitedump/SongsData.zip', {
            //some headers ..
        })
        .then((res) => {
            // the temp file path
            console.log('The file saved to', res.path())
            // const filePath = RNFS.DocumentDirectoryPath + '/myData.db';
            // Unzip will be called here!
            unzipDownloadFile(res.path(), async (jsonFilePath) => {
                console.log("🚀 ~ file: Database.js:35 ~ unzipDownloadFile ~ jsonFilePath:", jsonFilePath)
                RNFS.readDir(jsonFilePath)
                    .then((files) => {
                        console.log("🚀 ~ file: Database.js:50 ~ unzipDownloadFile ~ files:", files)
                        const fileNames = files.map(fileInfo => fileInfo.name);
                        console.log('File names in the directory:', fileNames);
                        try {
                            database.transaction(async (tx) => {
                                await tx.executeSql(
                                    'ATTACH DATABASE ? AS Updated_db',
                                    [`${jsonFilePath}/thirumuraiData.db`],
                                    (tx, results) => {
                                        console.log("🚀 ~ file: Database.js:49 ~ database.transaction ~ results:", tx, results)
                                    }
                                );
                                // tx.executeSql('COMMIT;'); 
                            }, (error) => {
                                console.log("🚀 ~ file: Database.js:56 ~ database.transaction ~ error:", error)

                            });

                        } catch (error) {
                            console.log("🚀 ~ file: Database.js:53 ~ unzipDownloadFile ~ error:", error)
                        }

                        // You can now use the file names for further processing
                    })
                    .catch(error => console.error('Error reading directory:', error));
            });
        });

}
export const offlineDataBAse = () => {
    const path = RNFS.MainBundlePath
    console.log("🚀 ~ file: Database.js:73 ~ offlineDataBAse ~ path:", path)
    try {
        database.transaction(async (tx) => {
            await tx.executeSql(
                'ATTACH DATABASE ? AS Updated_db',
                [`/thirumuraiData.sqlite`],
                (tx, results) => {
                    console.log("🚀 ~ file: Database.js:49 ~ database.transaction ~ results:", tx, results)
                }
            );
            // tx.executeSql('COMMIT;'); 
        }, (error) => {
            console.log("🚀 ~ file: Database.js:56 ~ database.transaction ~ error:", error)

        });

    } catch (error) {
        console.log("🚀 ~ file: Database.js:53 ~ unzipDownloadFile ~ error:", error)
    }
}

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
    requestFilePermissions()
    const sourcePath = target;
    // console.log("🚀 ~ file: Database.js:72 ~ unzipDownloadFile ~ targetPath:", sourcePath)
    const targetPath = `${RNFS.ExternalDirectoryPath}/Thrimurai`
    const filePath = RNFS.DocumentDirectoryPath + '/myData.db';
    const charset = 'UTF-8';
    RNFS.mkdir(targetPath)
        .then(() => {
            console.log('Output directory created successfully');
            unzip(sourcePath, targetPath, charset)
                .then((path) => {
                    console.log(`unzip completed at ${path}`)
                    // downloadFile(path, filePath)
                    return cb(path);
                })
                .catch((error) => {
                    console.log("🚀 ~ file: Database.js:81 ~ unzipDownloadFile ~ error:", error)
                    console.error(error)
                });
        }).catch((error) => {
            console.log("🚀 ~ file: Database.js:130 ~ .then ~ error:", error)

        })
}

export default database;