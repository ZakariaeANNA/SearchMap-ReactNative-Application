import React,{useState} from 'react';
import { StyleSheet, Text, ActivityIndicator , View, Picker, TextInput, TouchableOpacity,Modal, Dimensions, ScrollView, StatusBar,Alert, AsyncStorage} from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import * as ImagePicker from 'expo-image-picker';
import MapView from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons'; 
import * as firebase from 'firebase';
import KeyApi from '../constants/keyApi';
import { LogBox } from 'react-native';
import * as Location from 'expo-location';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';



const ReviewForm = yup.object({
    Nom : yup.string().required('Le nom est obligatoire'),
    Adresse : yup.string().required("L'adresse est obligatoire"),
    Ville : yup.string().required("Ville est obligatoire"),
    imageuri : yup.string().required("L'image est obligatoire"),
    Categorie : yup.string().required("Categorie est obligatoire"),
    latitude : yup.string().required("Latitude est obligatoire"),
    longitude : yup.string().required("Longitude est obligatoire"),
});

if(!firebase.apps.length)
    firebase.initializeApp(KeyApi.firebaseConfig);
LogBox.ignoreLogs(['Setting a timer for a long period of time']);

const db = firebase.firestore();
const storage = firebase.storage();
export default function Ajouter() {
    const [modal,setmodal] = useState(false);
    const [coordinate,setcoordinate] = useState();
    const [selectedValue, setSelectedValue] = useState();
    const [region, setRegion] = useState({
        latitude: 34.78825,
        longitude: -4.9324,
        latitudeDelta: 5.015,
        longitudeDelta: 2.0121
    });
    
    const getLocation = (values,coordinate) => {
        setcoordinate(coordinate);
        values.latitude = coordinate.latitude;
        values.longitude = coordinate.longitude;
    }

    const Camera = async(values) => {
        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status == 'granted') {
                let result = await ImagePicker.launchCameraAsync({
                })
                if (!result.cancelled) {
                    values.imageuri = result.uri;
                    console.log(result.uri);
                }
            }
        }
    }

    const Telephone = async(values) => {
        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status == 'granted') {
                let result = await ImagePicker.launchImageLibraryAsync({
                })
                if (!result.cancelled) {
                    values.imageuri = result.uri;
                }
            }
        }
    }

    const pickImage = (values) => {
        Alert.alert(
            "CHOISIR UN IMAGE",
            "Choisir Par camera pour prendre une photo ou par telephone et choisir une photo",
            [
              {
                text: "Cancel",
                style: "cancel"
              },
              { text: "A partir de telephone", onPress: () => Telephone(values) },
              { text: "Par Camera", onPress: () => Camera(values) }
            ]
        );
        
    }

    const changepick = (itemValue,values) => {
        setSelectedValue(itemValue);
        values.Categorie = itemValue; 
    }

    const uploadImage = async (uri, imageName) => {
        const response = await fetch(uri);
        const blob = await response.blob();
    
        var ref = firebase.storage().ref().child("Lieu/"+imageName+"/image");
        ref.put(blob);
    }


    return(
            <Formik
                initialValues={{Nom:'',Adresse:'',Ville:'',Categorie:'',imageuri:'',latitude:'',longitude:''}}
                validationSchema={ReviewForm}
                onSubmit={async(values,actions) => {
                    actions.setSubmitting(true);
                    var userID = await AsyncStorage.getItem('userID');
                    db.collection('Lieu').add({
                        UserID : userID,
                        Nom : values.Nom, 
                        Adresse : values.Adresse,
                        Ville : values.Ville,
                        Categorie : values.Categorie,
                        Location : new firebase.firestore.GeoPoint(values.latitude,values.longitude),
                    }).then((cred) => {
                        uploadImage(values.imageuri,cred.id);
                        alert("Lieu est ajouté avec succes");
                    })
                    actions.resetForm();
                }}
            >
            {(props) => (
            
            <View style={styles.form}>
                <StatusBar barStyle="light-content" backgroundColor='#40404c'/>
                 <Modal visible={modal} animationType='slide' >
                    <Ionicons style={{flex: 1,}} name="close" size={54} color="black" onPress={() => setmodal(false)}/>
                    <MapView 
                            style={styles.map}
                            loadingEnabled={true}
                            region={region}
                            onRegionChangeComplete={region => setRegion(region)}
                            onPress={ (event) => getLocation(props.values,event.nativeEvent.coordinate)}
                    >
                        {
                            coordinate && 
                            <MapView.Marker coordinate={coordinate}/>
                        }
                        
                    </MapView>
                    <TouchableOpacity style={styles.Done} onPress={()=>setmodal(false)}>
                        <Text style={styles.Text}>Terminer</Text>
                    </TouchableOpacity>
                </Modal>
                <ScrollView>
                    <Text style={styles.inputText}>{props.touched.Nom && props.errors.Nom}</Text>
                    <View style={styles.inputView} >
                        <TextInput  
                            style={styles.inputText}
                            placeholder="Nom..." 
                            placeholderTextColor="#003f5c"
                            onChangeText={props.handleChange('Nom')}
                            value={props.values.Nom}
                        />
                    </View>
                     <Text style={styles.inputText}>{props.touched.Adresse && props.errors.Adresse}</Text>
                    <View style={styles.inputView} >
                        <TextInput  
                            multiline
                            style={styles.inputText}
                            placeholder="Adresse..." 
                            placeholderTextColor="#003f5c"
                            onChangeText={props.handleChange('Adresse')}
                            value={props.values.Adresse}
                        />
                    </View>
                   <Text style={styles.inputText}>{props.touched.Ville && props.errors.Ville}</Text>
                    <View style={styles.inputView} >
                        <TextInput  
                            multiline
                            style={styles.inputText}
                            placeholder="Ville..." 
                            placeholderTextColor="#003f5c"
                            onChangeText={props.handleChange('Ville')}
                            value={props.values.Ville}
                        />
                    </View>
                    <Text style={styles.inputText}>{props.touched.Categorie && props.errors.Categorie}</Text>
                    <View style={styles.inputView} >
                        <Picker
                            style={styles.inputText}
                            selectedValue={selectedValue}
                            onValueChange={(itemValue,itemIndex) => changepick(itemValue,props.values)}
                        >
                            <Picker.Item label="Restaurant" value="Restaurant" style={styles.Text} />
                            <Picker.Item label="Pharmacie" value="Pharmacie" style={styles.Text} />
                            <Picker.Item label="Place publique" value="Place publique" style={styles.Text} />
                            <Picker.Item label="Autres" value="Autres" style={styles.Text} />
                        </Picker>
                    </View>
                    <Text style={styles.inputText}>{props.touched.imageuri && props.errors.imageuri}</Text>
                    <TouchableOpacity style={styles.inputView} onPress={()=>pickImage(props.values)}>
                        <Text style={styles.inputText}> Choisir un image... </Text>
                    </TouchableOpacity>


                    { props.errors.latitude ? (
                        <Text style={styles.inputText}>Localisation est obligatoire. </Text>
                    ) : (
                        <Text></Text>
                    )}
                    <TouchableOpacity style={styles.inputView} onPress={()=>setmodal(true)}>
                        <Text style={styles.inputText}> [{props.values.latitude},{props.values.longitude}] </Text>
                    </TouchableOpacity>
                    

                    {props.isSubmitting ? (
                        <TouchableOpacity style={styles.Btn} >
                            <ActivityIndicator color="white" size="large"/>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity style={styles.Btn} onPress={props.handleSubmit}>
                            <Text style={styles.Text}>Add</Text>
                        </TouchableOpacity>
                    )}
                </ScrollView>
            </View>
            )}
        </Formik> 
    );
}

const styles = StyleSheet.create({
    form: {
        flex:1,
        justifyContent: 'center',
        padding : "5%",
        backgroundColor : '#EEDEDB',
    },
    Btn:{
        backgroundColor:"#465881",
        height:40,
        alignItems:"center",
        justifyContent:"center",
        marginTop:40,
        marginBottom:10,
        borderRadius : 10,
    },
    Done:{
        backgroundColor:"#465881",
        height:hp("50"),
        alignItems:"center",
        justifyContent:"center",
    },
    Text:{
        color:"white",
        fontSize : 20,
    },
    inputView:{
        borderColor:"#465881",
        borderWidth : 2,
        marginBottom:20,
        justifyContent:"center",
        padding:10,
        borderRadius : 10,
    },
    inputText:{
        fontSize : 30,
        color:"black"
    },
    error:{
        fontSize : 20,
        color : "black",
        paddingBottom : 10,
    },
    map:{
        position : "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    }
});