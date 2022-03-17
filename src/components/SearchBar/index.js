import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {SCREEN_WIDTH} from '../../util/size';

const SearchBar = props => {
  const {submitHandle, changeTextHandle, clearTextHandle} = props;
  const [visible, setVisible] = React.useState(false);
  const inputRef = React.useRef();

  const _onChangeText = value => {
    if (value) {
      setVisible(true);
    } else {
      setVisible(false);
    }
    changeTextHandle(value);
  };

  const clearText = () => {
    inputRef.current.clear();
    setVisible(false);
    clearTextHandle();
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <TouchableOpacity style={styles.search} onPress={() => {}}>
          <IconIonicons name="search-sharp" size={20} color={'#000'} />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder={'Search...'}
          ref={inputRef}
          onChangeText={_onChangeText}
          onSubmitEditing={submitHandle}
        />
        {visible && (
          <TouchableOpacity style={styles.delete} onPress={clearText}>
            <IconMaterialIcons name="clear" size={20} color={'#000'} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH,
    height: 50,
    backgroundColor: '#FFF',
    paddingHorizontal: 10,
    marginTop: 10,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
    borderColor: '#000',
    borderWidth: 2,
    borderRadius: 8,
  },
  input: {
    flex: 1,
    marginHorizontal: 5,
  },
  search: {},
  delete: {},
});
