import ThrimuraiTemple from '../../../assets/Images/Temple/ThrimuraiTemple.svg';
import MuktiSthalamTemple from '../../../assets/Images/Temple/MuktiSthalamTemple.svg';
import ParashuramaTemple from '../../../assets/Images/Temple/ParashuramaTemple.svg';
import PopularTemples from '../../../assets/Images/Temple/PopularTemples.svg';
import Temples from '../../../assets/Images/Temple/Temples.svg';
import UnknownTemple from '../../../assets/Images/Temple/UnknownTemple.svg';
import UsersLocation from '../../../assets/Images/Temple/UsersLocation.svg';
import VaippuSthalamTemple from '../../../assets/Images/Temple/VaippuSthalamTemple.svg';
const assetMapWithTempleType = {
    1: {
        fullName: 'Jyotirlingas/Thirumurai Temples',
        name: 'Thirumurai Temple',
        content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magnam.',
        path: require('./TempleAssets/ThirumuraiTemple.png'),
        svg: ThrimuraiTemple,
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
        svg: <Temples />,
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
        svg: <PopularTemples />,
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
        svg: <ParashuramaTemple />,
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
        svg: <MuktiSthalamTemple />,
    },
    6: {
        fullName: 'Unclear Temples',
        name: 'Unknown Temple',
        content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sm.  dolor sit amet, consectetur adipiscing elit, sm.',
        metaData: {
            color: '#A5A5A5',
            letterAssociated: null,
        },
        path: require('./TempleAssets/UnknownTemple.png'),
        svg: <UnknownTemple />,
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
        svg: <VaippuSthalamTemple />,
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
        svg: <UsersLocation />,
    },
};

export default assetMapWithTempleType;
