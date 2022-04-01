import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import IconMaterial from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';
import {changeTheme} from '../core/redux/themeSlice';
import {DARK_MODE} from '../core/storage/';
import {DarkTheme, LightTheme} from '../shared/theme';
import CategoryScreen from '../views/Discover/Category';
import CategoryDetail from '../views/Discover/CategoryDetail/index';
import DiscoverScreen from '../views/Discover/index';
import HomeScreen from '../views/Home/index';
import MovieDetail from '../views/MovieDetail/index';
import SearchScreen from '../views/Search/index';
import SettingScreen from '../views/Setting/index';
import SplashScreen from '../views/SplashScreen/index';
import WatchScreen from '../views/Watch/index';
import {APP_SCREEN_TYPES} from './screenTypes';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const DiscoverStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name={APP_SCREEN_TYPES.DISCOVER}
        component={DiscoverScreen}
      />
      <Stack.Screen
        name={APP_SCREEN_TYPES.CATEGORY}
        component={CategoryScreen}
      />
      <Stack.Screen
        name={APP_SCREEN_TYPES.CATEGORY_DETAIL}
        component={CategoryDetail}
      />
    </Stack.Navigator>
  );
};

const HomeTab = () => {
  const theme = useSelector(state => state.theme);

  return (
    <Tab.Navigator
      screenOptions={({route, navigation}) => ({
        // tabBarShowLabel: false,
        headerShown: false,
        tabBarActiveTintColor: 'red',
        tabBarInactiveTintColor: theme.value == 'light' ? '#000' : '#3C3C3C',
        tabBarIcon: ({focused, color, size}) => {
          if (route.name == APP_SCREEN_TYPES.HOME)
            return <IconFontAwesome name="home" size={23} color={color} />;
          if (route.name == APP_SCREEN_TYPES.DISCOVER_STACK)
            return <IconMaterial name="explore" size={23} color={color} />;
          if (route.name == APP_SCREEN_TYPES.SEARCH)
            return <IconFontAwesome name="search" size={23} color={color} />;
          if (route.name == APP_SCREEN_TYPES.SETTING)
            return (
              <IconIonicons name="settings-sharp" size={23} color={color} />
            );
        },
      })}>
      <Tab.Screen name={APP_SCREEN_TYPES.HOME} component={HomeScreen} />
      <Tab.Screen
        name={APP_SCREEN_TYPES.DISCOVER_STACK}
        component={DiscoverStack}
        options={{title: 'Discover'}}
      />
      <Tab.Screen name={APP_SCREEN_TYPES.SEARCH} component={SearchScreen} />
      <Tab.Screen name={APP_SCREEN_TYPES.SETTING} component={SettingScreen} />
    </Tab.Navigator>
  );
};

const MenuDrawer = () => {
  return (
    <Drawer.Navigator
      initialRouteName={APP_SCREEN_TYPES.HOME_TAB}
      screenOptions={{
        headerShown: false,
        drawerType: 'slide',
      }}>
      <Drawer.Screen name={APP_SCREEN_TYPES.HOME_TAB} component={HomeTab} />
    </Drawer.Navigator>
  );
};

const AppSource = () => {
  const theme = useSelector(state => state.theme);
  const dispatch = useDispatch();

  React.useEffect(() => {
    DARK_MODE.get()
      .then(res => {
        if (res) dispatch(changeTheme('dark'));
        else dispatch(changeTheme('light'));
      })
      .catch(e => dispatch(changeTheme('light')));
  }, []);

  return (
    <NavigationContainer
      theme={theme.value == 'light' ? LightTheme : DarkTheme}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          // statusBarHidden: true,
          orientation: 'portrait',
        }}>
        <Stack.Screen
          name={APP_SCREEN_TYPES.SPLASH_SCREEN}
          component={SplashScreen}
        />
        <Stack.Screen
          name={APP_SCREEN_TYPES.MENU_DRAWER}
          component={MenuDrawer}
          options={{
            animation: 'fade',
          }}
        />
        <Stack.Screen
          name={APP_SCREEN_TYPES.MOVIE_DETAIL}
          component={MovieDetail}
        />
        <Stack.Screen
          name={APP_SCREEN_TYPES.WATCH_SCREEN}
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
