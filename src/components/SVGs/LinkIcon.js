import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
function LinkIcon({ fill, ...props }) {
    return (
        <Svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg"
            {...props}>
            <Path
                d="M13.4538 8.23984C13.4538 9.00467 13.4538 9.7695 13.4538 10.5343C13.4538 10.7767 13.4538 11.019 13.4538 11.2614C13.4538 11.428 13.4563 11.5936 13.4355 11.7594C13.4446 11.6916 13.4537 11.6237 13.4629 11.5559C13.4372 11.7447 13.388 11.9282 13.3155 12.1044C13.3412 12.0435 13.367 11.9825 13.3927 11.9215C13.3201 12.093 13.2271 12.2536 13.1147 12.4019C13.1546 12.3503 13.1945 12.2986 13.2344 12.247C13.1171 12.3987 12.9819 12.5339 12.8302 12.6512C12.8818 12.6113 12.9335 12.5714 12.9851 12.5315C12.8368 12.6439 12.6762 12.7369 12.5047 12.8095C12.5657 12.7837 12.6267 12.758 12.6876 12.7323C12.5114 12.8048 12.3279 12.854 12.1391 12.8797C12.207 12.8705 12.2748 12.8614 12.3427 12.8523C12.1417 12.8775 11.9378 12.8706 11.7356 12.8706C11.3987 12.8706 11.0619 12.8706 10.725 12.8706C9.73509 12.8706 8.74516 12.8706 7.75522 12.8706C6.97297 12.8706 6.1907 12.8706 5.40845 12.8706C5.22823 12.8706 5.04823 12.8748 4.86895 12.8523C4.9368 12.8614 5.00464 12.8705 5.07248 12.8797C4.88366 12.854 4.70019 12.8048 4.52398 12.7323C4.58494 12.758 4.64591 12.7837 4.70687 12.8095C4.53544 12.7369 4.37481 12.6439 4.22647 12.5315C4.27813 12.5714 4.32977 12.6113 4.38142 12.6512C4.22972 12.5339 4.09447 12.3987 3.97719 12.247C4.01709 12.2986 4.057 12.3503 4.09691 12.4019C3.98447 12.2536 3.89145 12.093 3.81894 11.9215C3.84466 11.9825 3.87039 12.0435 3.89611 12.1044C3.82358 11.9282 3.77436 11.7447 3.74875 11.5559C3.75786 11.6238 3.76698 11.6916 3.77609 11.7594C3.75086 11.5585 3.7578 11.3545 3.7578 11.1524C3.7578 10.8155 3.7578 10.4787 3.7578 10.1418C3.7578 9.15189 3.7578 8.16194 3.7578 7.172C3.7578 6.38975 3.7578 5.60748 3.7578 4.82522C3.7578 4.64501 3.75358 4.465 3.77609 4.28572C3.76698 4.35356 3.75786 4.4214 3.74875 4.48925C3.77436 4.30044 3.82358 4.11695 3.89611 3.94075C3.87039 4.00172 3.84466 4.06267 3.81894 4.12364C3.89145 3.9522 3.98447 3.79158 4.09691 3.64325C4.057 3.6949 4.01711 3.74655 3.97719 3.7982C4.09447 3.6465 4.22972 3.51125 4.38142 3.39397C4.32977 3.43387 4.27813 3.47378 4.22647 3.51369C4.37481 3.40123 4.53542 3.30822 4.70687 3.2357C4.64591 3.26142 4.58494 3.28715 4.52398 3.31287C4.7002 3.24034 4.88367 3.19112 5.07248 3.16551C5.00464 3.17462 4.9368 3.18375 4.86895 3.19286C5.16473 3.15573 5.47225 3.17456 5.76955 3.17456C6.2647 3.17456 6.75986 3.17456 7.25502 3.17456C7.63286 3.17456 8.0107 3.17456 8.38855 3.17456C8.80591 3.17456 9.15417 2.8263 9.15417 2.40894C9.15417 1.99158 8.80591 1.64331 8.38855 1.64331C7.62372 1.64331 6.85889 1.64331 6.09406 1.64331C5.78375 1.64331 5.47345 1.64331 5.16314 1.64331C4.35847 1.64331 3.55892 1.97923 3.01256 2.57398C2.50739 3.1239 2.22656 3.84105 2.22656 4.58831C2.22656 4.78311 2.22656 4.9779 2.22656 5.17269C2.22656 6.06544 2.22656 6.95817 2.22656 7.85092C2.22656 8.7852 2.22656 9.71948 2.22656 10.6538C2.22656 10.9005 2.22656 11.1472 2.22656 11.3939C2.22656 11.9492 2.35159 12.4901 2.63636 12.971C2.87198 13.3688 3.20314 13.6952 3.58762 13.9484C3.78045 14.0754 3.99827 14.1675 4.21394 14.2466C4.43894 14.3291 4.67456 14.3613 4.9117 14.3887C5.1023 14.4107 5.29873 14.4018 5.49036 14.4018C6.30638 14.4018 7.12239 14.4018 7.93841 14.4018C8.91678 14.4018 9.89517 14.4018 10.8736 14.4018C11.1877 14.4018 11.5017 14.4018 11.8158 14.4018C12.1398 14.4018 12.4575 14.3893 12.7765 14.3132C13.233 14.2045 13.6362 13.9676 13.9928 13.6698C14.1704 13.5214 14.31 13.3422 14.4493 13.1584C14.5531 13.0214 14.6384 12.871 14.7067 12.7135C14.8015 12.4955 14.8853 12.2821 14.9266 12.0477C14.96 11.8586 14.985 11.6648 14.985 11.4722C14.985 11.3784 14.985 11.2845 14.985 11.1907C14.985 10.2934 14.985 9.39605 14.985 8.49872C14.985 8.41242 14.985 8.32611 14.985 8.23981C14.985 7.82245 14.6368 7.47419 14.2194 7.47419C13.802 7.47419 13.4538 7.82248 13.4538 8.23984Z"
                fill={fill} />
            <Path
                d="M11.0781 3.17456C11.8492 3.17456 12.6202 3.17456 13.3912 3.17456C13.6652 3.17456 13.9392 3.17456 14.2133 3.17456C14.6306 3.17456 14.9789 2.82629 14.9789 2.40894C14.9789 1.99158 14.6306 1.64331 14.2133 1.64331C13.4422 1.64331 12.6712 1.64331 11.9002 1.64331C11.6262 1.64331 11.3522 1.64331 11.0781 1.64331C10.6608 1.64331 10.3125 1.99158 10.3125 2.40894C10.3125 2.82629 10.6608 3.17456 11.0781 3.17456Z"
                fill={fill} />
            <Path
                d="M14.9844 5.54409C14.9844 4.77308 14.9844 4.00206 14.9844 3.23103C14.9844 2.957 14.9844 2.68297 14.9844 2.40894C14.9844 1.99158 14.6361 1.64331 14.2188 1.64331C13.8014 1.64331 13.4531 1.99158 13.4531 2.40894C13.4531 3.17995 13.4531 3.95097 13.4531 4.722C13.4531 4.99603 13.4531 5.27006 13.4531 5.54409C13.4531 5.96145 13.8014 6.30972 14.2188 6.30972C14.6361 6.30972 14.9844 5.96145 14.9844 5.54409Z"
                fill={fill} />
            <Path
                d="M9.15555 8.55254C9.47471 8.23339 9.79385 7.91424 10.113 7.59509C10.7993 6.90884 11.4855 6.22257 12.1718 5.53631C12.8184 4.8897 13.465 4.2431 14.1116 3.59651C14.327 3.38112 14.5424 3.16575 14.7578 2.95035C15.0527 2.65539 15.0527 2.16257 14.7578 1.86759C14.4628 1.57262 13.97 1.57262 13.675 1.86759C13.3558 2.18675 13.0367 2.50589 12.7176 2.82504C12.0313 3.51129 11.345 4.19756 10.6588 4.88382C10.0121 5.53043 9.36554 6.17703 8.71895 6.82362C8.50357 7.03901 8.28818 7.25438 8.07279 7.46978C7.77782 7.76474 7.77782 8.25757 8.07279 8.55254C8.36776 8.84751 8.86059 8.84751 9.15555 8.55254Z"
                fill={fill} />
        </Svg>
    );
}
export default LinkIcon;