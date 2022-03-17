import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import DraggableModal from './DraggableModal';
import globalStyles from '../../util/style';
import Title from '../../components/Title/index';

const SettingScreen = () => {
  const modalRef = React.useRef();

  const openModal = () => {
    modalRef.current.show();
  };

  return (
    <SafeAreaView style={globalStyles.safeArea}>
      <Title text={'Setting'} />
      <View style={styles.container}>
        {/* <TouchableOpacity style={styles.optionContainer} onPress={openModal}>
          <View style={styles.option}>
            <Text style={styles.text}>Buy me a coffee</Text>
            <Image
              source={require('../../assets/image/coffee-cup.png')}
              style={styles.icon}
            />
          </View>
        </TouchableOpacity> */}
        <DraggableModal ref={modalRef} />

        <TouchableOpacity style={styles.optionContainer} onPress={openModal}>
          <View style={styles.option}>
            <Text style={styles.text}>About us</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  optionContainer: {
    height: 70,
    backgroundColor: 'rgba(0,0,0,.6)',
    borderRadius: 8,
    marginBottom: 20,
    marginTop: 10,
  },
  option: {
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#000',
    backgroundColor: '#FFF',
    transform: [{translateX: -5}, {translateY: -5}],
  },
  text: {
    fontSize: 24,
    fontWeight: '500',
  },
  icon: {
    width: 50,
    height: 50,
  },
});
