import { useEffect } from "react";
import Animated, { FadeInRight, FadeOutRight } from "react-native-reanimated";
import tailwind from "twrnc";

export default function AnimatedView({ children }:
    { children: React.ReactNode | React.ReactNodeArray | JSX.Element | JSX.Element[] }) {
    
    useEffect(() => {
        return;
    }, []);

    return (
        <Animated.View entering={FadeInRight} exiting={FadeOutRight} style={tailwind`h-full bg-white`}>
            {children}
        </Animated.View>
    )

}