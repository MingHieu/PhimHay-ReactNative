import React from 'react';
import {Image, StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';

const LazyImage = props => {
  const {source, style} = props;
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (!loading) return;
    if (source.uri == '') {
      setLoading(false);
      return;
    }
  }, [loading]);

  const _onLoadStart = () => {
    setLoading(true);
  };

  const _onLoadEnd = () => {
    setLoading(false);
  };

  // Image error handle
  if (source.uri == '')
    return (
      <View
        style={{
          width: style.width,
          height: style.height,
          borderRadius: style.borderRadius,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'hsl(200,20%,95%)',
        }}>
        <IconMaterialIcons name="error-outline" size={40} color={'grey'} />
        <Text
          style={{
            textAlign: 'center',
            fontSize: 14,
            color: 'grey',
            marginTop: 10,
          }}>
          Some thing went wrong
        </Text>
      </View>
    );

  return (
    <View>
      {loading && (
        <View
          style={{
            position: 'absolute',
            width: style.width,
            height: style.height,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'hsl(200,20%,95%)',
            borderRadius: style.borderRadius,
          }}>
          <ActivityIndicator size="small" color="grey" />
        </View>
      )}
      <Image
        source={source}
        style={style}
        onLoadStart={_onLoadStart}
        onLoadEnd={_onLoadEnd}
      />
    </View>
  );
};

export default React.memo(LazyImage);
