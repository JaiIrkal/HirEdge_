import { StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import React from 'react'
import useAxiosPrivate from '../../../utils/axiosPrivate'
import { FlashList } from '@shopify/flash-list';
import { useQuery } from '@tanstack/react-query';

import { Button, Card } from '@rneui/themed';

/*
    Each Drive Card recieves the following data:
                "_id": "65a55d292e1aebc15f021e9a",
                "company_id": "65a19c03a5d38b0ea326ca4a",
                "job_title": "SDE-1",
                "job_ctc": "5 LPA",
                "company_name": "Jetpulse",
                "registered_students": 2

*/

const OngoingDrivePanel = () => {
    const { width } = useWindowDimensions();

    const api = useAxiosPrivate();

    const { data, isLoading, isError, isSuccess } = useQuery({
        queryKey: ["TPOOngoingDrive"],
        queryFn: async (): Promise<TPODrivesPanelResponseType> => {
            return api.get('/tpo/drives', {
                params: {
                    limit: 5,
                    page: 1,
                    s: ''
                }
            }).then(res => res.data.drives)
        },
        staleTime: 30 * 60 * 1000
    })

    if (isError)
        return (<View>
            <Text>Error....</Text>
        </View>)

    if (isLoading)
        return (<View>
            <Text>Loading.....</Text>
        </View>)

    if (isSuccess)
        return (
            <>
                <FlashList
                    data={data.data}
                    renderItem={({ item }) => (
                        <View style={{
                            width: width * 0.4,
                            height: "100%",
                            margin: 0,
                            borderColor: 'black',
                            borderWidth: 1,
                            borderRadius: 20,
                            padding: 5
                        }}>
                            <Card.Title>
                                {item.company_name}
                            </Card.Title>
                        <Card.Divider />
                        <Text>{item.job_title}</Text>
                            <Text>{item.registered_students}</Text>
                            <Button title={"Go To Drive"} onPress={() => {

                            }} />
                        </View>
                    )}
                    scrollEnabled
                    estimatedItemSize={10}
                    horizontal
                    contentContainerStyle={{
                        padding: 0,
                    }}
                    canCancelContentTouches
                    style={{

                    }}
                />
            </>
        )

    return null;
}

export default OngoingDrivePanel

const styles = StyleSheet.create({})