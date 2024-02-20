import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function AcknowledgementSVG({ fill, props }) {
    return (
        <Svg
            width={22}
            height={24}
            viewBox="0 0 22 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.937 8.154a.644.644 0 00-.644-.644h-3.04A2.253 2.253 0 000 9.764v10.192a2.253 2.253 0 002.253 2.253h3.04a.644.644 0 00.644-.643V8.153zm-1.288.644v12.124H2.253a.966.966 0 01-.966-.966V9.764c0-.534.433-.966.966-.966h2.396z"
                fill={fill}
            />
            <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M21.982 10.036a2.256 2.256 0 00-.548-1.766 2.256 2.256 0 00-1.689-.76h-6.05l1.514-4.544A2.25 2.25 0 0013.072 0H11.16c-.753 0-1.457.377-1.875 1.003L4.757 7.797a.643.643 0 00-.109.357v13.41c0 .329.247.604.573.64 0 0 7.022.784 11.273 1.257a3.862 3.862 0 004.26-3.37l1.228-10.055zm-1.277-.156l-1.228 10.055a2.574 2.574 0 01-2.84 2.247L5.935 20.989V8.349l4.42-6.632a.965.965 0 01.804-.43h1.912a.967.967 0 01.916 1.271L12.192 7.95a.642.642 0 00.61.847h6.944a.966.966 0 01.96 1.083z"
                fill={fill}
            />
        </Svg>
    );
}

export default AcknowledgementSVG;
