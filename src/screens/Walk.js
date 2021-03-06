import React, {useState, useEffect, useRef  } from 'react';
import { Layout, Text } from '@ui-kitten/components';
import MapView, { Marker, AnimatedRegion } from 'react-native-maps';
const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.04;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
import { GOOGLE_MAP_KEY } from '../constants/googleMapKey';
import imagePath from '../constants/imagePath';


import {

  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import { locationPermission, getCurrentLocation } from '../utils/helper';


const Walk = () => {
    const mapRef = useRef()
    const markerRef = useRef()
  
    const [state, setState] = useState({
        curLoc: {
            latitude: 39.558491,
            longitude: -104.9877095,
        },
        destinationCords: {},
        isLoading: false,
        coordinate: new AnimatedRegion({
          latitude: 39.558491,
          longitude: -104.9877095,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
        }),
        time: 0,
        distance: 0,
  
    })
  
    const { curLoc, time, distance, destinationCords, isLoading, coordinate } = state
  
    useEffect(() => {
        getLiveLocation()
    }, [])
  
    const getLiveLocation = async () => {
        const locPermissionDenied = await locationPermission()
        if (locPermissionDenied) {
            const { latitude, longitude } = await getCurrentLocation()
            // console.log("get live location after 4 second")
            animate(latitude, longitude);
            setState({
                ...state,
                curLoc: { latitude, longitude },
                coordinate: new AnimatedRegion({
                    latitude: latitude,
                    longitude: longitude,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA
                })
  
            })
        }
  
        console.log(state)
    }
  
    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         getLiveLocation()
    //     }, 6000);
    //     return () => clearInterval(interval)
    // })
  
    const onPressLocation = () => {
        getLiveLocation()
    }
    const fetchValue = (data) => {
        console.log("this is data", data)
        setState({
            ...state,
            destinationCords: {
                latitude: data.destinationCords.latitude,
                longitude: data.destinationCords.longitude,
            },
        })
    }
  
    const animate = (latitude, longitude) => {
        const newCoordinate = { latitude, longitude };
        if (Platform.OS == 'android') {
            if (markerRef.current) {
                markerRef.current.animateMarkerToCoordinate(newCoordinate, 7000);
            }
        } else {
            coordinate.timing(newCoordinate).start();
        }
    }
  
    const onCenter = () => {
        mapRef.current.animateToRegion({
            latitude: curLoc.latitude,
            longitude: curLoc.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
        })
    }
  
    const fetchTime = (d, t) => {
        setState(state => ({ ...state, distance: d, time: t }))
    }
  
    return (
        <View style={styles.container}>
  
            {distance !== 0 && time !== 0 && (<View style={{ alignItems: 'center', marginVertical: 16 }}>
                <Text>Time left: {time.toFixed(0)} </Text>
                <Text>Distance left: {distance.toFixed(0)}</Text>
            </View>)}
            <View style={{ flex: 1 }}>
                <MapView
                    ref={mapRef}
                    style={StyleSheet.absoluteFill}
                    initialRegion={{
                        ...curLoc,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA,
                    }}
                >
  
                    <Marker.Animated
                        ref={markerRef}
                        coordinate={coordinate}
                        image={imagePath.icCurLoc}
                    />
  
                    {Object.keys(destinationCords).length > 0 && (<Marker
                        coordinate={destinationCords}
                        image={imagePath.icGreenMarker}
                    />)}
  
                    {Object.keys(destinationCords).length > 0 && (<MapViewDirections
                        origin={curLoc}
                        destination={destinationCords}
                        apikey={GOOGLE_MAP_KEY}
                        strokeWidth={6}
                        strokeColor="red"
                        optimizeWaypoints={true}
                        onStart={(params) => {
                            console.log(`Started routing between "${params.origin}" and "${params.destination}"`);
                        }}
                        onReady={result => {
                            console.log(`Distance: ${result.distance} km`)
                            console.log(`Duration: ${result.duration} min.`)
                            fetchTime(result.distance, result.duration),
                                mapRef.current.fitToCoordinates(result.coordinates, {
                                    edgePadding: {
                                        // right: 30,
                                        // bottom: 300,
                                        // left: 30,
                                        // top: 100,
                                    },
                                });
                        }}
                        onError={(errorMessage) => {
                            // console.log('GOT AN ERROR');
                        }}
                    />)}
                </MapView>
                <TouchableOpacity
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        right: 0
                    }}
                    onPress={onCenter}
                >
                    <Image source={imagePath.greenIndicator} />
                </TouchableOpacity>
            </View>
            <View style={styles.bottomCard}>
                <Text>Start tracking</Text>
                <TouchableOpacity
                    onPress={onPressLocation}
                    style={styles.inpuStyle}
                >
                    <Text>Choose your location</Text>
                </TouchableOpacity>
            </View>
            {/* <Loader isLoading={isLoading} /> */}
        </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    bottomCard: {
        backgroundColor: 'white',
        width: '100%',
        padding: 30,
        borderTopEndRadius: 24,
        borderTopStartRadius: 24
    },
    inpuStyle: {
        backgroundColor: 'white',
        borderRadius: 4,
        borderWidth: 1,
        alignItems: 'center',
        height: 48,
        justifyContent: 'center',
        marginTop: 16
    }
  });
  

export default Walk;