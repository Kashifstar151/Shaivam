// for location permission
import Geolocation from 'react-native-geolocation-service';
import { PERMISSIONS, check, request, RESULTS } from 'react-native-permissions';

export const locationPermission = async () => {
    try {
        const checkTheLocState = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
        if (checkTheLocState !== RESULTS.GRANTED) {
            const granted = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
            if (granted) {
                console.log('the access grandted ');
                return {
                    status: true,
                    msg: 'User granted the permission',
                };
            } else {
                console.log('the access not grandted ');
                return {
                    status: false,
                    msg: 'User denied permission',
                };
            }
        } else {
            return {
                status: true,
                msg: 'SUCCESS',
            };
        }
    } catch (err) {
        return {
            status: false,
            msg: err,
        };
    }
};

// for region change callback
export const onRegionChangeCompleteCallback = (args, clbk) => {
    clbk(args);
};

// get current location
export const getCurrentLocationWatcher = (setStateClbk) => {
    Geolocation.watchPosition((success) => {
        const { coords } = success;
        setStateClbk({
            latitude: coords.latitude,
            longitude: coords.longitude,
        });
    }),
        (error) => {
            // setStateClbk
            console.log('the error in fetching location=============> ', error);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 };
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
