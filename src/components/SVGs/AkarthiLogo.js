import * as React from 'react';
import Svg, { G, Path, Defs, ClipPath } from 'react-native-svg';

function AkarthiLogo({ fill, ...props }) {
    return (
        <Svg
            width={25}
            height={24}
            viewBox="0 0 25 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <G clipPath="url(#clip0_1411_1053)">
                <Path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3.497 3.405c-.46.461-.49.87-.49 6.943 0 4.792.081 6.552.313 6.837.188.23 1.165.513 2.438.707 2.56.389 4.488 1.067 5.532 1.945.632.532.847.596 1.183.352 1.94-1.408 3.002-1.804 6.203-2.314 1.118-.178 2.094-.476 2.272-.693.232-.283.313-2.04.313-6.834 0-6.047-.03-6.484-.484-6.937-1.15-1.15-6.127.406-7.748 2.423l-.802.997-1.296-1.28C9.49 4.128 7.564 3.27 5.31 3.047c-1.093-.108-1.41-.045-1.814.358zm.685.649c-.096.096-.174 2.968-.174 6.384v6.21h.687c1.083.004 4.722.942 5.819 1.502l.995.508v-1.006c0-.553-.114-1.005-.253-1.005-.436 0-1.991-1.11-1.994-1.423-.006-.578.516-.606 1.377-.074l.87.538v-1.083c0-1.004-.083-1.138-1.12-1.834-1.151-.77-1.502-1.625-.669-1.625.254 0 .665.225.914.5.698.77.875.61.875-.792 0-.71-.072-1.22-.16-1.132-.087.088-.49-.118-.894-.458s-.838-.618-.965-.618-.231-.225-.231-.5c0-.637.353-.632 1.408.02.914.565 1.053.359.49-.72-.547-1.047-1.643-1.965-3.148-2.637-1.439-.642-3.527-1.054-3.827-.755zm14.078.07c-2.798.579-5.5 2.735-5.5 4.388 0 .31.202.257.985-.262.955-.631 1.518-.641 1.512-.027-.004.36-1.588 1.423-2.12 1.423-.292 0-.378.315-.378 1.384 0 1.264.04 1.363.458 1.139a3.14 3.14 0 00.781-.634c.404-.486 1.262-.51 1.262-.035 0 .464-1.917 1.978-2.246 1.774-.161-.1-.255.355-.255 1.237v1.393l.986-.652c.954-.632 1.526-.642 1.504-.028-.012.352-1.617 1.423-2.132 1.423-.25 0-.358.3-.358 1.005v1.006l.938-.475c1.094-.554 4.841-1.536 5.861-1.536.669 0 .703-.056.703-1.154V14.34l-1.376.172c-1.268.158-1.375.133-1.375-.331 0-.403.22-.536 1.108-.669.609-.091 1.228-.091 1.375 0 .177.11.268-.282.268-1.162V11.02l-1.398.087c-1.25.078-1.39.038-1.311-.375.07-.367.357-.478 1.398-.538l1.31-.075v-1.3l.001-1.3-1.375.086c-1.089.068-1.376.008-1.376-.285 0-.474.533-.676 1.784-.676h.993l-.076-1.312c-.083-1.453-.255-1.559-1.95-1.208zM.807 6.196C.452 6.551.377 20.306.73 20.86c.273.43.865.442 3.779.072 1.678-.213 2.884-.23 4.107-.055 1.82.258 2.144.206 2.144-.346 0-.224-.61-.443-1.813-.648-1.636-.28-4.024-.162-7.062.347-.162.028-.275-2.332-.318-6.65l-.067-6.694.645-.245c.354-.134.574-.357.489-.495-.215-.348-1.462-.314-1.826.05zm20.954.075c0 .209.222.375.5.375.488 0 .5.167.5 6.71 0 3.69-.054 6.763-.12 6.829-.065.065-1.215-.047-2.556-.25-3.468-.526-7.332.058-6.42.97.174.173.836.172 2.073-.003 1.31-.186 2.457-.175 4.108.038 2.741.355 3.374.35 3.753-.028.198-.199.31-2.38.361-7.053.064-5.81.019-6.85-.318-7.364-.456-.696-1.881-.866-1.881-.224zm-17.457.813c.112.585 2.704.803 2.704.227 0-.464-.54-.665-1.789-.665-.815 0-.983.08-.915.438zm-.002 3.487c.067.355.368.467 1.417.527 1.17.067 1.32.022 1.246-.375-.068-.355-.369-.467-1.418-.527-1.17-.067-1.32-.022-1.245.375zm.042 3.212c-.197.514-.166.53 1.352.735 1.199.161 1.312.134 1.312-.316 0-.77-2.385-1.146-2.664-.419z"
                    fill={fill}
                />
            </G>
            <Defs>
                <ClipPath id="clip0_1411_1053">
                    <Path fill="#fff" transform="translate(.5)" d="M0 0H24V24H0z" />
                </ClipPath>
            </Defs>
        </Svg>
    );
}

export default AkarthiLogo;
