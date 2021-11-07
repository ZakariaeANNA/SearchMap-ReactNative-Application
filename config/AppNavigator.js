import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Auth from './AuthNavigator';
import App from './LieuNavigator';
import AuthLoadingScreen from '../Components/AuthLoadingScreen';
const Main = createStackNavigator();

const TopNav = () =>{
    return (
        <NavigationContainer> 
            <Main.Navigator 
                initialRouteName="AuthLoading"
                screenOptions={{
                    headerShown: false,
                }}
                
            >
                <Main.Screen
                    name="AuthLoading" 
                    component={AuthLoadingScreen} 
                />
                <Main.Screen
                    name="Auth" 
                    component={Auth} 
                />
                <Main.Screen
                    name="App" 
                    component={App} 
                />
            </Main.Navigator>
        </NavigationContainer>
   
);
} 

export default TopNav;