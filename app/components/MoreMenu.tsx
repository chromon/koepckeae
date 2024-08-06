import { StyleSheet, TouchableOpacity, View } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useLocalSearchParams, useRouter } from "expo-router";

type MoreMenuProps = {
    navigateTo: string;
}

const MoreMenu: React.FC<MoreMenuProps> = ({navigateTo}) => {

    const router = useRouter();

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.menuButton} onPress={() => {
                router.push(navigateTo);
            }}>
                <Ionicons name='sync-outline' size={24}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuButton} onPress={() => {
                router.push('/Profile');
            }}>
                <Ionicons name='settings-outline' size={24} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    menuButton: {
        padding: 8,
    },
});

export default MoreMenu;