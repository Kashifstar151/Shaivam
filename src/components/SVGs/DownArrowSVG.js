import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function DownArrowSVG({ fill, ...props }) {
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
                d="M19.132 7.842l-7.129 7.128-7.128-7.128a.589.589 0 00-.808 0 .589.589 0 000 .808l7.532 7.508a.557.557 0 00.404.167.556.556 0 00.404-.167l7.533-7.532a.589.589 0 000-.808.567.567 0 00-.808.024z"
                fill={fill}
                stroke="#777"
            />
        </Svg>
    );
}

export default DownArrowSVG;
