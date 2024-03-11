//  this will return a obj which will contain the width and height of he screen along with the orientation

import { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';

const getDimension = () => {
    const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width);
    const [screenHeight, setScreenheight] = useState(Dimensions.get('window').height);
    const [orientation, setOrientation] = useState('PORTRAIT');
    useEffect(() => {
        Dimensions.addEventListener('change', ({ window: { width, height } }) => {
            if (width < height) {
                setOrientation('PORTRAIT');
            } else {
                setOrientation('LANDSCAPE');
            }
        });
        const updateItemWidth = () => {
            setScreenWidth(Dimensions.get('window').width);
            setScreenheight(Dimensions.get('window').height);
        };
        const subscription = Dimensions.addEventListener('change', updateItemWidth);
        return () => {
            subscription?.remove();
        };
    }, []);
    return {
        screenWidth,
        screenHeight,
        orientation,
    };
};

export default getDimension;
