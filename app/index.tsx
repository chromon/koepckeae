import { Dimensions, StyleSheet, } from "react-native";
import { Redirect, } from "expo-router";
import { UseData } from "./func/UseData";

export default function Index() {

    const Data_Key = 'KOEPCKEAE_BIRTHDAY';

    const { data, saveData, deleteData } = UseData(Data_Key);
    
    const handleSaveBirthday = async () => {
        try {
            // 这里应该使用日期选择器，这里只是示例
            await saveData(new Date().toString());
        } catch (e) {
            console.error('Error', 'Failed to save birthday', e);
        }
    };

    const handleDeleteBirthday = async () => {
        try {
            await deleteData();
            console.log('Success', 'Birthday deleted successfully');
        } catch (e) {
            console.error('Error', 'Failed to delete birthday', e);
        }
    };
    
    if (data) {
        console.log(data);
        return <Redirect href='/LifeProgress' />
    } else {
        console.log('no birthday');
        return <Redirect href='/BirthdaySelect' />
    }

    // return (
    //     <SafeAreaView>
    //         <Text>{data? data: 'no data'}</Text>
    //         <Button title='save' onPress={handleSaveBirthday} />
    //         <Button title='delete' onPress={handleDeleteBirthday} />
    //     </SafeAreaView>
    // );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        height: Dimensions.get('window').height,
    }
});