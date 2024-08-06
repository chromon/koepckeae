import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface DataHook {
    data: string | null;
    loadData: () => Promise<void>;
    saveData: (newData: string) => Promise<void>;
    deleteData: () => Promise<void>;
}

// const Data_KEY = 'Data';

export const UseData = (Data_KEY: string): DataHook => {
    const [data, setData] = useState<string | null>(null);

    const loadData = async (): Promise<void> => {
        try {
            const storedData = await AsyncStorage.getItem(Data_KEY);
            if (storedData !== null) {
                setData(storedData);
            }
        } catch (e) {
            console.error('Failed to load data from storage');
        }
    };

    const saveData = async (newData: string): Promise<void> => {
        try {
            await AsyncStorage.setItem(Data_KEY, newData);
            setData(newData);
        } catch (e) {
            console.error('Failed to save data to storage');
            throw e;
        }
    };

    const deleteData = async (): Promise<void> => {
        try {
            await AsyncStorage.removeItem(Data_KEY);
            setData(null);
        } catch (e) {
            console.error('Failed to delete data from storage');
            throw e;
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    return { data, loadData, saveData, deleteData };
};