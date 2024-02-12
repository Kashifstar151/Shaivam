import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function TempleSVG({ fill, ...props }) {
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
                d="M9.5 4.857h4m-4 0V2m0 2.857l-1.2 3.81m5.2-3.81V2m0 2.857l1.2 3.81m-6.4 0h6.4m-6.4 0l-1.2 3.81m7.6-3.81l1.2 3.81m-8.8 0l-.49 1.554a.5.5 0 01-.477.35H3.5a.5.5 0 00-.5.5V21.5a.5.5 0 00.5.5h5a.5.5 0 00.5-.5v-4.714a.5.5 0 01.5-.5h4a.5.5 0 01.5.5V21.5a.5.5 0 00.5.5h5a.5.5 0 00.5-.5v-6.619a.5.5 0 00-.5-.5h-2.633a.5.5 0 01-.477-.35l-.49-1.555m-8.8 0h8.8"
                stroke={fill}
                strokeWidth={1.2}
            />
        </Svg>
    );
}

export default TempleSVG;
