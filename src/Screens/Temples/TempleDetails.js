// setting the type of the marker you pressed
// callback function for naving to page which has the temple details
import { StackActions, useRoute } from '@react-navigation/native';
import React, { useCallback, useContext, useRef, useState } from 'react';
import {
    Dimensions,
    Image,
    ImageBackground,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import bgImg from '../../../assets/Images/Background.png';
import bgImgDark from '../../../assets/Images/BackgroundCommon.png';
import { ThemeContext } from '../../Context/ThemeContext';
import DownArrowSVG from '../../components/SVGs/DownArrowSVG';
import FavSVG from '../../components/SVGs/FavSVG';
import SearchSVG from '../../components/SVGs/SearchSVG';
import ShareSVG from '../../components/SVGs/ShareSVG';
import TempleCard from './TempleCard';
import { WebView } from 'react-native-webview';
import { CustomButton } from '../../components/Buttons';
import Toast, { AnimatedToast } from '../../components/Toast';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import SearchContainerWithIcon from './SearchContainerWithIcon';
import SearchTemple from './SearchTemple';
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet';
import BottomSheetTempleTemplate from './BottomSheetTempleTemplate';

const details = {
    basicDetails: {
        "Lord's name": 'Somanathar',
        'Divine name': 'Parvati',
        'Head tree': 'N/A',
        Theertam: 'Hiranya, Saraswati, Kapila, Sagaram',
        Worshipped: 'Chandra, Ravana, Krishna, Vikramaditya',
        Location: 'Veraval, Gujurat',
    },

    description: `My name is Shivam \n\nI am a software developer`,
    expandedDesc: `<p><img class=\"image_resized\" style=\"width:400px;\" src=\"https://shaivamfiles.fra1.digitaloceanspaces.com/gallery/image/temples/spt_p_citambaram.jpg\" alt=\"chitambaram temple\"></p><p> </p><p>'கோயில்' என்று பொதுவாக வழங்கினாலே சைவத்தில் சிதம்பரம் நடராசப் பெருமானின் கோயிலைத்தான் குறிக்கம். ஊர்ப்பெயர் தில்லை; கோயிலின் பெயர் சிதம்பரம், இன்று ஊர்ப்பெயர் வழக்கில் மறைந்து, கோயிலின் பெயரே ஊர்ப் பெயராக வழங்கி வருகிறது.</p><p> </p><p>தில்லை மரங்கள் அடர்ந்த காடாக இருந்தமையால் தில்லைவனம் என்று பெயர் பெற்றது. (இம்மரங்கள் தற்போது சிதம்பரத்தில் இல்லை; ஆனால் இதற்கு அண்மையிலுள்ள பிச்சாவரத்திற்குப் பக்கத்தில் உப்பங்கழியின் கரைகளில் காணப்படுகின்றன.)</p><p> </p><p>இக்கோயிலுள் 'திருமூலட்டானம்' என்னும் தனிக்கோயில் ஒன்றுள்ளது. அர்த்தசாம வழிபாடு முடிந்தபின் எல்லாக் கோயில்களிலும் உள்ள சிவகலைகள் அனைத்தும் இந்த மூலத்தான லிங்கத்தில் ஒடுங்குவதாக ஐதீகம்.</p><p> </p><p>சிற்றம்பலம் உள்ளே செல்வதற்கு ஐந்துபடிகள் - பஞ்சாக்கரப்படிகள் உள்ளன; இப்படிகளின் இரு புறமும் யானை உருவங்கள் உள்ளன. பதினான்கு சாஸ்திரங்களில் ஒன்றை இப்படியில் வைத்தபோது, இப்படிகளிலுள்ள யானைகளில் ஒன்று தன் தும்பிக்கையால் அந்நூலையெடுத்து நடராசப்பெருமான் திருவடியில் வைத்தமையால் அந்நூல் 'திருக்களிற்றுப்டியார்' என்ற பெயர் பெற்றது.</p><p> </p><p>திருமால்,பிரமன், முதலியோர் இசைக்கருவிகளை ஒலிக்கக் கூத்தபிரான் என்றும் திருநடனம் புரிகிறான்.அம்மை சிவாகம சுந்தரி இத்திரு நடனத்தை இடைவிடாது ரசிக்கிறாள்.</p><p> திருமுறைப் பாடல்கள் : பதிகங்கள்  :  சம்பந்தர்     -  1. <a href=\"/thirumurai/first-thirumurai/1186/thirugnanasambandhar-thevaram-koil-karrang-keriyompik\">கற்றாங் கெரியோம்பிக்</a> (1.80),                                   2. <a href=\"/thirumurai/third-thirumrai/951/thirugnanasambandar-thevaram-koyil-adinainaru\">ஆடினாய்நறு நெய்யொடு</a> (3.1);                 அப்பர்        -  1. <a href=\"/thirumurai/fourth-thirumurai/590/thirunavukkarasar-thevaram-chidambaram-thirunerisai-senjsadaik-katrtrai\">செஞ்சடைக் கற்றை</a> (4.22),                                   2. <a href=\"/thirumurai/fourth-thirumurai/591/thirunavukkarasar-thevaram-chidambaram-thirunerisai-paththanaip-pada\">பத்தனாய்ப் பாட மாட்டேன்</a> (4.23),                                   3. <a href=\"/thirumurai/fourth-thirumurai/648/thirunavukkarasar-thevaram-chidambaram-paalaiyu-daikkamu\">பாளையு டைக்கமு</a> (4.80),                                   4. <a href=\"/thirumurai/fourth-thirumurai/649/thirunavukkarasar-thevaram-koil-thiruvirutham-karunatta-kanndanai\">கருநட்ட கண்டனை</a> (4.81),                                   5. <a href=\"/thirumurai/fifth-thirumurai/105/thirunavukkarasar-thevaram-chidambaram-annam-paalikunth\">அன்னம் பாலிக்குந்</a> (5.1),                                   6. <a href=\"/thirumurai/fifth-thirumurai/106/thirunavukkarasar-thevaram-chidambaram-thirukkurunthokai-panaikai-mummatha\">பனைக்கை மும்மத</a> (5.2),                                  7. <a href=\"/thirumurai/sixth-thirumurai/683/thirunavukkarasar-thevaram-koyil-periyathiruthantakam-ariyanai-anthanaarthanj\">அரியானை அந்தணர்தஞ்</a> (6.1),                                  8. <a href=\"/thirumurai/sixth-thirumurai/684/thirunavukkarasar-thevaram-koyil-pukgathiruthandagam-mangul-mathithavalum\">மங்குல் மதிதவழும்</a>  (6.2);               சுந்தரர்        -   1. <a href=\"/thirumurai/seventh-thirumurai/93/sundarar-thevaram-koyil-madiththaadum-adimaikkan\">மடித்தாடும் அடிமைக்கண்</a> (7.90);         மாணிக்கவாசகர்    -   1. <a href=\"/thirumurai/eighth-thirumurai-thiruvasagam/208/keerthi-thiruagaval\">கீர்த்தித் திருஅகவல்</a> (8.2),                                 2. <a href=\"/thirumurai/eighth-thirumurai-thiruvasagam/209/thiruvandap-pagudhi\">திருவண்டப் பகுதி</a> (8.3),                                 3. <a href=\"/thirumurai/eighth-thirumurai-thiruvasagam/210/%20porrith-thiruagaval\">போற்றித் திருஅகவல்</a> (8.4),                                 4. <a href=\"/thirumurai/eighth-thirumurai-thiruvasagam/215/thiruppor-chunnam\">திருப்பொற்சுண்ணம்</a> (8.9),                                 5. <a href=\"/thirumurai/eighth-thirumurai-thiruvasagam/216/thirukkoththumbi\">திருக்கோத்தும்பி</a> (8.10),                                 6. <a href=\"/thirumurai/eighth-thirumurai-thiruvasagam/217/thiruththellenam\">திருத்தெள்ளேணம்</a> (8.11),                                 7. <a href=\"/thirumurai/eighth-thirumurai-thiruvasagam/218/thiruchchazal\">திருச்சாழல்</a> (8.12),                                 8. <a href=\"/thirumurai/eighth-thirumurai-thiruvasagam/219/thiruppuvalli\">திருப்பூவல்லி</a> (8.13),                                 9. <a href=\"/thirumurai/eighth-thirumurai-thiruvasagam/220/thiruundhiyar\">திருஉந்தியார்</a> (8.14),                                10. <a href=\"/thirumurai/eighth-thirumurai-thiruvasagam/221/thiruththol-nokkam\">திருதோணோக்கம்</a> (8.15),                                11. <a href=\"/thirumurai/eighth-thirumurai-thiruvasagam/222/thirupponnuchal\">திருப்பொன்னூசல்</a> (8.16),                                12. <a href=\"/thirumurai/eighth-thirumurai-thiruvasagam/223/annaip-paththu\">அன்னைப்பத்து</a> (8.17),                                13. <a href=\"/thirumurai/eighth-thirumurai-thiruvasagam/224/kuyirpaththu\">குயில்பத்து</a> (8.18),                                14. <a href=\"/thirumurai/eighth-thirumurai-thiruvasagam/225/thiruththachangam\">திருத்தசாங்கம்</a> (8.19),                                15. <a href=\"/thirumurai/eighth-thirumurai-thiruvasagam/227/koyil-muththa-thiruppadhigam\">கோயில்மூத்ததிருப்பதிகம்</a> (8.21),                                16. <a href=\"/thirumurai/eighth-thirumurai-thiruvasagam/228/koyil-thiruppadhigam\">கோயில்திருப்பதிகம்</a> (8.22),                                17. <a href=\"/thirumurai/eighth-thirumurai-thiruvasagam/237/kandabaththu\">கண்டபத்து</a> (8.31),                                18. <a href=\"/thirumurai/eighth-thirumurai-thiruvasagam/241/achchappaththu\">அச்சப்பத்து</a> (8.35),                                19. <a href=\"/thirumurai/eighth-thirumurai-thiruvasagam/246/kulap-paththu\">குலாப்பத்து</a> (8.40),                                20. <a href=\"/thirumurai/eighth-thirumurai-thiruvasagam/250/ennappathigam-paruruvaya-thiruvasagam\">எண்ணப்பத்து</a> (8.44),                                21. <a href=\"/thirumurai/eighth-thirumurai-thiruvasagam/251/yaththiraip-paththu\">யாத்திரைப்பத்து</a> (8.45),                                22. <a href=\"/thirumurai/eighth-thirumurai-thiruvasagam/252/thiruppadai-ezuchchi\">திருப்படையெழுச்சி</a> (8.46),                                23. <a href=\"/thirumurai/eighth-thirumurai-thiruvasagam/255/thiruppadai-atchi\">திருப்படையாட்சி</a> (8.49),                                24. <a href=\"/thirumurai/eighth-thirumurai-thiruvasagam/256/anandhamalai\">ஆனந்தமாலை</a> (8.50),                                25. <a href=\"/thirumurai/eighth-thirumurai-thiruvasagam/257/achchop-padhigam\">அச்சோப்பதிகம்</a> (8.51);  திருமாளிகைத்தேவர்    -    1. <a href=\"/thirumurai/ninth-thirumurai/259/thirumaligaithevar-koyil-thiruvisaipa-volivalar-vilakkay\">ஒளிவளர் விளக்கே</a> (9.1),                                   2. <a href=\"/thirumurai/ninth-thirumurai/260/thirumaligaithevar-koyil-thiruvisaipa-vuyar-kodiyaatai\">உயர்கொடி யாடை</a> (9.2),                                 3. <a href=\"/thirumurai/ninth-thirumurai/261/thirumaligaithevar-koyil-thiruvisaipa-vuravakiya\">உறவா கியயோ</a> (9.3),                                   4. <a href=\"/thirumurai/ninth-thirumurai/262/thirumaligaithevar-koyil-thiruvisaipa-inangkila-isan\">இணங்கிலா ஈசன்</a> (9.4);     கருவூர்த்தேவர்        -    1. <a href=\"/thirumurai/ninth-thirumurai/266/karuvurthevar-koyil-thiruvisaipa-kanam-viri\">கணம்விரி</a> (9.8);   பூந்துருத்திநம்பி காடநம்பி -   1. <a href=\"/thirumurai/ninth-thirumurai/277/punturuttinambi-katanambi-koyil-thiruvisaipa-muthu-vayiramani\">முத்து வயிரமணி</a> (9.19);   கண்டராதித்தர்         -   1. <a href=\"/thirumurai/ninth-thirumurai/278/kantaratittar-koyil-thiruvisaipa-minnar-vuruvam\">மின்னார் உருவம்</a> (9.20);   வேணாட்டடிகள்        -   1. <a href=\"/thirumurai/ninth-thirumurai/279/venattatikal-koyil-thiruvisaipa-tuccana\">துச்சான செய்திடினும்</a> (9.21); திருவாலியமுதனார்      -   1. <a href=\"/thirumurai/ninth-thirumurai/280/thiruvaliyamuthanar-koyil-thiruvisaipa-maiyal\">மையல் மாதொரு</a> (9.22),                                2. <a href=\"/thirumurai/ninth-thirumurai/281/thiruvaliyamuthanar-koyil-thiruvisaipa-pavalamal-varaiyaip\">பவளமால் வரையைப்</a> (9.23),                                3. <a href=\"/thirumurai/ninth-thirumurai/282/thiruvaliyamuthanar-koyil-thiruvisaippa-allaay-pakalaay\">அல்லாய்ப் பகலாய்</a> (9.24),                                4. <a href=\"/thirumurai/ninth-thirumurai/283/thiruvaliyamuthanar-koyil-thiruvisaipa-kolamalar\">கோல மலர்நெடுங்கண்</a> (9.25); புருடோத்தம நம்பி       -   1. <a href=\"/thirumurai/ninth-thirumurai/284/purutottamanambi-koyil-thiruvisaipa-varani-narumalar\">வாரணி நறுமலர்</a> (9.26),                                2. <a href=\"/thirumurai/ninth-thirumurai/285/purutottamanambi-koyil-thiruvisaipa-vanavarkal\">வானவர்கள் வேண்ட</a> (9.27);     சேதிராயர்           -   1. <a href=\"/thirumurai/ninth-thirumurai/286/setirayar-koyil-thiruvisaipa-selulam\">சேலு லாம்வயல்</a> (9.28);    சேந்தனார்            -   1. <a href=\"/thirumurai/ninth-thirumurai-thirupalandu/287/sentanar-koyil-thirupallandu-mannuka\">மன்னுக தில்லை</a> (9.29) திருப்பல்லாண்டு; பட்டினத்துப் பிள்ளையார் -   1. <a href=\"/thirumurai/eleventh-thirumurai/320/eleventh-thirumurai-pattinathar-koyil-nanmanimalai\">பூமேல் அயன்அறியா</a> (11.27); நம்பியாண்டார் நம்பி    -   1. <a href=\"/thirumurai/eleventh-thirumurai/384/eleventh-thirumurai-nambiyantarnambi-kovil-thiruppanniyar-viruttam\">நெஞ்சந் திருவடிக்</a> (11.33); பாடல்கள்   :  சம்பந்தர்  -      <a href=\"/thirumurai/second-thirumurai/843/thirugnanasambandar-thevaram-thirusethirakovai-arur-thillaiyam\">ஆரூர்தில்லை யம்பலம்</a> (2.39.1);                  அப்பர்   -       <a href=\"/thirumurai/fourth-thirumurai/682/thirunavukkarasar-thevaram-thani-pavalath-thadavarai\">மூவா உருவத்து</a> (4.113.3),                                   <a href=\"/thirumurai/fifth-thirumurai/134/thirunavukkarasar-thevaram-thirupparaithurai-thirukkurunthokai-karappar-kaala\">நல்ல நான்மறை</a> (5.30.6),                                   <a href=\"/thirumurai/fifth-thirumurai/137/thirunavukkarasar-thevaram-thiru-sotruthurai-thirukkurunthokai-kollai-yetrinar\">கொல்லை யேற்றினர்</a> (5.33.1),                                   <a href=\"/thirumurai/fifth-thirumurai/170/thirunavukkarasar-thevaram-thiru-poovanur-thirukkurunthokai-poovanuurppani\">புல்ல மூர்தியூர்</a> (5.65.5),                                     <a href=\"/thirumurai/fifth-thirumurai/184/thirunavukkarasar-thevaram-thiruKodikka-thirukkurunthokai-sangu-lamunkaith\">முல்லை நன்முறுவல்</a> (5.78.3),                                   <a href=\"/thirumurai/sixth-thirumurai/687/thirunavukkarasar-thevaram-thiru-veerattanam-potri-tiruthandagam-ellaanj-sivanenanna\">முல்லையங் கண்ணி</a> (6.5.3),                                   <a href=\"/thirumurai/sixth-thirumurai/689/thirunavukkarasar-thevaram-thiru-veerattanam-thiruthandakam-selvap-puntrkedila\">செல்வப் புனற்கெடில</a> (6.7.1),                                   <a href=\"/thirumurai/sixth-thirumurai/715/thirunavukkarasar-thevaram-thiruvarur-araneri-thiruthandagam-porungkaimathak-kariyurivaip\">தாயவனை எவ்வுயிர்க்குந்</a> (6.33.6),                                   <a href=\"/thirumurai/sixth-thirumurai/716/thirunavukkarasar-thevaram-thiruvarur-thirutthandakam-oruvanai-ulakeththa\">பாடகஞ்சேர் மெல்லடிநற்</a> (6.34.3),                                   <a href=\"/thirumurai/sixth-thirumurai/736/thirunavukkarasar-thevaram-thirupullirukku-velur-thiruthandagam-aandanai-adiyenai\">அறையார்பொற்</a> (6.54.6),                                   <a href=\"/thirumurai/sixth-thirumurai/752/thirunavukkarasar-thevaram-kshetra-kovai-thiruthandagam-\">தில்லைச் சிற்றம்பலமுஞ்</a> (6.70.1),                                   <a href=\"/thirumurai/sixth-thirumurai/763/thirunavukkarasar-thevaram-thirukodikaval-thiruthandagam-kandalanjser-netrtriyilang\">கடிமலிந்த மலர்க்கொன்றைச்</a> (6.81.6),                                   <a href=\"/thirumurai/sixth-thirumurai/764/thirunavukkarasar-thevaram-thiruchaikkadu-vaanath-thilamathiyum\">வானத் திளமதியும்</a> (6.82.1 &amp; 9),                                   <a href=\"/thirumurai/sixth-thirumurai/768/thirunavukkarasar-thevaram-thiruvalampozhil-karuvaakik-kannuthalaai\">பார்முழுதாய்</a> (6.86.4),                                   <a href=\"/thirumurai/sixth-thirumurai/778/thirunavukkarasar-thevaram-thani-thiruthandagam-aamayanththiirth-thadiyanai\">அணிதில்லை</a> (6.96.7);                சுந்தரர்       -    <a href=\"/thirumurai/seventh-thirumurai/18/sundarar-thevaram-thirunaavaluur-kovalan-naanmugan\">கோட்டங்கொண் டார்</a> (7.17.6),                                   <a href=\"/thirumurai/seventh-thirumurai/40/sundarar-thevaram-thiruththondaththogai-thillaivaal-anthanartham\">தில்லைவாழ்</a> (7.39.1),                                   <a href=\"/thirumurai/seventh-thirumurai/65/sundarar-thevaram-thirukolakka-putril-vaalara-vaarththa\">ஆத்தம் என்றெனை</a> (7.62.4),                                   <a href=\"/thirumurai/seventh-thirumurai/87/sundarar-thevaram-thirukkaanapper-thonda-radiththozhunj\">கொல்லை விடைக்</a> (7.84.5),                திருமூலர்     -    <a href=\"/thirumurai/tenth-thirumurai/414/thirumoolar-nayanar-thirumandiram-tantiram-4-sakthibedham\">உண்டில்லை</a> (10.4ம் தந்திரம் - 05. சத்தி பேதம் - திரிபுரை சக்கரம்),                                   <a href=\"/thirumurai/tenth-thirumurai/461/thirumoolar-nayanar-thirumandiram-tantiram-7-pindalingam\">மானுடர் ஆக்கை</a> (10.7ம் தந்திரம் - 03. பிண்டலிங்கம்); ஐயடிகள் காடவர்கோன் நாயனார்  -  <a href=\"/thirumurai/eleventh-thirumurai/293/eleventh-thirumurai-aiyadikal-kadavarkon-nayanar-thirukovil-tiruvenpa\">ஓடுகின்ற நீர்மை</a> (11.5.1) க்ஷேத்திரத் திருவெண்பா; சேரமான் பெருமாள் நாயனார்     -  <a href=\"/thirumurai/eleventh-thirumurai/294/eleventh-thirumurai-cheramanperumal-nayanar-ponvannattantati\">மொழியக்கண் டான்</a> (11.6.77 &amp; 84) பொன்வண்ணத்தந்தாதி;                 கபிலதேவ நாயனார்       -  <a href=\"/thirumurai/eleventh-thirumurai/312/eleventh-thirumurai-kabilar-sivaperuman-thiruirattai-manimalai\">இயலிசை நாடக மாய்</a> (11.22.24) சிவபெருமான் திருஇரட்டை மணிமாலை;        பரணதேவ நாயனார்       -  <a href=\"/thirumurai/eleventh-thirumurai/316/eleventh-thirumurai-paranar-sivaperuman-thiruandhadhi\">ஆங்குரைக்க லாம்</a> (11.24.17) சிவபெருமான் திருவந்தாதி;         நம்பியாண்டார் நம்பி      -   <a href=\"/thirumurai/eleventh-thirumurai/385/eleventh-thirumurai-nambiyantarnambi-thiruthondar-thiruandhadhi\">செப்பத் தகு</a> (11.34.2,3,21,59,72,83 &amp; 89) திருத்தொண்டர் திருவந்தாதி;                                         <a href=\"/thirumurai/eleventh-thirumurai/386/eleventh-thirumurai-nambiyantarnambi-aludayapillaiyar-thiruandhadhi\">தேறும் புனல்தில்லைச்</a> (11.39.68) ஆளுடைய பிள்ளையார் திருவந்தாதி;              சேக்கிழார்            -    <a href=\"/thirumurai/twelveth-thirumurai/404/periya-puranam-thirumalai-charukkam-payiram\">ஊன் அடைந்த</a> (12.1.2) பாயிரம்,                                          <a href=\"/thirumurai/twelveth-thirumurai/821/periya-puranam-thirumalaich-charukkam-thatuththu-atkonta-puranam\">பரம் பொருளைப்</a> (12.5.91 &amp; 92) தடுத்தாட்கொண்ட புராணம்,                                          <a href=\"/thirumurai/twelveth-thirumurai/822/periya-puranam-thillai-vaz-anthanar-charukkam-thillai-vaz-anthanar-puranam\">ஆதியாய் நடுவுமாகி</a> (12.1.1,3 &amp; 10) தில்லைவாழ் அந்தணர் புராணம்,                                          <a href=\"/thirumurai/twelveth-thirumurai/823/periya-puranam-thillai-vaz-anthanar-charukkam-thirunilakanta-nayanar-puranam\">வேதியர் தில்லை மூதூர்</a> (12.2.1,30 &amp; 31) திருநீலகண்ட நாயனார் புராணம்,                                          <a href=\"/thirumurai/twelveth-thirumurai/824/periya-puranam-thillai-vaz-anthanar-charukkam-iyarpakai-nayanar-puranam\">சொல்லுவது அறியேன் வாழி</a> (12.3.32) இயற்பகை நாயனார் புராணம்,                                          <a href=\"/thirumurai/twelveth-thirumurai/826/periya-puranam-thillaivazh-anthanar-charukkam-ilaiyankudi-mara-nayanar-puranam\">செல்வம் மேவிய நாளில்</a> (12.4.6) இளையான் குடி மாற நாயனார் புராணம்,                                          <a href=\"/thirumurai/twelveth-thirumurai/827/periya-puranam-thillaivazh-anthanar-charukkam-meypporul-nayanar-puranam\">தேடிய மாடு நீடு  செல்வமும்</a> (12.5.4) மெய்ப் பொருள் நாயனார் புராணம்,                                          <a href=\"/thirumurai/twelveth-thirumurai/871/periya-puranam-mummaiyal-ulakanda-charukkam-uruththira-pachupathi-nayanar-puranam\">அயில் கொள்</a> (12.17.10) உருத்திர பசுபதி நாயனார் புராணம்,                                          <a href=\"/thirumurai/twelveth-thirumurai/872/periya-puranam-mummaiyal-ulakanda-charukkam-thiru-nalaip-povar-nayana-puranam\">இத் தன்மை ஈசர் மகிழ் பதி</a> (12.18.20,22,28,34 &amp; 35) திருநாளைப்போவார் நாயனார் புராணம்,                                          <a href=\"/thirumurai/twelveth-thirumurai/876/periya-puranam-mummaiyal-ulakanda-charukkam-chantechura-nayanar-puranam\">சென்னி அபயன்</a> (12.20.8) சண்டேசுர நாயனார் புராணம்,                                          <a href=\"/thirumurai/twelveth-thirumurai/876/periya-puranam-mummaiyal-ulakanda-charukkam-chantechura-nayanar-puranam\">ஆனாத சீர்த் தில்லை</a> (12.21.156,161 &amp; 174) திருநாவுக்கரசு சுவாமிகள் புராணம்,                                          <a href=\"/thirumurai/twelveth-thirumurai/887/periya-puranam-thiruninra-charukkam-apputhi-atikal-nayanar-puranam\">இவ் வகை அரசின் நாமம்</a> (12.25.44) அப்பூதி அடிகள் நாயனார் புராணம்,                                          <a href=\"/thirumurai/twelveth-thirumurai/897/periya-puranam-vampara-varivanduu-charukkam-thirunyana-champantha-chuvamikal-puranam\">சிரபுரத்தில் அமர்ந்தருளும்</a> (12.28.142,144,147,148,152,153,154,156,162,168,170,171,174,793,962,1135,1136,1143 &amp; 1144) திருஞானசம்பந்தர் நாயனார் புராணம்,                                          <a href=\"/thirumurai/twelveth-thirumurai/898/periya-puranam-vampara-varivanduu-charukkam-eyar-kon-kalik-kama-nayanar-puranam\">அத் திருப்பதியை</a> (12.29.89,110,111,166 &amp; 167) ஏயர்கோன் கலிக்காம நாயனார் புராணம்,                                          <a href=\"/thirumurai/twelveth-thirumurai/915/periyapuranam-varkonda-vanamulaiyal-charukkam-kazharitrarivar-nayanar-puranam\">நீடும் உரிமைப்</a> (12.37.23,53,59.61) கழறிற்றறிவார் நாயனார் புராணம்,                                          <a href=\"/thirumurai/twelveth-thirumurai/1064/periya-puranam-varkonda-vanamulaiyal-charukkam-kutruva-nayanar-puranam\">மல்லல் ஞாலம்</a> (12.39.4 &amp; 5) கூற்றுவ நாயனார் புராணம்,                                          <a href=\"/thirumurai/twelveth-thirumurai/1081/periya-puranam-poiyadimai-illatha-pulavar-charukkam-pukazch-choza-nayanar-puranam\">அந் நகரில்</a> (12.41.8) புகழ்ச்சோழ நாயனார் புராணம்,                                          <a href=\"/thirumurai/twelveth-thirumurai/1088/periya-puranam-karaik-kantan-charukkam-kanampulla-nayanar-puranam\">தாவாத பெருஞ் செல்வம்</a> (12. 48.3 &amp; 4) கணம்புல்ல நாயனார் புராணம்,                                          <a href=\"/thirumurai/twelveth-thirumurai/1103/periya-puranam-paththarai-paniivar-charukkam-muzuniru-puchiya-munivar-puranam\">ஆரணியத்து உலர்ந்த</a> (12.63.3) முழுநீறு பூசிய முனிவர் புராணம்,                                          <a href=\"/thirumurai/twelveth-thirumurai/1109/periya-puranam-manniya-seer-charukkam-kochchenkat-choza-nayanar-puranam\">தொன்மை தரு</a> (12.68.7,15 &amp; 17) கோச்செங்கட் சோழ நாயனார் புராணம்.                                        </p><h3> </h3><h3>தல மரம் :  <a href=\"/thala-marangalin-sirappukal/temple-trees-thillai-tree\">தில்லை</a></h3><p> </p>`,
};
const TempleDetails = ({ navigation }) => {
    const route = useRoute();
    const { data, locationName } = route?.params;
    console.log('🚀 ~ TempleDetails ~ data:', data);
    const { theme } = useContext(ThemeContext);
    const popAction = StackActions.pop(1);
    const [fav, setFav] = useState(true);
    const [animateToast, setAnimateToast] = useState();
    const onFavBtnClick = () => {
        setAnimateToast(!fav);
        setFav(!fav);
    };

    const bottomSheetRef = useRef(null);
    const [snapIndex, setSnapIndex] = useState(0);
    const [modalVisible, setModalVisible] = useState(true);

    const handleSheetChanges = useCallback((index) => {
        console.log('handleSheetChanges', index);
        setSnapIndex(index);
    }, []);

    const [regionCoordinate, setRegionCoordinate] = useState({
        latitude: 28.500271,
        longitude: 77.387901,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
        locationName: '',
    });
    return (
        <>
            <BottomSheetTempleTemplate
                snapPoints={['50%', '95%']}
                showSearchBarWhenFullSize={false}
                regionCoordinate={{
                    latitude: 28.500271,
                    longitude: 77.387901,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                    locationName: '',
                }}
                initialIndexOfSize={0}
                appearsOnIndex={1}
                disappearsOnIndex={0}
                isNavigable={true}
                routeName={route.name}
                valueToBePreFilled={route.params?.data?.name ?? route.params?.searchText}
            >
                <View
                    style={[
                        styles.wholeContainerWrapper,
                        {
                            backgroundColor: 'white',
                            flex: 1,
                        },
                    ]}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingVertical: 20,
                            paddingHorizontal: 15,
                            alignItems: 'center',
                        }}
                    >
                        <CustomButton
                            svg={<DownArrowSVG fill={'#000'} width={20} height={20} />}
                            style={{
                                paddingVertical: 0,
                                paddingHorizontal: 0,
                            }}
                            onPress={() => {
                                navigation.dispatch(popAction);
                            }}
                            type="TouchableOpacity"
                        />
                        <View style={{ flexDirection: 'row', gap: 20, alignItems: 'center' }}>
                            <CustomButton
                                svg={<SearchSVG fill={'#777777'} width={17} height={17} />}
                                style={{
                                    paddingVertical: 0,
                                    paddingHorizontal: 0,
                                    borderRadius: 0,
                                }}
                                onPress={() => {
                                    navigation.dispatch(popAction);
                                }}
                                type="TouchableOpacity"
                            />
                            <CustomButton
                                svg={
                                    <FavSVG
                                        outerfill={fav ? '#C1554E' : '#777777'}
                                        innerfill={fav ? '#C1554E' : '#fff'}
                                        fill={'#777777'}
                                        width={14}
                                        height={20}
                                    />
                                }
                                style={{
                                    paddingVertical: 0,
                                    paddingHorizontal: 0,
                                    borderRadius: 0,
                                }}
                                onPress={onFavBtnClick}
                                type="TouchableOpacity"
                            />
                            <CustomButton
                                svg={<ShareSVG fill={'#777777'} width={18} height={18} />}
                                style={{
                                    paddingVertical: 0,
                                    paddingHorizontal: 0,
                                    borderRadius: 0,
                                }}
                                onPress={() => {
                                    navigation.dispatch(popAction);
                                }}
                                type="TouchableOpacity"
                            />
                        </View>
                    </View>
                    <View>
                        <TempleCard
                            dataSet={{
                                templeName: 'Brahmalingeshwara',
                                flag: 1,
                                templeType: 'Jyotirlingas/Thirumurai Temples',
                                coordinate: {
                                    latitude: '26.868851939300207',
                                    longitude: '80.91296407698843',
                                },
                            }}
                            showButton={false}
                            showMargin={false}
                        />

                        <View style={{ marginHorizontal: 20, marginVertical: 10, gap: 8 }}>
                            <Text
                                style={{
                                    color: 'black',
                                    fontFamily: 'Mulish-Bold',
                                    fontSize: 18,
                                    paddingVertical: 8,
                                }}
                            >
                                Basic Details
                            </Text>
                            {Object.entries(details.basicDetails).map(([key, value], index) => (
                                <KeyValueComp key={index} keyVal={key} value={value} />
                            ))}
                        </View>

                        <View style={{ marginHorizontal: 20, gap: 8 }}>
                            <Text
                                style={{
                                    color: 'black',
                                    fontFamily: 'Mulish-Bold',
                                    fontSize: 18,
                                    paddingVertical: 10,
                                }}
                            >
                                Temple Description
                            </Text>

                            <Text
                                style={{
                                    color: 'black',
                                    fontFamily: 'Mulish-Regular',
                                    fontWeight: 600,
                                }}
                            >
                                {details.description}
                            </Text>
                        </View>
                    </View>

                    <View style={{ backgroundColor: 'red', flexGrow: 1, marginHorizontal: 20 }}>
                        <WebView
                            originWhitelist={['*']}
                            source={{ html: details.expandedDesc }}
                            containerStyle={
                                {
                                    // flex: 0,
                                    // height: 200,
                                }
                            }
                            style={
                                {
                                    // flex: 0,
                                    // height: '100%',
                                    // width: '100%',
                                }
                            }
                        />
                    </View>

                    {/* <Toast /> */}
                    {fav && animateToast ? (
                        <AnimatedToast
                            state={animateToast && fav}
                            type={'SUCCESS'}
                            text={'Saved in My Trips > Saved Temples'}
                        />
                    ) : (
                        <AnimatedToast
                            state={animateToast && fav}
                            type={'ERROR'}
                            text={'Temple removed from saved'}
                        />
                    )}
                </View>
            </BottomSheetTempleTemplate>
        </>
    );
};

