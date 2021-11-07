import React,{useEffect} from 'react';
import { ActivityIndicator, Text, View, Picker, TextInput, TouchableOpacity,Modal, Dimensions, StatusBar, AsyncStorage} from 'react-native';

export default function AuthLoadingScreen({navigation}) {

    const load = async() => {
        const userID = await AsyncStorage.getItem('userID');
        if(userID)
            navigation.navigate('App');
        else
            navigation.navigate('Auth');
    }

    useEffect(() => {
       load();
    });

    return(
        <View>
            <ActivityIndicator />
        </View>
    ); 
}