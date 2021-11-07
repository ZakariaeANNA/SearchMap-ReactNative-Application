import React from 'react';
import { AsyncStorage, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Navigator from './HomeNavigator';
import Lieu from '../Components/Lieu';
import Position from '../Components/Position';
import { Entypo } from '@expo/vector-icons'; 

const Main = createStackNavigator();

const Logout = async({navigation}) => {
    await AsyncStorage.clear();
    navigation.navigate('Auth');
}

const options={
    title : "SearchMap",
    headerTintColor:"white",
    headerTitleAlign: "center",
};



const TopNav = ({navigation}) =>{
    return (
            <Main.Navigator 
                screenOptions={{
                    headerStyle: {
                        backgroundColor: '#2b2b39',
                        
                    },
                    headerTitleStyle: {
                        color: 'white',
                        fontWeight : 'bold',
                        fontSize : 25,
                    },
                }}
            >
                <Main.Screen
                    name="TopN" 
                    component={Navigator} 
                    options={{
                        ...options,
                        headerLeft: () => (
                            null
                        ),
                        headerRight: () => (
                            <TouchableOpacity style={{padding:20,}} onPress={()=>Logout({navigation})}>
                                <Entypo name="log-out" size={24} color="white" />
                            </TouchableOpacity>
                        ),
                    }}
                />
                <Main.Screen
                    name="DDD" 
                    component={Lieu} 
                    options={{
                        ...options,
                        headerRight: () => (
                            <TouchableOpacity style={{padding:20,}} onPress={()=>Logout({navigation})}>
                                <Entypo name="log-out" size={24} color="white" />
                            </TouchableOpacity>
                        ),
                    }}
                    
                />
                <Main.Screen
                    name="Position" 
                    component={Position} 
                    options={{
                        ...options,
                        headerRight: () => (
                            <TouchableOpacity style={{padding:20,}} onPress={()=>Logout({navigation})}>
                                <Entypo name="log-out" size={24} color="white" />
                            </TouchableOpacity>
                        ),
                    }}
                />
            </Main.Navigator>
   
);
} 

export default TopNav;