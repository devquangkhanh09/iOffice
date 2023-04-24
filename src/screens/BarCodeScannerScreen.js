import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Button } from '@react-native-material/core';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { storeData } from '../services/asyncStorage';

export default function BarCodeScannerScreen() {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);

    useEffect(() => {
        const getBarCodeScannerPermissions = async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        };

        getBarCodeScannerPermissions();
    }, []);

    const handleBarCodeScanned = async ({ type, data }) => {
        setScanned(true);
        const res = await fetch('https://428e-113-161-73-48.ngrok-free.app/api/qrcode', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                code: data
            })
        });
        const status = await res.text();
        if (status === 'success') {
            await storeData('status', 'at office');
            await storeData('code', data);
        } else {
            await storeData('status', 'not at office');
        }
        alert(`Successfully scanned ${type}.\nData: ${data}.\nStatus: ${status}`);
    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View style={styles.container}>
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
            />
            {scanned && <Button style={styles.button} title='Tap to Scan Again' onPress={() => setScanned(false)} />}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
    },
    button: {
    },
});