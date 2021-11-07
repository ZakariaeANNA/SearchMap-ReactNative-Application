import React,{useState} from 'react';
import { StyleSheet, TextInput, View, FlatList, TouchableOpacity, StatusBar, Alert} from 'react-native';
import * as firebase from 'firebase';
import KeyApi from '../constants/keyApi';
import { LogBox } from 'react-native';
import FlatListItem from './FlatListItem';

if(!firebase.apps.length)
    firebase.initializeApp(KeyApi.firebaseConfig);

LogBox.ignoreLogs(['Setting a timer for a long period of time']);

const db = firebase.firestore();
const storage = firebase.storage();

export default function Lister({navigation}) {
    const [categorie,setcategorie] = useState(null);
    const [ville,setville] = useState(null);
    const [lieu,setlieu] = useState([]);
    const [isRender,setisRender] = useState(false);
    var items = [];
    const renderData = (doc,url) => {
        items.push({ id : doc.id , 
                            Nom : doc.data().Nom , 
                            Adresse : doc.data().Adresse , 
                            Ville : doc.data().Ville ,
                            Location : doc.data().Location,
                            Categorie : doc.data().Categorie,
                            Image : url});
        setlieu(items);
    }

    const selectPlace = () => {
        var Lieu = db.collection('Lieu');
        if(!ville && categorie){
            Lieu = Lieu.where('Categorie','==',categorie);
        }else if (ville && !categorie){
            Lieu = Lieu.where('Ville','==',ville);
        }else if(ville && categorie){
            console.log(ville+" "+categorie+"3");
            Lieu = Lieu.where('Ville','==',ville).where('Categorie','==',categorie);
        }else if(!ville && !categorie){
            Alert.alert("Merci de remplir l'un des deux champs.");
            return;
        }
        Lieu.get()
              .then((snapshot) => {
                  snapshot.docs.forEach(doc =>{
                        storage.ref().child('Lieu/'+doc.id+"/image")
                            .getDownloadURL().then((url)=>{
                                renderData(doc,url);
                            });
                  })
                  items=[];
              });
        setisRender(!isRender);
    } 

    return(
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor='#40404c'/>
            <View style={styles.input}>
                <View style={styles.inputView} >
                    <TextInput  
                        value={categorie}
                        style={styles.inputText}
                        placeholder="Categorie.." 
                        placeholderTextColor="#003f5c"
                        onChangeText={value => setcategorie(value)}
                        onSubmitEditing={selectPlace}
                    />
                </View>
                <View style={styles.inputView} >
                    <TextInput  
                        value={ville}
                        style={styles.inputText}
                        placeholder="Ville.." 
                        placeholderTextColor="#003f5c"
                        onChangeText={value => setville(value)}
                        onSubmitEditing={selectPlace}
                    />
                </View>
            </View>
            <View style={styles.list}>
                <FlatList 
                    data={lieu}
                    keyExtractor = {item =>item.id}
                    extraData={isRender}
                    initialNumToRender={10}
                    windowSize={5}
                    maxToRenderPerBatch={5}
                    updateCellsBatchingPeriod={30}
                    removeClippedSubviews={false}
                    onEndReachedThreshold={0.1}
                    renderItem={({item})=>
                        <TouchableOpacity onPress={()=> navigation.navigate('DDD',item)}>
                           <FlatListItem item={item} /> 
                        </TouchableOpacity>
                    }
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        padding : "5%",
        backgroundColor : '#EEDEDB',
    },
    inputView:{
        flex:1,
        borderColor:"#465881",
        borderWidth : 2,
        marginBottom:20,
        justifyContent:"center",
        padding:20,
        marginLeft: 10,
        marginRight: 10,
      },
    inputText:{
        fontSize : 30,
        color:"black",
    },
    input:{
        flexDirection:'row',
    },
    list :{
        marginBottom : 70,
    }
});