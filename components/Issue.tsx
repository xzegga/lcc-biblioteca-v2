import { Dimensions, Pressable, Text, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated'
import tailwind from 'twrnc';

import LocalImage from './LocalImage';
import { Link } from 'expo-router';
import { CropIssues as CropIssuesSchema } from '../schemas/CropIssues';
import { Results } from 'realm/dist/bundle';

export function Issue({
    issue,
    title
}: {
    issue: CropIssuesSchema,
    title: string
}) {
    const { width } = Dimensions.get('window');
    return (
        <>
            {issue ? <Link href={{
                pathname: '/issue',
                params: {
                    cropIssueId: issue._id.toString(),
                }
            }} asChild>
                <Pressable>
                    {({ pressed }) => (
                        <Animated.View entering={FadeInDown} style={[tailwind`
                            flex flex-row gap-2 mr-2 mb-4 min-h-[90px] border-b-[1px] border-slate-200
                            bg-white`]}>
                            <View style={tailwind`
                            w-[${width * 0.20}px] h-[${width * 0.20}px]
                            max-w-25 max-h-25
                            rounded-[4px] overflow-hidden`}>
                                <LocalImage source={issue.imagen} />
                            </View>
                            <View style={tailwind`pr-2 flex-1`}>
                                <Text style={tailwind`text-xl font-normal text-slate-600 px-1.5 pb-1`}>{issue.title}</Text>
                                <Text style={tailwind`text-sm font-normal text-slate-400 px-1.5 pb-1`}>{issue.scientific_name} </Text>
                                <Text style={tailwind`text-sm font-normal text-slate-400 px-1.5 pb-1`}>{title}</Text>
                            </View>

                        </Animated.View>
                    )}
                </Pressable>
            </Link> : null}
        </>


    )
}
