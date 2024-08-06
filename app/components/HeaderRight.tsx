import { TouchableOpacity } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';

const HeaderRight = () => {
    const handlePress = () => {
        console.log('Icon Button Pressed');
    };
    
    return (
        <TouchableOpacity onPress={handlePress} activeOpacity={0.5}>
            <Ionicons name='ellipsis-vertical-outline' size={24}/>
        </TouchableOpacity>
    )
}

export default HeaderRight;