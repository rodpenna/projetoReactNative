import React, { useState } from "react";
import { Button, Text, View } from "react-native";
import Modal from "react-native-modal";

function ModalTester() {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  function closeModal(){
    let timer1 = setTimeout(() => {
        toggleModal()
    }, 3000);
  }


  return (
    <View style={{ flex: 1 }}>
      {toggleModal()}

      <Modal isVisible={isModalVisible}>
        <View style={{ flex: 1 }}>
          <Text>Hello!</Text>

         
        </View>
       
      </Modal>
      {closeModal()}
    </View>
  );
}

export default ModalTester;