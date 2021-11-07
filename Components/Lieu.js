import React,{useState} from 'react';
import { StyleSheet, Text, View, StatusBar ,Image, TouchableOpacity, ScrollView} from 'react-native';

export default function Lieu({navigation,route}) {
    var Location = route.params.Location;
    return(
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor='#40404c'/>
            <Image
                resizeMode={'center'}
                source={{uri : route.params.Image}}
                style={styles.image}
            ></Image>
            <Text numberOfLines={1} adjustsFontSizeToFit style={styles.title}>{route.params.Nom}</Text>
            <Text numberOfLines={1} adjustsFontSizeToFit style={styles.item}>Adresse: {route.params.Adresse}</Text>
            <Text numberOfLines={1} adjustsFontSizeToFit style={styles.item}>Ville: {route.params.Ville}</Text>
            <Text numberOfLines={1} adjustsFontSizeToFit style={styles.item}>Categorie: {route.params.Categorie}</Text>
            <TouchableOpacity style={styles.Btn} onPress={()=>navigation.navigate("Position", {'Location':Location} )}>
                <Text style={styles.Text}>Afficher dans la carte</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container : {
        flex:1,
        padding : "5%",
        justifyContent : 'center',
        alignItems : 'center',
        backgroundColor : '#EEDEDB',
    },
    image :{
        width:"100%",
        height:"35%",
        margin : 5,
        borderRadius : 10,
    },
    title :{
        fontSize : 35,
        fontWeight : 'bold',
        marginTop: 10,
    },
    item :{
        fontSize : 30,
    },
    Btn:{
        backgroundColor: '#2b2b39',
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:40,
        marginBottom:10,
        borderRadius : 23,
    },
    Text:{
        color:"white",
        fontSize : 30,
        padding : 20,
    },
});