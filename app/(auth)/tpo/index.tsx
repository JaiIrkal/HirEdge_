import { View, Text, StyleSheet } from "react-native";
import { Button, Avatar, IconButton, Icon } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import useLogout from "../../../utils/useLogout";
import { useEffect, useState } from "react";
import useAxiosPrivate from "../../../utils/axiosPrivate";

type TPOProfileType = {
    title: string;
    first_name: string;
    middle_name: string;
    last_name: string;
    email: string;
    mobile: string;
}

const TPOPage = () => {
    const logout = useLogout();
    const api = useAxiosPrivate();

    const [TPOProfile, setTpoProfile] = useState<TPOProfileType | null>(null)

    useEffect(() => {

        const fetchProfile = () => {
            api.get('/tpo/profile').then((res) => {
                if (res.status == 200) {
                    setTpoProfile(res.data);
                }
            }).catch((e) => { console.log(e) });
        }
        fetchProfile();

    }, [])


    return (
        <SafeAreaView style={{
            flex: 1,
            width: '100%',
            position: 'fixed',
            rowGap: 5,
            flexDirection: 'column'

        }}>
            <View style={{
                flex: 1,
                rowGap: 10
            }}>
                <View>
                    <Avatar.Icon icon={"account-circle-outline"} size={160} style={{
                        alignSelf: 'center'
                    }} />
                    <IconButton icon={'camera-outline'} size={46} iconColor="black" style={{
                        position: 'relative',
                        alignSelf: 'center',
                        bottom: 60, left: 40,
                    }}
                        containerColor="#00a878"
                    />
                </View>
                <View style={{
                    width: "100%",
                    flexDirection: 'row',
                    columnGap: 20,
                }}>
                    <Icon source="account" size={40} />
                    <View style={{ flexDirection: 'column', flex: 1 }}>
                        <Text style={{}}>Name</Text>
                        <Text style={{ fontSize: 20, fontWeight: "600" }}>
                            {`${TPOProfile?.title} ${TPOProfile?.first_name} ${TPOProfile?.middle_name} ${TPOProfile?.last_name}`}
                        </Text>
                    </View>
                    <IconButton icon={'pencil'} iconColor="#186F65" style={{

                    }} />
                </View>
                <View style={{
                    flexDirection: 'row',
                    columnGap: 20,
                }}>
                    <Icon source="email" size={40} />
                    <View style={{ flexDirection: 'column', flex: 1 }}>
                        <Text style={{}}>Email</Text>
                        <Text style={{ fontSize: 20, fontWeight: "600" }}>
                            {TPOProfile?.email}
                        </Text>
                    </View>
                    <IconButton icon={'pencil'} iconColor="#186F65" />
                </View>
                <View style={{
                    flexDirection: 'row',
                    columnGap: 20,
                }}>
                    <Icon source="phone" size={40} />
                    <View style={{ flexDirection: 'column', flex: 1 }}>
                        <Text style={{}}>Phone</Text>
                        <Text style={{ fontSize: 20, fontWeight: "600" }}>
                            {TPOProfile?.mobile}
                        </Text>
                    </View>
                    <IconButton icon={'pencil'} iconColor="#186F65" />
                </View>
            </View>
            <View style={styles.buttonConatainer}>
                <Button mode="outlined" labelStyle={{
                    fontSize: 20
                }}>Change Password</Button>
                <Button mode='outlined' onPress={logout} textColor="red" labelStyle={{
                    fontSize: 24
                }}>Logout</Button>
            </View>
        </SafeAreaView>
    )
}

export default TPOPage;

const styles = StyleSheet.create({
    informationText: {
        fontSize: 24,
    },
    buttonConatainer: {
        position: 'relative',
        marginBottom: 5,
        rowGap: 5
    }
})