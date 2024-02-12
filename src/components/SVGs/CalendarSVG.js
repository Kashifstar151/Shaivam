import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function CalendarSVG({ fill, ...props }) {
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
                d="M16.044 2v3.291M7.966 2v3.291"
                stroke={fill}
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path
                d="M20.4 8.22v9.127c0 1.38-.416 2.372-1.095 3.02-.684.653-1.712 1.033-3.076 1.033H7.771c-1.357 0-2.384-.385-3.07-1.05C4.02 19.69 3.6 18.678 3.6 17.272v-9.05c0-1.38.417-2.368 1.098-3.014.684-.651 1.713-1.029 3.073-1.029h8.467c1.366 0 2.393.378 3.075 1.028.678.646 1.091 1.633 1.087 3.013z"
                stroke={fill}
                strokeWidth={1.2}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path
                d="M4 9h16M16.442 13.31h.009M12.005 13.31h.009M7.558 13.31h.009M16.442 17.196h.009M12.005 17.196h.009M7.558 17.196h.009"
                stroke={fill}
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    );
}

export default CalendarSVG;
