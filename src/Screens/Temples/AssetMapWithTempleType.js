import ThrimuraiTemple from '../../../assets/Images/Temple/ThrimuraiTemple.svg';
import MuktiSthalamTemple from '../../../assets/Images/Temple/MuktiSthalamTemple.svg';
import ParashuramaTemple from '../../../assets/Images/Temple/ParashuramaTemple.svg';
import PopularTemples from '../../../assets/Images/Temple/PopularTemples.svg';
import Temples from '../../../assets/Images/Temple/Temples.svg';
import UnknownTemple from '../../../assets/Images/Temple/UnknownTemple.svg';
import UsersLocation from '../../../assets/Images/Temple/UsersLocation.svg';
import LocationPointer from '../../../assets/Images/Temple/location9.svg';
import VaippuSthalamTemple from '../../../assets/Images/Temple/VaippuSthalamTemple.svg';
const assetMapWithTempleType = {
    1: {
        fullName: 'Jyotirlinga/Thirumurai Temples',
        name: 'Thirumurai Temple',
        content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magnam.',
        path: require('./TempleAssets/ThirumuraiTemple.png'),
        Svg: <ThrimuraiTemple />,
        metaData: {
            color: '#E62828',
            letterAssociated: null,
        },
    },
    2: {
        fullName: 'Temples',
        name: 'Temples',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sm.',
        metaData: {
            color: '#6EDB00',
            letterAssociated: null,
        },
        path: require('./TempleAssets/Temples.png'),
        Svg: <Temples />,
    },
    3: {
        fullName: 'Popular Temples',
        name: 'Popular Temple',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sm.',
        metaData: {
            color: '#007DE6',
            letterAssociated: null,
        },
        path: require('./TempleAssets/PopularTemples.png'),
        Svg: <PopularTemples />,
    },

    4: {
        fullName: '108 Parashurama Temples',
        name: 'Parashurama Temple',
        content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sm.  dolor sit amet, consectetur adipiscing elit, sm.',
        metaData: {
            color: '#D700C1',
            letterAssociated: 'C',
        },
        path: require('./TempleAssets/ParashuramaTemple.png'),
        Svg: <ParashuramaTemple />,
    },
    5: {
        fullName: 'Nayanmar birth/mukti sthalam',
        name: 'Mukti Sthalam Temple',
        content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sm.  dolor sit amet, consectetur adipiscing elit, sm.',
        metaData: {
            color: '#D700C1',
            letterAssociated: 'B',
        },
        path: require('./TempleAssets/MuktiSthalamTemple.png'),
        Svg: <MuktiSthalamTemple />,
    },
    6: {
        fullName: 'Uncertain Temples',
        name: 'Unknown Temple',
        content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sm.  dolor sit amet, consectetur adipiscing elit, sm.',
        metaData: {
            color: '#A5A5A5',
            letterAssociated: null,
        },
        path: require('./TempleAssets/UnknownTemple.png'),
        Svg: <UnknownTemple />,
    },

    7: {
        fullName: 'Vaippu Sthalam',
        name: 'Vaippu Sthalam Temple',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sm.',
        metaData: {
            color: '#D700C1',
            letterAssociated: 'A',
        },
        path: require('./TempleAssets/VaippuSthalamTemple.png'),
        Svg: <VaippuSthalamTemple />,
    },
    8: {
        fullName: 'User Location',
        name: 'User Location',
        content:
            'Do cupidatat labore eiusmod ea amet ullamco laborum cupidatat nulla. Aliqua deserunt ad quis pariatur aliqua qui pariatur Lorem mollit. Veniam ut nulla sunt deserunt incididunt ea. Culpa consequat fugiat commodo quis Lorem id qui. Anim incididunt laboris consequat mollit exercitation esse reprehenderit nulla dolor aliqua irure consequat magna ut.',
        metaData: {
            color: '#f00',
            letterAssociated: null,
        },
        path: require('./TempleAssets/UsersLocation.png'),
        Svg: <UsersLocation />,
    },
    9: {
        fullName: 'User Location',
        name: 'User Location',
        content:
            'Do cupidatat labore eiusmod ea amet ullamco laborum cupidatat nulla. Aliqua deserunt ad quis pariatur aliqua qui pariatur Lorem mollit. Veniam ut nulla sunt deserunt incididunt ea. Culpa consequat fugiat commodo quis Lorem id qui. Anim incididunt laboris consequat mollit exercitation esse reprehenderit nulla dolor aliqua irure consequat magna ut.',
        metaData: {
            color: '#f00',
            letterAssociated: null,
        },
        path: require('./TempleAssets/LocationPointer.png'),
        Svg: <LocationPointer />,
    },
};

export const templesDetailsArray = [
    {
        templeName: 'Brahmalingeshwara',
        flag: 1,
        templeType: 'Jyotirlinga/Thirumurai Temples', //assume it exit else we will use the flag
        coordinate: {
            latitude: '26.868851939300207',
            longitude: '80.91296407698843',
        },
    },
    {
        templeName: 'ABC 2',
        flag: 1,
        templeType: 'Jyotirlinga/Thirumurai Temples', //assume it exit else we will use the flag
        coordinate: {
            latitude: '26.930425830077297',
            longitude: '75.83036421715398',
        },
    },
    {
        templeName: 'ABC 3',
        flag: 1,
        templeType: 'Jyotirlinga/Thirumurai Temples', //assume it exit else we will use the flag
        coordinate: {
            latitude: '31.103203252213753',
            longitude: '77.18339602394508',
        },
    },
    {
        templeName: 'ABC 4',
        flag: 1,
        templeType: 'Jyotirlinga/Thirumurai Temples', //assume it exit else we will use the flag
        coordinate: {
            latitude: '11.422450392586484',
            longitude: '76.711616397577347',
        },
    },
];

export default assetMapWithTempleType;
