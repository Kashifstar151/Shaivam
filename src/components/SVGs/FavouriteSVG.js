import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function FavouriteSVG({ fill, ...props }) {
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
                d="M12 19.838l-.3-.263c-6.825-5.55-8.662-7.5-8.662-10.687a4.73 4.73 0 014.725-4.725c2.175 0 3.412 1.237 4.237 2.175.825-.938 2.063-2.175 4.238-2.175a4.73 4.73 0 014.724 4.725c0 3.187-1.837 5.137-8.662 10.687l-.3.263zm-4.237-14.7a3.761 3.761 0 00-3.75 3.75c0 2.737 1.725 4.537 7.987 9.675 6.262-5.138 7.988-6.938 7.988-9.675a3.761 3.761 0 00-3.75-3.75c-1.875 0-2.888 1.125-3.675 2.025L12 7.8l-.563-.637c-.787-.9-1.8-2.025-3.674-2.025z"
                fill={fill}
                stroke={fill}
                strokeWidth={0.4}
            />
        </Svg>
    );
}

export default FavouriteSVG;
