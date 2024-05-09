import React from 'react';
import { Modal } from 'react-native';

const ModalComponent = ({ children, isVisible }) => {
    return (
        <Modal transparent animationType="slide" visible={isVisible}>
            {children}
        </Modal>
    );
};

export default ModalComponent;
