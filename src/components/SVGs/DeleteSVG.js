import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function DeleteSVG({ fill, viewBox = '0 0 24 24', width = 24, height = 24, ...props }) {
    return (
        <Svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M7 8V14M11 8V14M15 4V16C15 17.1046 14.1046 18 13 18H5C3.89543 18 3 17.1046 3 16V4M1 4H17M12 4V3C12 1.89543 11.1046 1 10 1H8C6.89543 1 6 1.89543 6 3V4" stroke={fill} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </Svg>
    );
}

export default DeleteSVG;
