import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Signup from '../Components/Authentification/Signup';
import Login from '../Components/Authentification/Login';

const Main = createStackNavigator();

const TopNav = () =>{
    return (
            <Main.Navigator 
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Main.Screen
                    name="Login" 
                    component={Login} 
                />
                <Main.Screen
                    name="Signup" 
                    component={Signup} 
                />
            </Main.Navigator>
   
);
} 

export default TopNav;