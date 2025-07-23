import React, { useState } from 'react';
import { Text, TextInput, Alert, ImageBackground, SafeAreaView } from 'react-native';
import * as Location from 'expo-location';
import { StatusBar } from 'expo-status-bar';

import BatSignal from '../../components/bat-signal/BatSignal';

import styles from './HomeStyles';
import bg from '../../assets/bat-signal.jpg';

const Home = () => {
    const [user, setUser] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [loading, setLoading] = useState(false);
    const [sendHelp, setSendHelp] = useState(false);

    const handleSignalBatman = async () => {
        setLoading(true);
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission Denied', 'We need your location to help Batman.');
            setLoading(false);
            return;
        }
        try {
            const { coords } = await Location.
                getCurrentPositionAsync({ accuracy: Location.Accuracy.Highest });
            const [place] = await Location.reverseGeocodeAsync(coords);
            const formatted = `
                ${place.name ?? ''} ${place.street ?? ''}, ${place.city ?? ''}-${place.region ?? ''}
            `;
            setAddress(formatted.trim());
            setSendHelp(true);
        } catch (error) {
            console.error('Error getting location:', error);
            Alert.alert('Error', 'Could not get location.');
        } finally {
            setLoading(false);
        }
    };

    const handleSendHelp = () => {
        if (!user.trim() || !address.trim()) {
            Alert.alert('Missing Information', 'Please provide your name and location.');
            return;
        }
        setSendHelp(false);
        setUser('');
        Alert.alert('Help Sent', `Help has been sent for ${user} at ${address}.`);
    };

    return (
        <SafeAreaView style={styles.container} >
            <StatusBar style="light" />
            <ImageBackground style={styles.background} source={bg} resizeMode="cover">
                {!sendHelp &&
                    <BatSignal
                        title='Active Bat signal'
                        onPress={handleSignalBatman}
                        disabled={loading} />
                }
                {sendHelp && <>
                    <Text style={styles.text}>Who needs help?</Text>
                    <TextInput
                        style={styles.input}
                        value={user}
                        placeholder="Enter your name"
                        onChangeText={setUser}
                    />
                    <Text style={styles.text}>Confirm your location</Text>
                    <TextInput
                        style={styles.input}
                        value={address}
                        placeholder="Your address will appear here"
                    />
                    <BatSignal
                        title='Confirm Location'
                        onPress={handleSendHelp}
                    />
                </>
                }
            </ImageBackground>
        </SafeAreaView>
    );
}

export default Home;