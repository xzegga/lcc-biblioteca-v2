import { SafeAreaView, View, StatusBar, StatusBarStyle } from "react-native"
import tailwind from "twrnc"
import category from "../app/(root)/category"
import BackBtn from "./BackAction"
import { Crops } from "./Crops"
import LocalImage from "./LocalImage"
import ParallaxScrollView from "./ParallaxScrollView"
import { useRef, useState } from "react"

interface WithScrollProps extends IScrollViewPropTypes{
    content: JSX.Element,
    header: JSX.Element,
    headerActive?: boolean,
    fixedHeader?: boolean,    
    barStyle?: StatusBarStyle,
    backgroundColor?: string,
    backgroundScrollSpeed?: number,
    parallaxHeaderHeight?: number,
    stickyHeaderHeight?: number,
}

export function WithScroll(
    {
        content,
        header,
        headerActive = false,
        fixedHeader = false,
        barStyle= 'dark-content' as StatusBarStyle,
        backgroundColor = 'white',
        backgroundScrollSpeed = 5,
        parallaxHeaderHeight,
        stickyHeaderHeight,
    }: WithScrollProps 
) {
    const [fixedHeaderState, setFixedHeader] = useState(fixedHeader);
    const ref = useRef<any>();

    return (
        <>
            <ParallaxScrollView
                ref={ref}
                onScroll={(e: any) => {
                    if (e.nativeEvent.contentOffset.y < 50) {
                        setFixedHeader(true)
                    } else {
                        setFixedHeader(false)
                    }
                }}
                style={{ flex: 1 }}
                renderStickyHeader={() => (
                    <View style={tailwind`w-full h-20 z-10`}><BackBtn color='rgb(15 23 42)' /></View>
                )}
                renderFixedHeader={() => (
                    <>
                        {fixedHeaderState && <View style={tailwind`w-full h-20 z-10 absolute`}>
                            <BackBtn color='rgb(255 255 255)' />
                        </View>}
                    </>
                )}
                renderBackground={() => (
                    <>{header}</>
                )}
                onChangeHeaderVisibility={(visible: boolean) => {
                    if (visible) {
                        StatusBar.setBarStyle('light-content')
                    } else {
                        StatusBar.setBarStyle('dark-content')
                    };
                }}
                contentContainerStyle={tailwind`rounded-t-[2rem] -mt-8`}

                backgroundColor="white"
                parallaxHeaderHeight={parallaxHeaderHeight}
                stickyHeaderHeight={stickyHeaderHeight}
                headerActive={headerActive}
                backgroundScrollSpeed={backgroundScrollSpeed}
            >
                {content}
            </ParallaxScrollView>
            <StatusBar barStyle={barStyle}/>
        </>
    )
}
