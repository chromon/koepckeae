import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Entypo from '@expo/vector-icons/Entypo';
import { UseData } from "../func/UseData";

const BirthdaySelect = () => {

    const [date, setDate] = useState(new Date());
    // 显示 DateTimePicker
    const [show, setShow] = useState(false);
    // 设置 Continue 按钮颜色
    const [continueEnabled, setContinueEnabled] = useState(false);

    const Data_Key = 'KOEPCKEAE_BIRTHDAY';
    const { saveData } = UseData(Data_Key);

    const router = useRouter();

    const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
        const currentDate = selectedDate || date;
        setShow(false);
        setDate(currentDate);
        // 启用 Continue 按钮
        setContinueEnabled(true);
    };

    const showDatepicker = () => {
        setShow(true);
    }; 

    const handleSaveBirthday = async () => {
        try {
            await saveData(date.toString());
        } catch (e) {
            console.error('Error', 'Failed to save birthday', e);
        }
    };

    const handleContinue = () => {
        if (continueEnabled) {
            // 处理按钮点击
            console.log(date);
            handleSaveBirthday();
            router.push('/LifeExpectancy');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Select your Birthday</Text>
            <Text style={styles.subtitle}>
                Hi there! We're glad to have you on board. Before we can tailor your experience, please let us know your date of birth.
            </Text>
            <TouchableOpacity style={styles.dateButton} onPress={showDatepicker}>
                <Entypo name="cake" size={24} color="black" style={styles.dateButtonText}/>
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
                    onChange={onChange}
                />
            )}
            <TouchableOpacity
                style={[
                    styles.continueButton,
                    continueEnabled ? styles.continueButtonEnabled : styles.continueButtonDisabled
                ]}
                onPress={handleContinue}
                disabled={!continueEnabled}
            >
                <Text style={[
                    styles.continueButtonText,
                    continueEnabled ? styles.continueButtonTextEnabled : styles.continueButtonTextDisabled
                ]}>
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
    subtitle: {
        fontSize: 16,
        marginBottom: 30,
    },
    dateButton: {
        padding: 15,
        marginBottom: 30,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    dataButtonView: {
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
    continueButton: {
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
    },
    continueButtonEnabled: {
        // iOS 蓝色
        backgroundColor: '#007AFF',
    },
    continueButtonDisabled: {
        backgroundColor: '#E0E0E0',
    },
    continueButtonText: {
        fontSize: 18,
    },
    continueButtonTextEnabled: {
        color: 'white',
    },
    continueButtonTextDisabled: {
        color: '#888',
    },
});

export default BirthdaySelect;