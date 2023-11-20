import {
    View,
    Text,
    StatusBar,
    ImageBackground,
} from "react-native";
import tailwind from "twrnc";
import { Image } from "expo-image";
import ParallaxScrollView from "../../components/ParallaxScrollView";
import useScrollBar from "../../hooks/useScrollBar";

export default function Policies() {
    const {
        ref,
        onScroll,
        renderStickyHeader,
        renderFixedHeader,
        onChangeHeaderVisibility,

    } = useScrollBar({ fixedHeader: true, backBtnColor: 'rgb(15 23 42)' });

    return (
        <View style={[tailwind`bg-white h-full`]}>
            <ParallaxScrollView
                ref={ref}
                onScroll={onScroll}
                renderFixedHeader={renderFixedHeader}
                stickyHeaderHeight={78}
                renderStickyHeader={renderStickyHeader}
                onChangeHeaderVisibility={onChangeHeaderVisibility}
                backgroundColor="white"
                style={{ flex: 1 }}
                renderBackground={() => (
                    <View style={[tailwind`bg-white overflow-hidden bg-black`]}>
                        <ImageBackground style={tailwind`h-full`} source={require('../../assets/login-background.png')}>
                            <Image style={tailwind`w-40 h-40 mx-auto my-auto`} source={require('../../assets/logo-cp.png')} />
                        </ImageBackground>
                    </View>
                )}
                parallaxHeaderHeight={250}
                contentContainerStyle={tailwind`rounded-t-[2rem] -mt-9`}
            >
                <View style={[tailwind`px-5 mt-5 mb-10`]}>
                    <Text style={tailwind`text-lg py-2 text-green-900 font-semibold`}>
                        Acerca de Nosotros y Agradecimientos
                    </Text>
                    <Text
                        style={tailwind`text-base font-normal leading-6 text-slate-600`}
                    >
                        La aplicación fue desarrollada bajo la iniciativa de La Canasta Campesina con el objetivo de proporcionar a los productores de la cooperativa información vital y actualizada sobre enfermedades de las plantas, sus tratamientos, así como sobre diversos insectos y su impacto en los cultivos. Creemos en el poder de la información para fortalecer la agricultura y contribuir al bienestar de las comunidades agrícolas.
                    </Text>

                    <Text style={tailwind`text-lg py-2 mt-4 text-green-900 font-semibold`}>Agradecimientos:</Text>
                    <Text style={tailwind`mt-2 text-base font-normal leading-6 text-slate-600`}>
                        Queremos expresar nuestro agradecimiento a los valiosos colaboradores que han desempeñado un papel fundamental en el desarrollo de esta aplicación:
                    </Text>
                    <View style={tailwind`w-full`}>
                    <Image source={require('../../assets/images/cooperantes.png')} style={tailwind`w-90 h-70 mx-auto my-10`} />
                    </View>
                    
                    {/* Lista de Cooperantes */}
                    <Text style={tailwind`text-base font-normal leading-6 text-slate-600`}>1. Estudiantes de Ingeniería Agroecológica de la Universidad Luterana Salvadoreña</Text>
                    <Text style={tailwind`text-base font-normal leading-6 text-slate-600`}>2. AFD (Agence Française de Développement)</Text>
                    <Text style={tailwind`text-base font-normal leading-6 text-slate-600`}>3. Secours Populaire Français</Text>
                    <Text style={tailwind`text-base font-normal leading-6 text-slate-600`}>4. Cooperación Española</Text>
                    <Text style={tailwind`text-base font-normal leading-6 text-slate-600`}>5. Associació Catalana per la Pau</Text>
                    <Text style={tailwind`text-base font-normal leading-6 text-slate-600`}>6. Embajada de España en El Salvador</Text>

                    {/* Agradecimiento Especial */}
                    <Text style={tailwind`text-lg py-2 mt-6 text-green-900 font-semibold`}>Agradecimiento Especial:</Text>
                    <Text style={tailwind`mt-2 text-base font-normal leading-6 text-slate-600`}>
                        Queremos expresar nuestro agradecimiento a todos aquellos que, de una forma u otra, han contribuido al desarrollo y éxito de esta aplicación. Vuestras acciones marcan la diferencia y fortalecen nuestra misión de apoyar a los productores de La Canasta Campesina.
                    </Text>

                    <Text style={tailwind`mt-6 text-base font-normal leading-6 text-slate-600`}>Gracias por ser parte de esta iniciativa que impulsa el conocimiento y el bienestar en la agricultura. ¡Juntos cultivamos un futuro más próspero!</Text>

                </View>
            </ParallaxScrollView>
            <StatusBar barStyle="dark-content" />
        </View>
    );
}
