import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function LocationSVG({ fill, ...props }) {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            {...props}
        >
            <Path
                d="M12.112 2.001A8 8 0 004 9.89c0 5.448 7.364 11.728 7.678 11.993a.496.496 0 00.644 0C12.636 21.617 20 15.337 20 9.889A8 8 0 0012.112 2zM12 20.834c-1.416-1.271-7-6.567-7-10.945A6.953 6.953 0 0112 3a6.953 6.953 0 017 6.889c0 4.374-5.585 9.672-7 10.945zM12 7a3 3 0 100 6 3 3 0 000-6zm0 5a2 2 0 110-4 2 2 0 010 4z"
                // fill="#777"
                fill={fill}
            />
        </Svg>
    );
}

export default LocationSVG;
