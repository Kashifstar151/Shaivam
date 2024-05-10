import React from 'react';
import { Modal } from 'react-native';

const ModalComponent = ({ children, isVisible, ...rest }) => {
    return (
        <Modal transparent animationType="slide" visible={isVisible} {...rest}>
            {children}
        </Modal>
    );
};

export default ModalComponent;
