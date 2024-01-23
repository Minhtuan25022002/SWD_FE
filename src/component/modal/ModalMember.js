import React, { useEffect, useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { emitter } from '../../utils/emitter'
import { showSuccessToast, showErrorToast } from "../toast/toast";

function ModalMember({ isOpen, toggleFromParent, createNewUser }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        image: '',
        gender: '',
        buildingId: '',
        buildingName: '',
        phoneNumber: ''
    });

    useEffect(() => {
        const eventListener = () => {
            setFormData({
                name: '',
                email: '',
                password: '',
                image: '',
                gender: '',
                buildingId: '',
                buildingName: '',
                phoneNumber: '',
            });
        };

        emitter.on('EVENT_CREATE_MODAL_DATA', eventListener);

        return () => {
            emitter.off('EVENT_CREATE_MODAL_DATA', eventListener);
        };
    }, []);

    const toggle = () => {
        toggleFromParent();
    };

    const handleOnChangeInput = (event, id) => {
        setFormData({
            ...formData,
            [id]: event.target.value,
        });
    };

    const checkValidateInput = () => {
        let isValid = true;
        let arrInput = ['name','email', 'password', 'image', 'gender', 'buildingId', 'buildingName', 'phoneNumber'];
        for (let i = 0; i < arrInput.length; i++) {
            if (!formData[arrInput[i]]) {
                isValid = false;
                showErrorToast(`Missing parameter: ${arrInput[i]}`);
                break;
            }
        }
        return isValid;
    };

    const handleAddNewUser = () => {
        let isValid = checkValidateInput();
        if (isValid) {
            //call api create modal
            createNewUser(formData);

            setFormData({
                name: '',
                email: '',
                password: '',
                image: '',
                gender: '',
                buildingId: '',
                buildingName: '',
                phoneNumber: '',
            });

            toggle();
        }
    };

    return ( 
        <Modal
            isOpen={isOpen}
            toggle={toggle}
            className={"modal-user-container"}
            size="lg"
        >
            <ModalHeader toggle={toggle}>
                Create a new user
            </ModalHeader>
            <ModalBody>
                <div className="modal-user-body">
                <div className="input-container">
                        <label>Name</label>
                        <input
                            type="text"
                            onChange={(event) => handleOnChangeInput(event, 'name')}
                            value={formData.name}
                        />
                    </div>
                    <div className="input-container">
                        <label>Email</label>
                        <input
                            type="text"
                            onChange={(event) => handleOnChangeInput(event, 'email')}
                            value={formData.email}
                        />
                    </div>
                    <div className="input-container">
                        <label>Password</label>
                        <input
                            type="password"
                            onChange={(event) => handleOnChangeInput(event, 'password')}
                            value={formData.password}
                        />
                    </div>
                    <div className="input-container">
                        <label>Image</label>
                        <input
                            type="text"
                            onChange={(event) => handleOnChangeInput(event, 'image')}
                            value={formData.image}
                        />
                    </div>
                    <div className="input-container">
                        <label>Gender</label>
                        <input
                            type="text"
                            onChange={(event) => handleOnChangeInput(event, 'gender')}
                            value={formData.gender}
                        />
                    </div>
                    <div className="input-container">
                        <label>Building Id</label>
                        <input
                            type="text"
                            onChange={(event) => handleOnChangeInput(event, 'buildingId')}
                            value={formData.buildingId}
                        />
                    </div>
                    <div className="input-container">
                        <label>Building Name</label>
                        <input
                            type="text"
                            onChange={(event) => handleOnChangeInput(event, 'buildingName')}
                            value={formData.buildingName}
                        />
                    </div>
                    <div className="input-container">
                        <label>Phone number</label>
                        <input
                            type="text"
                            onChange={(event) => handleOnChangeInput(event, 'phoneNumber')}
                            value={formData.phoneNumber}
                        />
                    </div>
                </div>
            </ModalBody>
            <ModalFooter>
                <Button
                    color="primary"
                    className="px-3"
                    onClick={handleAddNewUser}
                >
                    Add new
                </Button>{" "}
                <Button
                    color="secondary"
                    className="px-3"
                    onClick={toggle}
                >
                    Close
                </Button>
            </ModalFooter>
        </Modal>
     );
}

export default ModalMember;