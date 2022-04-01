import {useTheme} from '@react-navigation/native';
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Title from '../../components/Title/index';
import Toggle from '../../components/Toggle';
import {changeTheme} from '../../core/redux/themeSlice';
import {DARK_MODE} from '../../core/storage';
import {useGlobalStyle} from '../../shared/hook';
import DraggableModal from './DraggableModal';

const SettingScreen = () => {
  const modalRef = React.useRef();
  const [darkMode, setDarkMode] = React.useState(false);
  const theme = useSelector(state => state.theme);
  const dispatch = useDispatch();
  const globalStyles = useGlobalStyle();
  const {colors} = useTheme();

  const openModal = () => {
    modalRef.current.show();
  };

  React.useEffect(() => {
    if (theme.value == 'light') setDarkMode(false);
    else setDarkMode(true);
  }, []);

  const darkModeHanlde = () => {
    if (darkMode) {
      dispatch(changeTheme('light'));
    } else {
      dispatch(changeTheme('dark'));
    }
    DARK_MODE.set(!darkMode);
    setDarkMode(prev => !prev);
  };

  return (
    <SafeAreaView style={globalStyles.safeArea}>
      <Title text={'Setting'} />
      <View style={[globalStyles.container, styles.container]}>
        {/* <TouchableOpacity
          style={[styles.optionContainer, globalStyles.optionContainer]}
          onPress={openModal}>
          <View style={[styles.option, globalStyles.option]}>
            <Text style={styles.text}>Buy me a coffee</Text>
            <Image
              source={require('../../assets/image/coffee-cup.png')}
              style={styles.icon}
            />
          </View>
        </TouchableOpacity> */}
        <DraggableModal ref={modalRef} />

        <View style={[styles.optionContainer, globalStyles.optionContainer]}>
          <View style={[styles.option, globalStyles.option]}>
            <Text style={[globalStyles.text, styles.text]}>Dark Mode</Text>
            <Toggle value={darkMode} onValueChange={darkModeHanlde} />
          </View>
        </View>

        <TouchableOpacity
          style={[styles.optionContainer, globalStyles.optionContainer]}
          onPress={openModal}>
          <View style={[styles.option, globalStyles.option]}>
            <Text style={[globalStyles.text, styles.text]}>About Us</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  optionContainer: {
    height: 70,
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
