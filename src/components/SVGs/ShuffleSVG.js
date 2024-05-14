import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function ShuffleSVG({ fill, ...props }) {
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
                d="M3.367 8.15A.683.683 0 012 8.15V7.125a2.733 2.733 0 012.733-2.733h14.204V2.683a.683.683 0 011.186-.462l2.197 2.392c.24.261.24.663 0 .924L20.123 7.93a.683.683 0 01-1.186-.462V5.758H4.733c-.754 0-1.366.612-1.366 1.367V8.15zm17.766 8.2a.683.683 0 111.367 0v1.025a2.733 2.733 0 01-2.733 2.733H5.563v1.709a.683.683 0 01-1.187.462L2.18 19.887a.683.683 0 010-.924l2.196-2.392a.683.683 0 011.187.462v1.709h14.204c.754 0 1.366-.612 1.366-1.367V16.35z"
                fill={fill}
            />
        </Svg>
    );
}

export default ShuffleSVG;
