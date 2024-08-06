import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { UseData } from '../func/UseData';

const LifeExpectancy = () => {
    const [lifeExpectancy, setLifeExpectancy] = useState<number | null>(null);
    const [continueEnabled, setContinueEnabled] = useState(false);

    const router = useRouter();

    const Data_Key = 'KOEPCKEAE_EXPECTANCY'
    const { data, saveData } = UseData(Data_Key);

    useEffect(() => {
        setContinueEnabled(lifeExpectancy !== null);
    }, [lifeExpectancy]);

    const handleSliderChange = (value: number) => {
        setLifeExpectancy(value);
        setContinueEnabled(true);
    };

    const handleSaveExpectancy = async () => {
        try {
            await saveData(lifeExpectancy!.toString());
        } catch (e) {
            console.error('Error', 'Failed to save expectancy', e);
        }
    };

    const handleContinue = () => {
        if (continueEnabled && lifeExpectancy !== null) {
            console.log('Continue with life expectancy:', lifeExpectancy);
            handleSaveExpectancy();
            router.push('/LifeProgress');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Select your Life Expectancy</Text>
            <Text style={styles.description}>
                {data? data: 'no birthday'}
                One of the things we need to know is your estimated life expectancy, which is the number of years you expect to live based on various factors such as your lifestyle, family history, and overall health. By knowing your life expectancy, we can calculate progress in your Life Calendar.
            </Text>
            <View style={styles.sliderContainer}>
                <Text style={styles.sliderLabel}>Life Expectancy</Text>
                <View style={styles.sliderRow}>
                    <Text style={styles.emoji}>👤</Text>
                    <Slider
                        style={styles.slider}
                        minimumValue={50}
                        maximumValue={120}
                        step={1}
                        value={lifeExpectancy ?? 90}
                        onValueChange={handleSliderChange}
                        minimumTrackTintColor="#007AFF"
                        maximumTrackTintColor="#000000"
                        thumbTintColor="#007AFF"
                    />
                    <Text style={styles.sliderValue}>{lifeExpectancy ? Math.round(lifeExpectancy) : 90}</Text>
                </View>
            </View>
            <TouchableOpacity
                style={[styles.continueButton, continueEnabled ? styles.continueButtonEnabled : styles.continueButtonDisabled]}
                onPress={handleContinue}
                disabled={!continueEnabled}
            >
                <Text style={[styles.continueButtonText, continueEnabled ? styles.continueButtonTextEnabled : styles.continueButtonTextDisabled]}>
                    Continue
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        marginTop: 20,
        backgroundColor: '#FFFFFF',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    description: {
        fontSize: 16,
        marginBottom: 30,
        lineHeight: 22,
    },
    sliderContainer: {
        marginBottom: 30,
    },
    sliderLabel: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center'
    },
    sliderRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    emoji: {
        fontSize: 20,
        marginRight: 10,
    },
    slider: {
        flex: 1,
        height: 40,
    },
    sliderValue: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
        width: 40,
    },
    continueButton: {
        backgroundColor: '#E0E0E0',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
    },
    continueButtonText: {
        fontSize: 18,
    },
    continueButtonEnabled: {
        backgroundColor: '#007AFF', // iOS 蓝色
    },
    continueButtonDisabled: {
        backgroundColor: '#E0E0E0',
    },
    continueButtonTextEnabled: {
        color: 'white',
    },
    continueButtonTextDisabled: {
        color: '#888',
    },
});

export default LifeExpectancy;