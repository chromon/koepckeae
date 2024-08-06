import React from 'react';
import { StyleSheet, Text, View, FlatList, ListRenderItem, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { UseData } from '../func/UseData';

export default function LifeProgress() {

    const Data_Key_B = 'KOEPCKEAE_BIRTHDAY';
    const Data_Key_E = 'KOEPCKEAE_EXPECTANCY';
    const { data: dataBirthday, saveData: saveDataB } = UseData(Data_Key_B);
    const { data: dataExpectancy, saveData: saveDataE } = UseData(Data_Key_E);

    const weeksBetweenDates = (start: Date, end: Date): number => {
        // 计算毫秒差
        const diffTime = Math.abs(end.getTime() - start.getTime());
        // 将毫秒差转换为周数并向下取整
        const diffWeeks = Math.floor(diffTime / (7 * 24 * 60 * 60 * 1000));
        return diffWeeks;
    }

    // const totalWeeks = 3650; // 总周数大约 70 年
    // const weeksSpent = 3644; // 已经度过的周数
    const totalWeeks = parseInt(dataExpectancy!) * 52;
    const weeksSpent = weeksBetweenDates(new Date(dataBirthday!), new Date()); 
    const weeksLeft = totalWeeks - weeksSpent;
    const progressPercentage = ((weeksSpent / totalWeeks) * 100).toFixed(2);
    // 每行显示的格子数
    const squaresPerRow = 50;

    // 定义颜色数组，用于不同的时间段
    const colors = [
        '#00bbf9', // Blue
        '#f15bb5', // Red
        '#fee440', // Yellow
        '#00f5d4', // Green
        '#9b5de5', // Purple
    ];

    // 根据索引获取颜色
    const getColor = (index: number): string => {
        const segment = totalWeeks / colors.length;
        // Math.floor(x) 返回小于参数 x 的最大整数，即对浮点数向下取整
        return colors[Math.floor(index / segment)];
    };

    // 生成网格数据
    const generateGridData = () => {
        let data = [];
        for (let i = 0; i < totalWeeks; i++) {
            // 确定格子的颜色，如果是已度过的周数，使用相应颜色，否则使用灰色
            const color = i < weeksSpent ? getColor(Math.floor(i / squaresPerRow) * squaresPerRow) : '#e0e0e0';
            data.push({ key: i.toString(), color });
        }
        return data;
    };

    const gridData = generateGridData();

    // 渲染单个格子
    const renderItem: ListRenderItem<{ key: string; color: string }> = ({ item }) => (
        <View style={[styles.square, { backgroundColor: item.color }]} />
    );

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <Text style={styles.title}>Life Progress: {progressPercentage}%</Text>
                <Text style={styles.subtitle}>
                    {weeksSpent} weeks spent • {weeksLeft} weeks left
                </Text>
                {/* 使用FlatList渲染网格 */}
                {gridData && gridData.length > 0 ? (
                <FlatList
                    style={styles.gridContainer}
                    data={gridData} // 数据源
                    renderItem={renderItem} // 渲染每个格子的组件
                    numColumns={squaresPerRow} // 指定每行的格子数
                    keyExtractor={(item) => item.key} // 提取每个项目的唯一键
                    contentContainerStyle={styles.grid} // 网格样式
                    getItemLayout={(data, index) => (
                        { length: 10, offset: 10 * index, index } // 优化渲染性能
                    )}
                    initialNumToRender={totalWeeks} // 初始渲染的项目数
                    scrollEnabled={false} // 取消列表内部滚动，使用外部 ScrollView 滚动
                />) : <Text>Loading...</Text>}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        marginBottom: 20,
    },
    gridContainer: {
        marginTop: 20,
    },
    grid: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    square: {
        width: 6,
        height: 6,
        margin: 1,
    },
});