import React from 'react';
import { StyleSheet, Text, View, Image, StatusBar, ScrollView} from 'react-native';


export default function FlatListItem({item}) {
    return(
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor='#40404c'/>
            <Image
                source={{uri : item.Image}}
                style={styles.image}
            >

            </Image>
            <View style={styles.Item}>
                <Text style={styles.text}>{item.Nom}</Text>
                <Text style={styles.text}>{item.Adresse}</Text>
            </View>
            <View styles={styles.border}></View>
        </View>
    );
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        flexDirection : 'row',
        backgroundColor:"#465881",
        borderRadius : 20,
        marginBottom : 10,
    },
    image :{
        width:150,
        height:150,
        margin : 5,
        borderRadius : 10,
    },
    Item :{
        flex : 1,
        flexDirection : 'column',
    },
    text:{
        flex :1,
        flexDirection: 'row',
        fontSize : 18,
        padding : 10,
        color : 'white',
    },
    border :{
        height : 1,
        backgroundColor : 'white',
    }
});