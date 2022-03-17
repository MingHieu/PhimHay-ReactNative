import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {Text} from 'react-native';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import IconMaterial from 'react-native-vector-icons/MaterialIcons';
import CategoryScreen from '../views/Discover/Category';
import DiscoverScreen from '../views/Discover/index';
import HomeScreen from '../views/Home/index';
import MovieDetail from '../views/MovieDetail/index';
import SearchScreen from '../views/Search/index';
import SettingScreen from '../views/Setting/index';
import WatchScreen from '../views/Watch/index';
import CategoryDetail from '../views/Discover/CategoryDetail/index';
import SplashScreen from '../views/SplashScreen/index';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const DiscoverStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Discover" component={DiscoverScreen} />
      <Stack.Screen name="Category" component={CategoryScreen} />
      <Stack.Screen name="CategoryDetail" component={CategoryDetail} />
    </Stack.Navigator>
  );
};

const HomeTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({route, navigation}) => ({
        // tabBarShowLabel: false,
        headerShown: false,
        tabBarActiveTintColor: 'red',
        tabBarInactiveTintColor: 'black',
        tabBarIcon: ({focused, color, size}) => {
          if (route.name == 'Home')
            return <IconFontAwesome name="home" size={23} color={color} />;
          if (route.name == 'DiscoverStack')
            return <IconMaterial name="explore" size={23} color={color} />;
          if (route.name == 'Search')
            return <IconFontAwesome name="search" size={23} color={color} />;
          if (route.name == 'Setting')
            return (
              <IconIonicons name="settings-sharp" size={23} color={color} />
            );
        },
      })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen
        name="DiscoverStack"
        component={DiscoverStack}
        options={{title: 'Discover'}}
      />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Setting" component={SettingScreen} />
    </Tab.Navigator>
  );
};

const AppSource = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          // statusBarHidden: true,
          orientation: 'portrait',
        }}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen
          name="HomeTab"
          component={HomeTabs}
          options={{
            animation: 'fade',
          }}
        />
        <Stack.Screen name="MovieDetail" component={MovieDetail} />
        <Stack.Screen
          name="WatchScreen"
          component={WatchScreen}
          options={{
            orientation: 'all',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppSource;
