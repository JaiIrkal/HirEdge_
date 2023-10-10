
import { useRouter } from "expo-router";
import { View, Text } from "react-native";
import { Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const StudentPage = () => {

    const router = useRouter();

    return (
        <SafeAreaView style={{
            height: '100%',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Text style={{
                fontSize: 30,
            }}>
                Student page  
            </Text>
            <Button mode='contained' onPress={() => {
                router.push('/')
            }}>Logout</Button>
        </SafeAreaView>
    )
}

export default StudentPage;