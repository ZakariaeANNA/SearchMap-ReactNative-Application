import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import { Ionicons } from '@expo/vector-icons'; 
import Carte from '../Components/Carte';
import Ajouter from '../Components/Ajouter';
import Lister from '../Components/Lister';

const Main = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const MainTabScreen = () => {
    return (
        <Tab.Navigator
            initialRouteName="Ajouter"
            activeColor="#fff"
            barStyle ={{
                height: 80,
                backgroundColor: '#40404c',
                paddingBottom: 3,
                paddingTop: 3,
                justifyContent: 'center',
                alignItems: 'center',
                alignContent: 'center',
                width:"100%",
            }}
        >
            <Tab.Screen
                name="Carte"
                component={Carte}
                options={{
                    title:"Carte",
                    headerTintColor:"white",
                    tabBarIcon: ({tintColor}) => (
                        <View style={styles.iconCOntainer}>
                        <Ionicons name="map-sharp" size={24} color="orange" />
                        </View>
                    ),
                }}
            />
            <Tab.Screen
                name="Ajouter"
                component={Ajouter}
                options={{
                    tabBarVisible: false,
                    headerTintColor:"white",
                    tabBarIcon: ({tintColor}) => (
                        <View style={styles.iconCOntainer}>
                        <Ionicons name="add-circle" size={24} color="orange" />
                        </View>
                    ),
                }}
            />
            <Tab.Screen
                name="Lister"
                component={Lister}
                options={{
                    headerTintColor:"white",
                    tabBarIcon: ({tintColor}) => (
                        <View style={styles.iconCOntainer}>
                        <Ionicons name="list" size={24} color="orange" />
                        </View>
                    ),
                }}
            />

        </Tab.Navigator>
);
}

const styles = StyleSheet.create({
    iconCOntainer: {
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
    },
});



export default MainTabScreen;

