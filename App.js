import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useFonts, Lobster_400Regular } from '@expo-google-fonts/lobster';
import { ActivityIndicator } from 'react-native';

import Home from './src/screens/Home';
import Phrases from './src/screens/Phrases';

const Tab = createBottomTabNavigator();

export default function App() {
  function TabsPhrases() {
    return (
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#ffffff',
          tabBarStyle: {
            backgroundColor: '#000000',
            borderTopColor: '#000000',
          }
        }}
        initialRouteName='Home'
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarLabel: 'Frases',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name='arm-flex' color={color} size={30} />
            )
          }}
        />
        <Tab.Screen
          name="Phrases"
          component={Phrases}
          options={{
            tabBarLabel: 'Todas as frases',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name='format-list-bulleted' color={color} size={30} />
            )
          }}
        />
      </Tab.Navigator>
    )
  }

  let [fontsLoaded] = useFonts({ Lobster_400Regular });

  if (!fontsLoaded) {
    return <ActivityIndicator />
  }

  return (
    <NavigationContainer>
      <TabsPhrases />
    </NavigationContainer>
  )
}
