// for location permission
import Geolocation from 'react-native-geolocation-service';
import { PERMISSIONS, check, request, RESULTS } from 'react-native-permissions';
import { Platform } from 'react-native';

export const locationPermission = async () => {
    console.log('Platform.OS', Platform.OS);
    if (Platform.OS == 'ios') {
        console.log('PERMISSIONS.IOS.LOCATION_ALWAYS', PERMISSIONS.IOS.LOCATION_ALWAYS);
        const granted = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
        // console.log('🚀 ~ locationPermission ~ checkTheLocState:', granted);
        check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
            .then((result) => {
                switch (result) {
                    case RESULTS.UNAVAILABLE:
                        console.log(
                            'This feature is not available (on this device / in this context)'
                        );
                        return {
                            status: false,
                            msg: 'permission not available',
                            permissionType: RESULTS.UNAVAILABLE,
                        };

                    case RESULTS.DENIED:
                        console.log(
                            'The permission has not been requested / is denied but requestable',
                            result
                        );
                        return {
                            status: false,
                            msg: 'user denied the permission',
                            permissionType: RESULTS.DENIED,
                        };

                    case RESULTS.LIMITED:
                        console.log('The permission is limited: some actions are possible');
                        return {
                            status: true,
                            msg: 'limited access for requested permission',
                            permissionType: RESULTS.LIMITED,
                        };

                    case RESULTS.GRANTED:
                        console.log('The permission is granted');
                        return {
                            status: true,
                            msg: 'permission granted ',
                            permissionType: RESULTS.GRANTED,
                        };

                    case RESULTS.BLOCKED:
                        console.log('The permission is denied and not requestable anymore');
                        return {
                            status: false,
                            msg: 'permission request blocked ',
                            permissionType: RESULTS.BLOCKED,
                        };
                }
            })
            .catch((error) => {
                return {
                    status: false,
                    msg: `failed with ${error}`,
                    permissionType: RESULTS.UNAVAILABLE,
                };
            });
    } else {
        try {
            const checkTheLocState = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
            if (checkTheLocState !== RESULTS.GRANTED) {
                const granted = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
                if (granted === RESULTS.GRANTED) {
                    console.log('the access grandted ');
                    return {
                        status: true,
                        msg: 'User granted the permission',
                        permissionType: granted,
                    };
                } else {
                    console.log('the access not grandted ');

                    return {
                        status: false,
                        msg: 'User denied permission',
                        permissionType: granted,
                    };
                }
            } else {
                return {
                    status: true,
                    msg: 'SUCCESS',
                    permissionType: RESULTS.GRANTED,
                };
            }
        } catch (err) {
            return {
                status: false,
                msg: err,
            };
        }
    }
};

export const checkPermissionAccess = async (accessType) => {
    return check(accessType);
};

// for region change callback
export const onRegionChangeCompleteCallback = (args, clbk) => {
    // console.log('🚀 ~ onRegionChangeCompleteCallback ~ args:', args);
    clbk(args);
};

// get current location
export const getCurrentLocationWatcher = (setStateClbk) => {
    Geolocation.watchPosition(
        (success) => {
            const { coords } = success;
            // console.log('🚀 ~ getCurrentLocationWatcher ~ coords:', coords);
            setStateClbk({
                latitude: coords.latitude,
                longitude: coords.longitude,
            });
        },
        (error) => {
            // setStateClbk
            console.log('the error in fetching location=============> ', error);
        },
        {
            enableHighAccuracy: true,
            timeout: 15000,
            interval: 1000,
            distanceFilter: 5,
            showLocationDialog: true,
            fastestInterval: 1000,
        }
    );
};

export const getCurrentLocation = (setStateClbk) => {
    Geolocation.getCurrentPosition(
        (success) => {
            const { coords } = success;
            // console.log('🚀 ~ getCurrentLocationWatcher ~ coords:', coords);
            setStateClbk({
                latitude: coords.latitude,
                longitude: coords.longitude,
            });
        },
        (error) => {
            // setStateClbk
            console.log('the error in fetching location=============> ', error);
        },
        {
            enableHighAccuracy: true,
            timeout: 15000,
            interval: 1000,
            distanceFilter: 5,
            showLocationDialog: true,
            fastestInterval: 1000,
        }
    );
};

export const clearGetCurrentLocationWatcher = () => {
    Geolocation.clearWatch();
};

// get the location name
export const getTheLocationName = async (coords) => {
    /*
    nominatim--> https://nominatim.openstreetmap.org/reverse?lat=<value>&lon=<value>
    google ----> https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}
 
    NOTE ==>
    coords data type ==>
    {
        latitude:****,
        longitude:*****
    }
 
    */

    const data = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${coords.latitude}&lon=${coords.longitude}`,
        {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
        }
    ).then((res) => res.json());
    // console.log("the location info  data ==>", data)
    return data;
};
