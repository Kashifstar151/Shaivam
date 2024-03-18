import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function ErrorSpotSVG({ fill, ...props }) {
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
                d="M9.436 1.885a1.605 1.605 0 00-2.87 0L1.17 12.675A1.605 1.605 0 002.606 15h10.79a1.606 1.606 0 001.435-2.325L9.436 1.885zm4.5 11.83a.6.6 0 01-.5.285H2.606a.599.599 0 01-.54-.875L7.46 2.335a.605.605 0 011.08 0l5.395 10.79a.606.606 0 01-.025.59h.025z"
                fill={fill}
            />
            <Path
                d="M8 5.5a.5.5 0 00-.5.5v4a.5.5 0 001 0V6a.5.5 0 00-.5-.5zm0 6a.5.5 0 100 1 .5.5 0 000-1z"
                fill={fill}
            />
        </Svg>
    );
}

export default ErrorSpotSVG;
