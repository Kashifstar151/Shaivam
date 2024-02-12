import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function MusiclistSVG({ fill, ...props }) {
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
                d="M20 6v9.6a2.8 2.8 0 11-2.8-2.8c.416.002.826.098 1.2.28V6A.8.8 0 0120 6zm-4 .4H4.8a.8.8 0 010-1.6H16a.8.8 0 110 1.6zm-1.6 4H4.8a.8.8 0 110-1.6h9.6a.8.8 0 110 1.6zm-2.4 4H4.8a.8.8 0 110-1.6H12a.8.8 0 110 1.6zm0 4H4.8a.8.8 0 110-1.6H12a.8.8 0 110 1.6z"
                fill={fill}
            />
        </Svg>
    );
}

export default MusiclistSVG;
