import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function PannSVG({ fill, ...props }) {
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
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.625 5.595c0 .804-.02.876-.237.82-.296-.078-.852.274-.957.605-.121.383.273.73.828.73.824 0 .866-.05.866-1.063 0-.97.06-1.062.69-1.062.162 0 .33-.056.372-.125.043-.069.243-.125.445-.125.203 0 .368-.05.368-.11 0-.252-.385-.385-1.35-.466l-1.025-.085v.881zM16 4.84c-.385.047-1.132.746-6.219 5.823L4 16.432l.002.627c.002.737.045.811.623 1.088 1.647.789 2.472 1.024 3.625 1.033 1.214.009 1.739-.18 2.54-.916.914-.84 1.139-1.321 1.143-2.451.003-.928-.027-1.045-.408-1.61-.456-.674-.485-.534.287-1.398.138-.154.729-.845 1.313-1.534.584-.69 1.096-1.258 1.137-1.263.042-.004.049.406.016.912l-.059.919.454.346c.667.509 1.438.565 2.065.15.864-.572 1.087-1.375.638-2.304-.367-.759-.617-.888-1.57-.812-.443.036-.806.028-.806-.017 0-.199 1.095-1.246 1.54-1.473.583-.297.955-.233 1.394.24.37.4.427 1.163.13 1.735-.202.386-.249.796-.092.796.053 0 .538-.445 1.079-.988 1.136-1.143 1.13-1.101.309-2.558-.986-1.748-1.862-2.3-3.36-2.115zm-.094.734c-.223.098-.406.212-.406.253 0 .042.098.033.219-.018.12-.052.472-.167.781-.255.476-.137.505-.16.188-.16a2.385 2.385 0 00-.782.18zm.031.908c-.274.192-2.892 2.743-5.817 5.67l-5.317 5.32.38.193c2.798 1.418 4.531 1.243 5.76-.58.7-1.04.582-2.006-.37-3.051l-.37-.405.305-.34c.168-.186.36-.404.43-.484.068-.08.321-.364.562-.633.46-.513.868-.981 2-2.293.378-.438.82-.941.984-1.118.163-.178.442-.512.62-.744.539-.701 1.159-1.016 2-1.016.667 0 .773.039 1.178.433.245.238.483.603.53.812.07.324.116.36.32.252.23-.124.229-.142-.038-.656-.15-.29-.54-.796-.866-1.122-.543-.546-.64-.594-1.19-.59-.45.003-.726.091-1.1.352zm-8.78.347C7.042 6.878 7 7.335 7 8.493v1.597l-.507-.135c-.618-.165-1.048.029-1.4.631-.192.33-.205.439-.074.647.194.312.48.391 1.356.378 1.356-.021 1.303.047 1.375-1.791l.063-1.607.562-.153c.31-.084.889-.22 1.288-.304 1.129-.236.865-.465-.867-.752l-1.108-.183c-.207-.033-.446-.03-.532.007zm8.718 3.047c-.103.067-.335.122-.516.123-.267.002-.342.075-.406.393-.151.755-.09 1.081.251 1.35.46.36.931.33 1.332-.088.467-.488.51-1.167.106-1.634-.254-.292-.474-.333-.767-.144zm-10.1.775c-.276.276-.155.35.569.347l.718-.002-.312-.245c-.356-.279-.755-.32-.975-.1z"
                fill={fill}
            />
        </Svg>
    );
}

export default PannSVG;
