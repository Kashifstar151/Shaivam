import * as React from 'react';
import Svg, {Ellipse, Defs, LinearGradient, Stop} from 'react-native-svg';

function EllipseSVGRight({stopColor, startColor}) {
  return (
    <Svg
      width={42}
      height={28}
      viewBox="0 0 42 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      //   {...props}
    >
      <Ellipse
        cx={22}
        cy={7}
        rx={22}
        ry={21}
        fill="url(#paint0_linear_109_2317)"
      />
      <Defs>
        <LinearGradient
          id="paint0_linear_109_2317"
          x1={37.1045}
          y1={24.8657}
          x2={1.68056}
          y2={-11.2599}
          gradientUnits="userSpaceOnUse">
          <Stop stopColor={stopColor} />
          {/* <Stop stopColor="#FFD87A" /> */}
          <Stop offset={1} stopColor={startColor} />
          {/* <Stop offset={1} stopColor="#FFE9B4" /> */}
        </LinearGradient>
      </Defs>
    </Svg>
  );
}

export default EllipseSVGRight;
