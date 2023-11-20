import { useState, useRef } from "react";
import { StatusBar, View } from "react-native";
import tailwind from "twrnc";
import BackBtn from "../components/BackAction";

export default function useScrollBar({
  fixedHeader = false,
  backBtnColor = "rgb(255 255 255)",
  backBtnColorOnScroll = "rgb(15 23 42)",
}: {
  fixedHeader?: boolean;
  backBtnColor?: string;
  backBtnColorOnScroll?: string;
}) {
  const [fixedHeaderState, setFixedHeader] = useState(fixedHeader);
  const ref = useRef<any>();

  const onScroll = (e: any) => {
    if (e.nativeEvent.contentOffset.y < 50) {
      setFixedHeader(true);
    } else {
      setFixedHeader(false);
    }
  };

  const renderStickyHeader = () => (
    <View style={tailwind`w-full h-20 z-14 absolute`}>
      <BackBtn color={backBtnColorOnScroll} />
    </View>
  );

  const renderFixedHeader = () => (
    <>
      {fixedHeaderState ? (
        <View style={tailwind`w-full h-20 z-14 absolute`}>
          <BackBtn color={backBtnColor} />
        </View>
      ) : null}
    </>
  );

  const onChangeHeaderVisibility = (visible: boolean) => {
    if (visible) {
      StatusBar.setBarStyle("light-content");
    } else {
      StatusBar.setBarStyle("dark-content");
    }
  };

  return {
    ref,
    onScroll,
    renderStickyHeader,
    renderFixedHeader,
    onChangeHeaderVisibility,
  };
}
