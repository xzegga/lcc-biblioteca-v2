import { Tabs } from 'expo-router';
import TitleTab from '../../../components/TabTitle';
import { useStore } from '../../../hooks/useGlobalStore';
import { LinearGradient } from 'expo-linear-gradient';
import { View } from 'react-native';
import tailwind from 'twrnc';

export default function AppLayout() {
    const { selectedCrop } = useStore((state: any) => ({ selectedCrop: state.selectedCrop }));
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarBackground: () => (<View style={tailwind`h-[40] bottom-0 w-full absolute`}>
                    <LinearGradient
                        colors={['transparent', 'rgba(255,255,255,0.8)', 'rgba(255,255,255,1)']}
                        style={tailwind`h-[40]`}
                    />
                </View>),
                tabBarStyle: {
                    borderTopColor: '#969696',
                }
            }} >
            <Tabs.Screen
                name="details"
                options={{
                    href: null,
                }}
            />
            <Tabs.Screen
                name="issue"
                options={{
                    href: null,
                }}
            />
            <Tabs.Screen
                name="patologies"
                options={{
                    tabBarActiveTintColor: '#f29c1f',
                    tabBarLabel(props) {
                        return <TitleTab title={'Patologías'} image={'patologies'} {...props} />
                    },
                    href: {
                        pathname: '/patologies',
                        params: {
                            cropId: selectedCrop,
                            deseases: 'patologia',
                            issueTitle: 'Patologías'
                        },
                    },
                }}
            />

            <Tabs.Screen
                name="insects"
                options={{
                    tabBarActiveTintColor: '#abd37d',
                    tabBarIcon: () => null,
                    tabBarLabel(props) {
                        return <TitleTab title={'Insectos'} image={'insects'} {...props} />
                    },
                    href: {
                        pathname: '/insects',
                        params: {
                            cropId: selectedCrop,
                            deseases: 'insecto',
                            issueTitle: 'Insectos'
                        },
                    },
                }}
            />

            <Tabs.Screen
                name="deficiencies"
                options={{
                    tabBarActiveTintColor: '#d18a58',
                    tabBarLabel(props) {
                        return <TitleTab title={'Deficiencias'} image={'deficiencies'} {...props} />
                    },
                    href: {
                        pathname: '/deficiencies',
                        params: {
                            cropId: selectedCrop,
                            deseases: 'deficiencia',
                            issueTitle: 'Deficiencias'
                        },
                    },
                }}
            />
        </Tabs>
    );
}