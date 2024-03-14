import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function BackBtnSvg(props) {
    return (
        <Svg
            width={16}
            height={9}
            viewBox="0 0 16 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                d="M.5 4.378a.624.624 0 00.179.433l.003.007 3.75 3.75a.625.625 0 00.884-.884L2.634 5.001h12.241a.625.625 0 100-1.25H2.634l2.682-2.683a.625.625 0 00-.883-.884l-3.75 3.75-.004.007a.611.611 0 00-.13.196.609.609 0 00-.049.239v.002z"
                fill="#777"
            />
        </Svg>
    );
}

export default BackBtnSvg;
