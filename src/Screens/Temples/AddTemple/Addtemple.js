import React, { useState } from 'react';
import { Modal, RefreshControl, StyleSheet, Text, View } from 'react-native';
import Background from '../../../components/Background';
import TempleHeader from '../TempleHeader';
import { FlatList } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { EmptyList } from './EmptyList';
import { RenderCardForAddTemple } from './RenderCardForAddTemple';
import ModalComponent from './ModalComponent';
import AddTempleForm from './AddTempleForm';
import SelectLocation from './SelectLocation';
import PreviewPage from './PreviewPage';
import PromptToCancel from './PromptToCancel';
import SuccessfullSubmission from './SuccessfullSubmission';
import Icon from 'react-native-vector-icons/dist/Entypo';
import { TouchableHighlight } from 'react-native-gesture-handler';

const initialStepVal = {
    first: false,
    second: false,
    third: false,
    success: false,
    failed: false,
};
const Addtemple = ({ navigation }) => {
    const data = [1, 2, 3, 4, 5, 6, 7];
    // const data = [];
    // for stepper form
    const [step, setStep] = useState(initialStepVal);

    // for refresh
    const [refreshing, setRefreshing] = React.useState(false);
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);

    const setTheFlagsForModal = (num) => {
        {
            switch (num) {
                case 1:
                    setStep(() => ({
                        ...initialStepVal,
                        first: true,
                    }));
                    break;
                case 2:
                    setStep(() => ({
                        ...initialStepVal,
                        second: true,
                    }));
                    break;

                case 3:
                    setStep(() => ({
                        ...initialStepVal,
                        third: true,
                    }));
                    break;

                case 'SUCCESS':
                    setStep(() => ({
                        ...initialStepVal,
                        success: true,
                    }));
                    break;

                case 'FAILED':
                    setStep(() => ({
                        ...initialStepVal,
                        failed: true,
                    }));
                    break;

                default:
                    setStep(() => ({
                        ...initialStepVal,
                    }));
            }
        }
    };
    return (
        <View style={{ flex: 1 }}>
            <Background force={'light'}>
                <View
                    style={{
                        paddingTop: Platform.OS == 'ios' ? StatusBar.currentHeight + 30 : 20,
                        paddingBottom: 20,
                    }}
                >
                    <TempleHeader
                        title={'Add Temple'}
                        subTitle={'Don’t see a temple on the app? Submit the details here'}
                    />
                </View>
            </Background>
            <View style={style.flatListContainer}>
                <FlatList
                    data={data}
                    style={
                        {
                            // flex: 1,
                        }
                    }
                    contentContainerStyle={{
                        flexGrow: 1,
                        paddingVertical: 20,
                        paddingBottom: 80,
                    }}
                    renderItem={({ item, index }) => <RenderCardForAddTemple item={item} />}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                    ListEmptyComponent={() => (
                        <EmptyList
                            onPressOfBtn={() => {
                                setStep((prev) => ({
                                    ...prev,
                                    first: true,
                                }));
                            }}
                            navigation={navigation}
                        />
                    )}
                />
            </View>

            {data.length > 0 && (
                <TouchableHighlight
                    style={style.addBtn}
                    onPress={() => {
                        setStep((prev) => ({
                            ...prev,
                            first: true,
                        }));
                    }}
                >
                    <Icon name="plus" size={25} color="#222222" />
                </TouchableHighlight>
            )}

            <ModalComponent
                isVisible={step.first}
                onRequestClose={() => {
                    setTheFlagsForModal();
                }}
            >
                <AddTempleForm
                    navigation={navigation}
                    setStep={(num) => setTheFlagsForModal(num)}
                />
            </ModalComponent>

            <ModalComponent
                isVisible={step.second}
                onRequestClose={() => {
                    setTheFlagsForModal(1);
                }}
            >
                <SelectLocation
                    navigation={navigation}
                    setStep={(num) => setTheFlagsForModal(num)}
                />
            </ModalComponent>

            <ModalComponent
                isVisible={step.third}
                onRequestClose={() => {
                    setTheFlagsForModal(1);
                }}
            >
                <PreviewPage navigation={navigation} setStep={(num) => setTheFlagsForModal(num)} />
            </ModalComponent>

            <ModalComponent
                isVisible={step.success}
                onRequestClose={() => {
                    setTheFlagsForModal();
                }}
            >
                <SuccessfullSubmission
                    navigation={navigation}
                    setStep={(num) => setTheFlagsForModal(num)}
                />
            </ModalComponent>

            <ModalComponent
                isVisible={step.failed}
                onRequestClose={() => {
                    setTheFlagsForModal(1);
                }}
            >
                <PromptToCancel
                    navigation={navigation}
                    setStep={(num) => setTheFlagsForModal(num)}
                />
            </ModalComponent>
        </View>
    );
};

const style = StyleSheet.create({
    flatListContainer: {
        flex: 1,
        zIndex: -1,
    },

    addBtn: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        width: 60,
        height: 60,
        backgroundColor: '#FCB300',
        position: 'absolute',
        bottom: 110,
        right: 30,
        borderRadius: 10,
        borderWidth: 1,
        elevation: 5,
    },
});

export default Addtemple;
