import SQLite from 'react-native-sqlite-storage';
import { unzip } from 'react-native-zip-archive';
import * as RNFS from 'react-native-fs';
import RNFetchBlob from 'rn-fetch-blob';
import { PermissionsAndroid, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RESULTS } from 'react-native-permissions';
// const databaseName = 'main.db';
// const database = SQLite.openDatabase({ name: databaseName, });
const database = SQLite.openDatabase({ name: 'main.db' });
const offlineDatabase = SQLite.openDatabase({ name: 'SongsData.db', createFromLocation: '~SongsData.db', location: 'Library' });
export async function attachDb(metaData) {
    return new Promise((resolve, reject) => {
        RNFetchBlob.config({
            fileCache: true,
        })
            .fetch(
                'GET',
                metaData.FilePath
                // 'https://shaivamfiles.fra1.cdn.digitaloceanspaces.com/sqlitedump/thirumuraiSong_12.zip'
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
                            console.log(fileNames, "fileNames")
                            try {
                                database.transaction(
                                    async (tx) => {
                                        await tx.executeSql(
                                            'ATTACH DATABASE ? AS Updated_db',
                                            [
                                                `${jsonFilePath}/thirumuraiSong_${metaData.Version}.db`,
                                            ],
                                            async (tx, results) => {
                                                console.log("🚀 ~ results:", results)
                                                resolve(tx);

                                            }
                                        );
                                    },
                                    async (error) => {
                                        const data = await AsyncStorage.getItem('@database');
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
async function filePermissionProcess() {
    console.log(
        '🚀 ~ filePermissionProcess ~ filePermissionProcess:*********************************************************'
    );
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            // PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
            {
                title: 'File Permission',
                message: 'App needs access to your storage to read and write files.',
                buttonNeutral: 'Ask Me Later',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
            }
        );
        return { permissionType: granted, status: 'SUCCESS', error: null };
    } catch (err) {
        console.warn(err);
        return { permissionType: null, status: 'ERROR', error: err };
    }
}

async function requestFilePermissions() {
    let fileAccessRequest = { permissionType: null, status: null, error: null };
    if (
        (!(Platform.constants['Release'] >= 13) && Platform.OS === 'android') ||
        Platform.OS === 'ios'
    ) {
        fileAccessRequest = await filePermissionProcess();
    } else {
        fileAccessRequest = {
            permissionType: RESULTS.GRANTED,
            status: 'SUCCESS',
        };
    }
    if (
        fileAccessRequest?.status === 'SUCCESS' &&
        fileAccessRequest.permissionType === PermissionsAndroid.RESULTS.GRANTED
    ) {
        console.log('File permissions granted');
    } else {
        console.log('File permissions denied', fileAccessRequest);
    }
}

function unzipDownloadFile(target, cb) {

    const sourcePath = target;
    // console.log("🚀 ~ file: Database.js:72 ~ unzipDownloadFile ~ targetPath:", sourcePath)
    const targetPath = Platform.OS == 'ios' ? `${RNFS.DocumentDirectoryPath}/Thrimurai` : `${RNFS.ExternalDirectoryPath}/Thrimurai`;
    // const filePath = RNFS.DocumentDirectoryPath + '/myData.db';
    console.log("🚀 ~ unzipDownloadFile ~ targetPath:", targetPath)
    const charset = 'UTF-8';
    RNFS.mkdir(targetPath)
        .then(() => {
            console.log('Output directory created successfully');
            unzip(sourcePath, targetPath, charset)
                .then((path) => {
                    console.log(`unzip completed at ${path}`);
                    AsyncStorage.setItem('@database', JSON.stringify({ name: 'main.db' }));
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
    console.log('🚀 ~ file: Database.js:146 ~ getSqlData ~ query:', `${RNFS.DocumentDirectoryPath}/Thrimurai`);
    const data = await AsyncStorage.getItem('@database');
    console.log("🚀 ~ getSqlData ~ data:", data)
    const databasename = JSON.parse(data);
    // console.log('🚀 ~ file: Database.js:142 ~ getSqlData ~ data:', databasename);
    if (databasename?.name == 'songData.db' || databasename == null) {
        console.log('offline database')
        await offlineDatabase.transaction(
            (tx) => {
                tx.executeSql(query, [], (_, results) => {
                    console.log('🚀 ~ file: Database.js:149 ~ tx.executeSql ~ results:', results);
                    let arr = [];
                    if (results?.rows?.length > 0) {
                        for (let i = 0; i < results?.rows?.length; i++) {
                            const tableName = results.rows.item(i);
                            console.log(" offline Database data", tableName);
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
    } else {
        await database.transaction(
            (tx) => {
                tx.executeSql(query, [], (_, results) => {
                    console.log("🚀 ~ file: Database.js:149 ~ tx.executeSql ~ results:", results)
                    let arr = [];
                    if (results?.rows?.length > 0) {
                        for (let i = 0; i < results?.rows?.length; i++) {
                            const tableName = results.rows.item(i);
                            console.log(" offline Database data", tableName);
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
    }
}

export default database;
