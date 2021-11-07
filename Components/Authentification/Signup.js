import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity,StatusBar, Alert,AsyncStorage, ScrollView, ActivityIndicator} from 'react-native';
import * as firebase from 'firebase';
import KeyApi from '../../constants/keyApi';
import { LogBox } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';


if(!firebase.apps.length)
    firebase.initializeApp(KeyApi.firebaseConfig);

LogBox.ignoreLogs(['Setting a timer for a long period of time']);

const ReviewForm = yup.object({
    Username: yup.string().required("Le nom d'utilisateur est obligatoire "),
    Email : yup.string().email().required('Email est obligatoire'),
    Password : yup.string().max(10).required('Mot de passe est obligatoire'),
    ConfirmPassword : yup.string().oneOf([yup.ref('Password'), null], 'Les mot de passe doit etre identiques').required('Confirmation mot de passe est obligatoire')
});

const db = firebase.firestore();
const auth = firebase.auth();
export default function Signup({navigation}) {

    const handleSignup = (values,actions) => {
        actions.setSubmitting(true);
        auth.createUserWithEmailAndPassword(values.Email.trim(),values.Password).then(cred => {
            db.collection('Users').add({
                UserID : cred.user.uid,
                Username : values.Username
            }).then(async()=>{
                await AsyncStorage.setItem('userID',cred.user.uid);
                setTimeout(() => navigation.navigate('App'), 3000);
                actions.resetForm();
            })
        }).catch(error => {   
            actions.setSubmitting(false);
            switch(error.code) {
            case 'auth/email-already-in-use':
                    Alert.alert('Email already in use !');
                    break;
            }
        });
    }

    return (
        
        <Formik
            initialValues={{Username:'',Email:'',Password:'',ConfirmPassword:''}}
            validationSchema={ReviewForm}
            onSubmit={(values,actions) => {
                handleSignup(values,actions);
            }}
        >
        
            {(props) => (
            <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', backgroundColor : '#EEDEDB' }}>
                <View style={styles.container}>
                    <StatusBar backgroundColor='#EEDEDB' barStyle="dark-content" />
                    <Text style={styles.logo}>SearchMap</Text>
                    <Text style={styles.input}>{props.touched.Username && props.errors.Username}</Text>
                    <View style={styles.inputView} >
                        <TextInput  
                            style={styles.inputText}
                            placeholder="Username..." 
                            placeholderTextColor="#003f5c"
                            onChangeText={props.handleChange('Username')}
                            value={props.values.Username}
                        />
                    </View>
                    <Text style={styles.input}>{props.touched.Email && props.errors.Email}</Text>
                    <View style={styles.inputView} >
                        <TextInput  
                            style={styles.inputText}
                            placeholder="Email..." 
                            placeholderTextColor="#003f5c"
                            onChangeText={props.handleChange('Email')}
                            value={props.values.Email}
                        />
                    </View>
                    
                    <Text style={styles.input}>{props.touched.Password && props.errors.Password}</Text> 
                    <View style={styles.inputView} >
                        <TextInput  
                            secureTextEntry
                            style={styles.inputText}
                            placeholder="Password..." 
                            placeholderTextColor="#003f5c"
                            onChangeText={props.handleChange('Password')}
                            value={props.values.Password}
                        />
                    </View>
                    
                    <Text style={styles.input}>{props.touched.ConfirmPassword && props.errors.ConfirmPassword}</Text>
                    <View style={styles.inputView} >
                        <TextInput  
                            secureTextEntry
                            style={styles.inputText}
                            placeholder="Confirm Password..." 
                            placeholderTextColor="#003f5c"
                            onChangeText={props.handleChange('ConfirmPassword')}
                            value={props.values.ConfirmPassword}
                        />
                    </View>
                   
                    {props.isSubmitting ? (
                        <TouchableOpacity style={styles.loginBtn} >
                            <ActivityIndicator color="white" size="large"/>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity style={styles.loginBtn} onPress={props.handleSubmit}>
                            <Text style={styles.loginText}>SIGNUP</Text>
                        </TouchableOpacity>
                    )}
                    
                    <TouchableOpacity onPress={()=>navigation.navigate("Login")}>
                        <Text style={styles.loginText}>LOGIN</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            )}
        </Formik>
       
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom:20,
    },
    logo:{
        fontWeight:"bold",
        fontSize:50,
        color:"#465881",
        marginBottom:30
    },
    inputView:{
        width:"80%",
        borderRadius:25,
        height:50,
        marginBottom:20,
        justifyContent:"center",
        padding:20,
        borderColor:"#465881",
        borderWidth : 2,
    },
    inputText:{
        height:50,
        color:"white",
        fontSize : 20,
    },
    loginBtn:{
        width:"80%",
        backgroundColor:"#465881",
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:40,
        marginBottom:10
    },
    loginText:{
        color:"white",
        fontSize : 20,
    },
    input:{
        fontSize : 30,
        color:"black",
    },
});