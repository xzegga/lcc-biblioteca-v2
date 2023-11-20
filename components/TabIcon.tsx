import { useEffect } from "react";
import Animated, {
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import tailwind from "twrnc";

const images = {
  patologies: require("../assets/patologies.png"),
  insects: require("../assets/insects.png"),
  deficiencies: require("../assets/deficiencies.png"),
};

interface TabProps {
  focused: boolean;
  color: string;
  image: string;
}

export default function TabBarIcon({ image, color, focused }: TabProps) {
  const offset = useSharedValue(-16);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateY: offset.value }],
  }));

  const animeOptions = {
    duration: 100,
  };

  useEffect(() => {
    if (focused) {
      offset.value = withSpring(-28, animeOptions);
    } else {
      offset.value = withSpring(-16, animeOptions);
    }
  }, [focused]);

  return (
    <Animated.Image
      entering={FadeInDown}
      style={[tailwind`w-14 h-14 p-0 ml-2`, animatedStyles]}
      source={images[image as keyof typeof images]}
    />
  );
}
