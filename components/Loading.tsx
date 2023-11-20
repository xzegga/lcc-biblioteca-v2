import { useEffect, useState } from "react";
import { View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import tailwind from "twrnc";

export default function Loading() {
  const [width, setWidth] = useState(300);
  const loading = useSharedValue(width);

  const style = useAnimatedStyle(() => ({
    transform: [{ translateX: loading.value + 100 }],
  }));

  useEffect(() => {
    loading.value = withRepeat(
      withTiming(-loading.value, { duration: 1500 }),
      -1,
      true,
    );
  }, []);

  return (
    <View
      onLayout={(event) => {
        setWidth(event.nativeEvent.layout.width);
      }}
      style={tailwind`w-full m-auto`}
    >
      <View
        style={tailwind`
                    h-1
                    bg-orange-500/20
                    w-full
                    overflow-hidden
                `}
      >
        <Animated.View
          style={[
            tailwind`
                    w-50
                    h-full
                    bg-orange-500
                `,
            style,
            { transformOrigin: "0 50%" },
          ]}
        ></Animated.View>
      </View>
    </View>
  );
}
