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

const initialStepVal = {
    first: false,
    second: false,
    third: false,
    success: false,
    failed: false,
};
const Addtemple = ({ navigation }) => {
    // const data = [1, 2, 3, 4, 5, 6];
    const data = [];
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
            <View
                style={{
                    flex: 1,
                    paddingHorizontal: 20,
                }}
            >
                <FlatList
                    data={data}
                    style={
                        {
                            // flex: 1,
                        }
                    }
                    contentContainerStyle={{
                        flexGrow: 1,
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

            <ModalComponent isVisible={step.first}>
                <AddTempleForm
                    navigation={navigation}
                    setStep={(num) => setTheFlagsForModal(num)}
                />
            </ModalComponent>

            <ModalComponent isVisible={step.second}>
                <SelectLocation
                    navigation={navigation}
                    setStep={(num) => setTheFlagsForModal(num)}
                />
            </ModalComponent>

            <ModalComponent isVisible={step.third}>
                <PreviewPage navigation={navigation} setStep={(num) => setTheFlagsForModal(num)} />
            </ModalComponent>

            <ModalComponent isVisible={step.success}>
                <SuccessfullSubmission
                    navigation={navigation}
                    setStep={(num) => setTheFlagsForModal(num)}
                />
            </ModalComponent>

            <ModalComponent isVisible={step.failed}>
                <PromptToCancel
                    navigation={navigation}
                    setStep={(num) => setTheFlagsForModal(num)}
                />
            </ModalComponent>
        </View>
    );
};

const style = StyleSheet.create({});

export default Addtemple;
