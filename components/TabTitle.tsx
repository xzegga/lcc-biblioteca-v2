

import { useEffect } from 'react';
import { Text, View } from 'react-native';
import Animated, { FadeInDown, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import tailwind from 'twrnc';
import Patologies from '../assets/patologies.svg';
import Insects from '../assets/insects.svg';
import Deficiencies from '../assets/deficiencies.svg';

interface TabProps {
    focused: boolean;
    title: string;
    image: string;
    color: string;
}

function Icon({ image, ...props }: { image: string, [key: string]: any }) {
    if (image === 'patologies') return <Patologies {...props} />;
    if (image === 'insects') return <Insects {...props} />;
    if (image === 'deficiencies') return <Deficiencies {...props} />;
}

export default function TitleTab({ title, image, focused, color }: TabProps) {
    const offset = useSharedValue(0);

    const animatedStyles = useAnimatedStyle(() => ({
        transform: [{ translateY: offset.value }],
    }));

    const animeOptions = {
        duration: 1000,
    }

    useEffect(() => {
        if (focused) {
            offset.value = withSpring(-2, animeOptions);
        } else {
            offset.value = withSpring(0, animeOptions);
        }
    }, [focused]);

    return <>
        <Animated.View entering={FadeInDown} style={[tailwind`text-center min-w-[30] mb-1`, animatedStyles]}>
            <View style={tailwind`pl-2 mx-auto`}>
                <Icon image={image} style={[tailwind`w-14 h-14 p-0`]} />
            </View>
            <Text
                style={[
                    tailwind`${focused ? 'font-semibold' : 'font-normal'}
                leading-6 text-slate-600 px-1.5 text-center w-full mx-auto`,
                ]}>
                {title}
            </Text>
            {focused ? <Animated.View entering={FadeInDown}
                style={[tailwind`rounded-full w-[10px] h-[10px] mb-0 mx-auto bg-[${color}]`]} /> : null}
        </Animated.View>

    </>
}