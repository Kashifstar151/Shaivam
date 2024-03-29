import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function KalaPujaSVG({ fill, ...props }) {
    return (
        <Svg
            width={26}
            height={26}
            viewBox="0 0 26 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                d="M14.817 24.842h9.444a.438.438 0 00.448-.425.438.438 0 00-.448-.425h-6.38l-3.027.816a1.529 1.529 0 01-.037.034zm-6.697-.85H1.74a.438.438 0 00-.448.425c0 .234.202.425.448.425h9.444a1.529 1.529 0 01-.037-.034l-3.027-.816zm-6.063-3.93h.015c.423-.005.845-.036 1.264-.091a2.044 2.044 0 011.567-.724c.184 0 .368.024.546.073l.26.07c1.128-.411 1.809-.864 1.86-.898.15-.101.27-.238.347-.398a.961.961 0 00.093-.509c-.083-.89.558-3.145 1.163-4.926.494 1.155.938 2.488.856 3.406-.144 1.603-1.014 2.242-1.219 3.743-.03.104-.053.236-.068.399l4.26 1.148 4.258-1.148a2.208 2.208 0 00-.068-.398c-.204-1.502-1.075-2.141-1.218-3.744-.082-.918.362-2.25.855-3.406.605 1.782 1.246 4.036 1.164 4.926a.962.962 0 00.093.51c.077.159.197.296.347.397.05.034.732.487 1.86.897l.26-.07c.177-.048.361-.072.546-.072.622 0 1.194.278 1.566.724.42.055.841.086 1.265.092h.015c.278-.001.545-.106.742-.293a.98.98 0 00.31-.705.979.979 0 00-.3-.709 1.084 1.084 0 00-.738-.302 8.964 8.964 0 01-3.86-.953c-.153-2.144-1.542-5.883-1.717-6.346a1.004 1.004 0 00-.376-.476v-.002S16.25 9.064 13 9.064c-3.248 0-5.005 1.213-5.005 1.213v.002a1.005 1.005 0 00-.375.476c-.175.463-1.566 4.205-1.717 6.35a8.872 8.872 0 01-3.86.949c-.281.001-.549.109-.746.299a.98.98 0 00-.304.712.981.981 0 00.314.709c.2.187.47.29.75.289z"
                stroke={fill}
                strokeWidth={0.6}
            />
            <Path
                d="M10.621 23.973a1.8 1.8 0 01.178-1.446c.128-.218.3-.41.505-.565.206-.155.443-.27.696-.337l.314-.085-6.967-1.879c-.865-.233-1.763.244-2.008 1.065-.246.822.256 1.676 1.12 1.91l6.319 1.703a1.83 1.83 0 01-.157-.366z"
                stroke={fill}
                strokeWidth={0.6}
            />
            <Path
                d="M20.652 19.662l-8.55 2.305c-.864.233-1.366 1.088-1.121 1.909.203.68.855 1.124 1.563 1.124.147 0 .296-.019.445-.059l8.55-2.306c.864-.233 1.366-1.087 1.121-1.909-.245-.82-1.143-1.297-2.008-1.064zM16.496 4.949C15.945 4.616 14.576 3.9 13 3.9s-2.943.714-3.495 1.049c-.004.41.073.819.226 1.203.684 1.716 2.702 2.58 4.508 1.93 1.406-.506 2.269-1.781 2.258-3.132z"
                stroke={fill}
                strokeWidth={0.6}
            />
            <Path
                d="M9.33 4.63c.605-.365 2.01-1.087 3.67-1.087 1.659 0 3.064.722 3.669 1.086a4.348 4.348 0 00-.156-.846c-.418-.24-1.436-.756-2.563-.815 0 0 1.26-.212 2.332.196C15.716 1.944 14.575 1 13 1c-2.17 0-3.518 1.79-3.67 3.63z"
                stroke={fill}
                strokeWidth={0.6}
            />
        </Svg>
    );
}

export default KalaPujaSVG;