import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function NaduSVG({ fill, ...props }) {
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
                d="M16.801 4.173c-.124.325-.888.639-1.108.456-.218-.18-.624-.123-.646.091-.008.085-.023.211-.031.28-.009.069-.125.125-.258.125-.134 0-.274.05-.311.11-.093.15-.697.257-.697.123 0-.06-.132-.108-.293-.108-.306 0-.707.346-.707.611 0 .085-.097.283-.216.441-.215.285-.218.285-.629.055a2.385 2.385 0 00-.815-.263c-.33-.026-.41.017-.441.242a.354.354 0 01-.313.313c-.22.031-.28.134-.313.538-.022.275-.092.554-.156.62-.212.215-.122.443.175.443.16 0 .325.034.366.075.155.154-.07.425-.352.425-.162 0-.347.095-.412.212-.082.147-.306.221-.725.24l-.763.038c-.085.005-.156.1-.156.212 0 .174-.11.19-.784.118-.431-.046-.881-.047-1-.001-.339.13-.253.478.164.663.287.127.361.225.304.405-.063.2-.012.238.318.238.369 0 .388.022.313.363-.063.287-.022.403.199.557.24.168.274.295.251.93-.034.944.186 1.192.764.86l.378-.217-.057 1.083c-.05.972-.033 1.09.172 1.143.297.078.287.212-.075.99-.165.355-.266.68-.224.722.163.163.11 1.391-.074 1.714-.164.288-.166.356-.01.511.544.544 1.022.586 1.834.16.889-.467.969-.565 1.145-1.4.175-.833.54-1.288 1.04-1.295a1.5 1.5 0 00.592-.183c.172-.099.524-.181.781-.184.548-.005.596-.142.15-.434-.379-.249-.339-.5.205-1.278.2-.286.364-.63.364-.766 0-.385.309-.548.969-.513.334.018.674-.01.757-.06.23-.143.19-1.45-.053-1.719-.186-.205-.185-.24.004-.428.21-.21.19-.723-.053-1.431-.136-.394-.097-1.109.067-1.225.068-.048.236-.313.373-.588.137-.275.281-.528.321-.562.22-.19.51-1.026.576-1.658.042-.399.124-.755.183-.79.17-.107.123-.679-.074-.875-.29-.29-.926-.37-1.019-.13zm-.148 1.172c-.371.288-.44.302-.727.148-.206-.11-.347-.125-.403-.043-.047.07-.3.256-.562.416-.372.225-.598.276-1.025.228-.52-.059-.552-.044-.627.295-.112.512-.613.861-1.232.86-.283-.002-.596-.054-.695-.117-.243-.154-.632.064-.632.353 0 .124.113.328.25.452.138.125.25.35.25.5 0 .287-.38.813-.586.813-.065 0-.3.162-.522.36-.37.331-1.267.607-1.501.462-.052-.032-.196.112-.319.321l-.224.38.389.4c.232.24.344.45.278.52-.06.066-.147.33-.193.588-.08.45-.07.469.27.469.603 0 .846.423.807 1.409-.025.666.008.861.16.92.253.096.249.768-.009 1.283-.244.489-.314 2.535-.094 2.74.103.096.304.032.719-.232.547-.346.575-.393.575-.936 0-.479.068-.641.417-1 .242-.25.682-.516 1.05-.634.512-.166.646-.268.7-.536.036-.182.294-.723.574-1.201.28-.48.51-.964.51-1.078 0-.31.551-.61 1.12-.61.58 0 .615-.108.31-.982-.145-.42-.155-.586-.043-.721.175-.21.069-1.36-.149-1.623a.559.559 0 00-.379-.174c-.305 0-.299-.198.015-.467.138-.117.25-.335.25-.483 0-.184.124-.32.386-.43.639-.264 1.447-1.88 1.34-2.678l-.038-.29-.41.318z"
                fill={fill}
            />
        </Svg>
    );
}

export default NaduSVG;
