import * as React from 'react';
import Svg, {Ellipse, Defs, LinearGradient, Stop} from 'react-native-svg';

function EllispseSVGLeft({stopColor, startColor}) {
  return (
    <Svg
      width={26}
      height={29}
      viewBox="0 0 26 29"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      //   {...props}
    >
      <Ellipse
        cx={15}
        cy={14.5}
        rx={15}
        ry={14.5}
        transform="matrix(-1 0 0 1 26 0)"
        fill="url(#paint0_linear_109_2318)"
      />
      <Defs>
        <LinearGradient
          id="paint0_linear_109_2318"
          x1={25.2985}
          y1={26.8358}
          x2={0.835027}
          y2={2.20064}
          gradientUnits="userSpaceOnUse">
          <Stop stopColor={stopColor} />
          {/* <Stop stopColor="#FEDC8B" /> */}
          {/* <Stop offset={1} stopColor="#FFF3D6" /> */}
          <Stop offset={1} stopColor={startColor} />
        </LinearGradient>
      </Defs>
    </Svg>
  );
}

export default EllispseSVGLeft;