// const tt = () => (
//     <View style={{ flex: 1 }}>
//         <MapView
//             provider={PROVIDER_GOOGLE}
//             initialRegion={null}
//             style={styles.map}
//             region={regionCoordinate}
//         ></MapView>
//         {/* <ImageBackground
// source={theme.colorscheme === 'light' ? bgImg : bgImgDark}
// resizeMode="cover"
// style={{ width: '100%', height: 50 }}
// /> */}

//         <View
//             style={{
//                 position: 'absolute',
//                 width: '100%',
//                 padding: 20,
//             }}
//         >
//             <SearchContainerWithIcon>
//                 <SearchTemple
//                     route={route.name}
//                     value={route.params?.data?.name ?? route.params?.searchText}
//                     isNavigable={true}
//                 />
//             </SearchContainerWithIcon>
//         </View>

//         <BottomSheet
//             ref={bottomSheetRef}
//             onChange={handleSheetChanges}
//             snapPoints={['50%', '95%']}
//             index={0}
//             backdropComponent={(props) => (
//                 <BottomSheetBackdrop
//                     opacity={1}
//                     appearsOnIndex={1}
//                     disappearsOnIndex={0}
//                     pressBehavior={'collapse'}
//                     {...props}
//                 >
//                     <ImageBackground
//                         source={
//                             theme.colorscheme === 'light'
//                                 ? require('../../../assets/Images/Background.png')
//                                 : require('../../../assets/Images/BackgroundCommon.png')
//                         }
//                         style={{
//                             paddingVertical: 0,
//                             borderRadius: 10,
//                             width: '100%',
//                             height: '40%',
//                         }}
//                     ></ImageBackground>
//                 </BottomSheetBackdrop>
//             )}
//         >
//             {}
//         </BottomSheet>
//     </View>
// );

