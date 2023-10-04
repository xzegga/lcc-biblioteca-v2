import { Pressable, Text, View } from 'react-native';
import tailwind from 'twrnc';

import LocalImage from './LocalImage';
import { shortenText } from '../helpers/shortText';
import { Link } from 'expo-router';

export function Crop({ crop }: { crop: any }) {
    return (
        <Link href={{
            pathname: '/details',
            params: { cropId: crop._id }
        }} asChild>
            <Pressable>
                {({ pressed }) => (
                    <View style={[tailwind`
             flex flex-row gap-2 mr-2 mb-4 min-h-[150px] border-b-[1px] border-slate-200
             bg-white`]}>
                        <View style={tailwind`w-35 h-35 rounded-[4px] overflow-hidden`}>
                            <LocalImage source={crop.imagen} />
                        </View>
                        <View style={tailwind`pr-2 flex-1`}>
                            <Text style={tailwind`text-xl font-normal text-slate-600 px-1.5 pb-1`}>{crop.title} </Text>
                            <Text style={tailwind`text-sm font-normal text-slate-400 px-1.5 pb-1`}>{crop.scientific_name} </Text>
                            <Text style={tailwind`text-base font-normal leading-6 text-slate-600 px-1.5 pb-1`}>{shortenText(crop.description, 60)}</Text>
                        </View>

                    </View>
                )}
            </Pressable>
        </Link>

    )
}
