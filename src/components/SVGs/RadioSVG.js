import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function RadioSVG({ fill, ...props }) {
    return (
        <Svg
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path d="M12 12v8.8" stroke={fill} strokeMiterlimit={10} strokeLinecap="round" />
            <Path
                d="M12 12a1.6 1.6 0 100-3.2 1.6 1.6 0 000 3.2z"
                stroke={fill}
                strokeMiterlimit={10}
            />
            <Path
                d="M15.392 7.008a4.8 4.8 0 010 6.784m-6.784 0a4.8 4.8 0 010-6.784m-2.264 9.048a8 8 0 010-11.312m11.312 0a8 8 0 010 11.312"
                stroke={fill}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    );
}

export default RadioSVG;