const KeyValueComp = ({ keyVal, value }) => (
    <View
        style={{
            gap: 20,
            flexDirection: 'row',
        }}
    >
        <Text style={{ fontFamily: 'Mulish-Regular', color: '#777777' }}>{keyVal}</Text>
        <Text style={{ color: 'black', fontFamily: 'Mulish-Regular', fontWeight: 600 }}>
            {value}
        </Text>
    </View>
);
const styles = StyleSheet.create({
    map: {
        justifyContent: 'center',
        position: 'absolute',
        flex: 1,
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
    },

    wholeContainerWrapper: {
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        overflow: 'hidden',
        marginTop: -12,
    },

    colorContWrapper: {
        flex: 1,
        flexDirection: 'row',
        gap: 8,
        paddingTop: 10,
        justifyContent: 'space-evenly',
    },

    topBarWrapper: {
        width: '100%',
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    contWrapper: {
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: 'white',
        elevation: 5,
    },
    textContWrapper: {
        height: 14,
        width: 14,
        borderRadius: 2,
        justifyContent: 'center',
    },

    textStyleForCont: {
        alignSelf: 'center',
        paddingVertical: 'auto',
        fontWeight: 'bold',
        color: 'white',
        lineHeight: 16,
    },
});

export default TempleDetails;
