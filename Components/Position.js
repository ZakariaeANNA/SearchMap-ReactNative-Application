import React,{useState , useEffect} from 'react';
import { StyleSheet, Text, View, StatusBar, Dimensions} from 'react-native';
import MapView,{Polyline} from 'react-native-maps';
import * as Location from 'expo-location';


export default function Position({navigation,route}) {
    const [region, setRegion] = useState({  latitude : route.params.Location._lat, 
                                            longitude : route.params.Location._long,
                                            latitudeDelta: 0.015,
                                            longitudeDelta: 0.0121});
    const [Position,setPosition] = useState(
        {  
            latitude : route.params.Location._lat, 
            longitude : route.params.Location._long,
        }
    );
    useEffect(() => {
        (async () => {
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status == 'granted') {
            let location = await Location.getCurrentPositionAsync({});
            setRegion({
                    latitude : location.coords.latitude, 
                    longitude : location.coords.longitude,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121});
            setPosition(
                {  
                    latitude : location.coords.latitude, 
                    longitude : location.coords.longitude,
                });
            }
            
          
        })();
    }, []);
    return(
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor='#40404c'/>
            <MapView 
                style={styles.map}
                loadingEnabled={true}
                showsUserLocation={true}
                showsMyLocationButton={true}
                region={region}
                onRegionChangeComplete={region => setRegion(region)}
            >
                 <Polyline
                    coordinates={[
                        Position,
                        { latitude: route.params.Location._lat, longitude: route.params.Location._long }
                    ]}
                    strokeWidth={3}
                    strokeColor="red"
                />
                <MapView.Marker coordinate={{latitude: route.params.Location._lat, longitude: route.params.Location._long}}/>
            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    container : {
        flex:1,
    },
    image :{
        width:150,
        height:150,
        margin : 5,
    },
    map:{
        width:Dimensions.get('screen').width,
        height:Dimensions.get('screen').height
    }
});