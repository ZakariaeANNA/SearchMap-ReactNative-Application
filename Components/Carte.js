import React,{useEffect,useState} from 'react';
import { StyleSheet, StatusBar, View, FlatList, Alert, Button, TouchableOpacity, Dimensions,ActivityIndicator} from 'react-native';
import MapView , { Marker } from 'react-native-maps';
import * as firebase from 'firebase';
import KeyApi from '../constants/keyApi';
import { LogBox } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 
import * as Location from 'expo-location';



if(!firebase.apps.length)
    firebase.initializeApp(KeyApi.firebaseConfig);

LogBox.ignoreLogs(['Setting a timer for a long period of time']);

const db = firebase.firestore();
const storage = firebase.storage();

export default function Carte({navigation}) {
    const [region, setRegion] = useState({latitude : 35.0677, 
                                            longitude : -7.8977,
                                            latitudeDelta: 0.015,
                                            longitudeDelta: 0.0121});
    const [position, setPosition] = useState([]);
    var items = [];
    const renderData = (doc,url) => {
        items.push({ id : doc.id , 
                            Nom : doc.data().Nom , 
                            Adresse : doc.data().Adresse , 
                            Ville : doc.data().Ville ,
                            Location : doc.data().Location,
                            Categorie : doc.data().Categorie,
                            Image : url});
    }

    const myLocation = async() => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status == 'granted') {
                let location = await Location.getCurrentPositionAsync({});
                setRegion({latitude : location.coords.latitude, 
                           longitude : location.coords.longitude,
                           latitudeDelta: 0.015,
                           longitudeDelta: 0.0121});
            }
    }
    

    const positions = () => {
        db.collection('Lieu')
        .get()
        .then((snapshot) => {
            snapshot.docs.forEach(doc =>{
                storage.ref().child('Lieu/'+doc.id+"/image")
                    .getDownloadURL().then((url)=>{
                        renderData(doc,url);
                    });
            });  
        });
        myLocation();
    }

    useEffect(() => {
        positions();
        setTimeout(() => setPosition(items), 4000);
    }, []);
    return(
        <View>
            <StatusBar barStyle="light-content" backgroundColor='#40404c'/>
            <MapView 
                     style={styles.map}
                     loadingEnabled={true}
                     region={region}
            >
                {position
                ? position.map((position) => ( 
                    <Marker
                        coordinate={{latitude: position.Location._lat , longitude: position.Location._long}}
                        title={position.Nom}
                        description={position.Adresse}
                        key={position.id}
                        onPress={()=> navigation.navigate('DDD',position)}
                        tracksViewChanges={false}
                    >
                        <MaterialIcons name="public" size={30} color="red" />
                    </Marker>
                    ))
                : null}
            </MapView>
        </View>
    );
}
const styles = StyleSheet.create({
    map:{
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height
    }
  })