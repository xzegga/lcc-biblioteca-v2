import { useRef, useState } from 'react';
import tailwind from 'twrnc';
import { Image } from 'expo-image';

import Config from '../services/config';
import { useStore } from '../hooks/useGlobalStore';

export default function LocalImage({ source }: { source: string | undefined }) {
    const [imageError, setImageError] = useState(false);
    const { images } = useStore((state) => ({
        images: state.images,
        setState: state.setState,
        toDownload: state.toDownload
    }));

    // check if image exists in source or image[source]
    const imageExists = () => {
        if (images && source && source in images) {
            return images[source];
        }

        if (source && (!images || !(source in images))) {
            return `${Config.apiUrl}${source}`;
        }
    };

    return (<Image
        source={imageExists()}
        style={tailwind`w-full h-full m-0 p-0 -mb-1`}
        placeholder={require('../assets/logo-cp.png')}
    />);
}