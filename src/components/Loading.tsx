import React from 'react';
import {View, ActivityIndicator, StyleSheet, Modal, Text} from 'react-native';

interface LoadingProps {
  visible: boolean;
}

const Loading: React.FC<LoadingProps> = ({visible}) => {
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="none"
      onRequestClose={() => {}}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#ffffff" />
          <Text style={styles.text}>Loading...</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Yarı saydam siyah arka plan
  },
  container: {
    width: 120,
    height: 120,
    backgroundColor: 'rgba(0, 0, 0, 0.8)', // Yarı saydam koyu arka plan
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    color: '#ffffff',
    marginTop: 10,
    fontSize: 16,
  },
});

export default Loading;
