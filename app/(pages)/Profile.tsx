import React, { useState } from 'react'
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Slider from '@react-native-community/slider';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Ionicons from '@expo/vector-icons/Ionicons';
import { UseData } from '../func/UseData';

const Profile = () => {

    const Data_Key_B = 'KOEPCKEAE_BIRTHDAY';
    const Data_Key_E = 'KOEPCKEAE_EXPECTANCY';
    const { data: dataBirthday, saveData: saveDataBirthday } = UseData(Data_Key_B);
    const { data: dataExpectancy, saveData: saveDataExpectancy } = UseData(Data_Key_E);

    const [date, setDate] = useState(new Date());
    // show DateTimePicker
    const [show, setShow] = useState(false);
    const [lifeExpectancy, setLifeExpectancy] = useState<number | null>(null);
    const [weeklyNotificationEnabled, setWeeklyNotificationEnabled] = useState<boolean>(false);

    const onDatePickerChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
        const currentDate = selectedDate || date;
        setShow(false);
        setDate(currentDate);

        async () => {
            try {
                await saveDataBirthday(currentDate.toString());
            } catch (e) {
                console.error('Error', 'Failed to save birthday', e);
            }
        };
    }

    const showDatepicker = () => {
        setShow(true);
    };

    const handleSliderChange = (value: number) => {
        setLifeExpectancy(value);

        async () => {
            try {
                await saveDataExpectancy(value.toString());
            } catch (e) {
                console.error('Error', 'Failed to save expectancy', e);
            }
        };
    };

    const toggleSwitch = () => {
        setWeeklyNotificationEnabled(previousState => !previousState);
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Change your Profile</Text>
            <Text style={styles.subtitle}>
                User Infomations
            </Text>
            <TouchableOpacity style={styles.dateButton} onPress={showDatepicker}>
                <Entypo name="cake" size={24} style={styles.dateButtonText} />
                <View style={styles.dataButtonView}>
                    <Text style={styles.dateButtonText}>Your Birthday</Text>
                    <Text style={styles.dateText}>{date.toISOString().split('T')[0]}</Text>
                </View>
            </TouchableOpacity>
            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode="date"
                    display="spinner"
                    onChange={onDatePickerChange}
                />
            )}

            <TouchableOpacity style={styles.dateButton} onPress={showDatepicker}>
                <FontAwesome6 name="user-large" size={20} color="black" />
                <View style={styles.dataButtonView}>
                    <Text style={styles.dateButtonText}>Life Expectancy</Text>
                    <View style={styles.sliderContainer}>
                        <Text>50</Text>
                        <Slider
                            style={styles.slider}
                            minimumValue={50}
                            maximumValue={120}
                            step={1}
                            value={parseInt(dataExpectancy!) ?? 90}
                            onValueChange={handleSliderChange}
                            minimumTrackTintColor="#007AFF"
                            maximumTrackTintColor="#000000"
                            thumbTintColor="#007AFF"
                        />
                        <Text>{dataExpectancy}</Text>
                    </View>
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.dateButton} onPress={showDatepicker}>
                <Ionicons name="notifications" size={24} />
                <View style={styles.dataButtonView}>
                    <Text style={styles.dateButtonText}>Weekly Notification</Text>
                    <Text style={styles.dateText}>Receive a weekly notification with your current life progress.</Text>
                </View>
                <Switch
                    trackColor={{ false: "#767577", true: "#007AFF" }}
                    thumbColor={weeklyNotificationEnabled ? "#007AFF" : "#f4f3f4"}
                    onValueChange={toggleSwitch}
                    value={weeklyNotificationEnabled}
                />
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default Profile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#FFFFFF',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    subtitle: {
        fontSize: 16,
        marginBottom: 30,
    },
    dateButton: {
        padding: 15,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    dataButtonView: {
        flex: 1,
        marginLeft: 20,
    },
    dateButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000000',
    },
    dateText: {
        fontSize: 18,
        marginTop: 5,
    },
    sliderContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    slider: {
        flex: 1,
        height: 40,
    }
});