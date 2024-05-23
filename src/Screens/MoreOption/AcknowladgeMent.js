import React from "react";
import { ScrollView, Text, View } from "react-native";

const AcknowladgeMent = () => {
    return (
        <View style={{ padding: 10, paddingHorizontal: 10 }}>
            <Text style={{ color: '#222222', fontFamily: 'Lora-SemiBold', fontSize: 20 }}>{'Acknowledgement'}</Text>
            {/* <Text style={{ fontFamily: 'Mulish-Regular', fontSize: 12, color: '#777777' }}>{t('Lorem ipsum dolor set lorem ipsum')}</Text> */}
            <View>
                <Text style={{ fontFamily: 'Mulish-Regular', color: '#777777' }}>{'We thank the below organizations as well as many other individuals, who contributed to this mobile app by providing their copyrighted material to be used in our platform for the purpose of taking our great spiritual treasure to the world. No part of it may be reused, distributed or transmitted without the written consent of the copyright owners.'}</Text>
            </View>
            <Text style={{ fontSize: 12, color: '#777777', marginVertical: 4 }}>1.Tamil explanation of first, second Thirumurai and Thiruvasagam, & English translation of Thiruvasagam - Socio Religious Guild, Tirunelveli</Text>
            <Text style={{ fontSize: 12, color: '#777777', marginVertical: 4 }}>2.English translation of Devaram - is extracted from the following CD-ROM published by the French Institute of Pondicherry (IFP) https://www.ifpindia.org/ and the Ecole française d'Extrême-Orient (EFEO) https://www.efeo.fr/index.php?l=EN and is being reproduced with the publishers' explicit permission.Source: Digital Tēvāram. Kaṇiṉit Tēvāram. V.M. Subramanya Aiyar, Jean-Luc Chevillard, S.A.S. Sarma. Collection Indologie n° 103, IFP / EFEO, 2007 (© IFP/EFEO)</Text>
            {/* <Text style={{ fontFamily: 'Mulish-Regular', color: '#777777' }}>Source: Digital Tēvāram. Kaṇiṉit Tēvāram. V.M. Subramanya Aiyar, Jean-Luc Chevillard, S.A.S. Sarma. Collection Indologie n° 103, IFP / EFEO, 2007 (© IFP/EFEO)</Text> */}
            <Text style={{ fontSize: 12, color: '#777777', marginVertical: 4 }}>3. English translation of 11th Thirumurai - Sri. S A Sankara Narayanan, Kumbakonam</Text>
            <Text style={{ fontSize: 12, color: '#777777', marginVertical: 4 }}>4. English translation of 12th Thirumurai - Sri. T N Ramachandran, Thanjavur</Text>
            <Text style={{ fontSize: 12, color: '#777777', marginVertical: 4 }}>5. Hindi translation of select songs in Thevaram, Thirumanthiram, Periyapuranam & complete Thiruvasagam - Arutchelvar N Mahalingam Translation Institute (Translation Dr. Ravindrakumar Seth)</Text>
        </View>
    );
};
export default AcknowladgeMent;
