import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function CameraSVG({ fill, ...props }) {
    return (
        <Svg
            width={16}
            height={16}
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                d="M8 5a3.5 3.5 0 100 7 3.5 3.5 0 000-7zm0 6a2.5 2.5 0 110-5 2.5 2.5 0 010 5zM12.5 7a.5.5 0 100-1 .5.5 0 000 1z"
                fill={fill}
            />
            <Path
                d="M12.5 4h-.38a.5.5 0 01-.45-.275l-.17-.345A2.5 2.5 0 009.265 2h-2.53A2.5 2.5 0 004.5 3.38l-.17.345A.5.5 0 013.88 4H3.5A2.5 2.5 0 001 6.5v5A2.5 2.5 0 003.5 14h9a2.5 2.5 0 002.5-2.5v-5A2.5 2.5 0 0012.5 4zm1.5 7.5a1.5 1.5 0 01-1.5 1.5h-9A1.5 1.5 0 012 11.5v-5A1.5 1.5 0 013.5 5h.38a1.5 1.5 0 001.345-.83l.17-.34A1.5 1.5 0 016.735 3h2.53a1.5 1.5 0 011.34.83l.17.34A1.5 1.5 0 0012.12 5h.38A1.5 1.5 0 0114 6.5v5z"
                fill={fill}
            />
        </Svg>
    );
}

export default CameraSVG;
