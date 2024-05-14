// for location permission
import Geolocation from 'react-native-geolocation-service';
import { check, request, RESULTS } from 'react-native-permissions';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const setTheLocationPermissionToStorage = async (value) => {
    await AsyncStorage.setItem('LOC_PERM', value);
};

export const getTheLocationPermissionToStorage = async () => {
    return AsyncStorage.getItem('LOC_PERM');
};

export const requestThePermission = async (accessType) => {
    try {
        const granted = await request(accessType);
        setTheLocationPermissionToStorage(granted);
        switch (granted) {
            case RESULTS.GRANTED:
                return {
                    status: true,
                    msg: 'User granted the permission',
                    permissionType: RESULTS.GRANTED,
                };
            case RESULTS.BLOCKED:
                return {
                    status: false,
                    msg: 'User have blocked the permission',
                    permissionType: RESULTS.BLOCKED,
                };
            case RESULTS.DENIED:
                return {
                    status: false,
                    msg: 'User have denied the permission',
                    permissionType: RESULTS.DENIED,
                };
            case RESULTS.LIMITED:
                return {
                    status: true,
                    msg: 'Limited Permission',
                    permissionType: RESULTS.LIMITED,
                };
        }
    } catch (err) {
        return {
            status: false,
            msg: err,
            permissionType: RESULTS.UNAVAILABLE,
        };
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
    )
        .then((res) => res.json())
        .then((response) => {
            return { data: response, status: 'SUCCESS' };
        })
        .catch((err) => {
            return { status: 'FAILED', err };
        });
    // console.log("the location info  data ==>", data)
    return data;
};
