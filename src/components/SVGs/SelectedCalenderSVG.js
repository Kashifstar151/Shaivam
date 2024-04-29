import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function SelectedCalenderSVG({ fill, ...props }) {
    return (
        <Svg
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                d="M16.047 2v3.291M7.969 2v3.291"
                stroke="#fff"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path
                d="M16.238 3.58H7.771C4.834 3.58 3 5.214 3 8.221v9.05C3 20.326 4.834 22 7.771 22h8.458C19.175 22 21 20.355 21 17.348V8.222c.01-3.007-1.816-4.643-4.762-4.643z"
                fill="#fff"
                stroke="#fff"
                strokeWidth={1.2}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path
                d="M3.094 9.404h17.824M16.445 13.31h.01M12.008 13.31h.009M7.555 13.31h.009M16.445 17.196h.01M12.008 17.196h.009M7.555 17.196h.009"
                stroke={fill}
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    );
}

export default SelectedCalenderSVG;
