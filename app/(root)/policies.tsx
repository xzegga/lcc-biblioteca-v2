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
                <View style={[tailwind`px-5 mt-5`]}>
                    <Text style={tailwind`text-lg py-2 text-green-900 font-semibold`}>
                        Política de Privacidad de "Biblioteca Virtual La Canasta Campesina"
                    </Text>
                    <Text>Fecha de entrada en vigor: Noviembre 15, 2023</Text>
                    <Text
                        style={tailwind`text-base font-normal leading-6 text-slate-600`}
                    >
                        Agradecemos tu interés en utilizar la aplicación "Biblioteca Virtual La Canasta Campesina". Esta Política de Privacidad describe cómo recopilamos, utilizamos y protegemos la información personal de los usuarios. Al utilizar nuestra aplicación, aceptas las prácticas descritas en esta política.
                    </Text>
                    <Text style={tailwind`mt-6 text-base font-normal leading-6 text-slate-600`}>
                        <Text style={tailwind`font-semibold`}>
                        1. Información Recopilada:
                        </Text>
                        {'\n'}Datos de Registro: Cuando te registras en la aplicación, recopilamos información como tu nombre, dirección de correo electrónico y cualquier otra información proporcionada durante el proceso de registro.
                        {'\n\n'}Datos de Uso: Recopilamos información sobre cómo utilizas la aplicación, incluyendo las consultas realizadas, el tiempo de uso y las interacciones con el contenido.
                    </Text>
                    <Text style={tailwind`mt-6 text-base font-normal leading-6 text-slate-600`}>
                        <Text style={tailwind`font-semibold`}>2. Uso de la Información:</Text>
                        {'\n'}Utilizamos la información recopilada para proporcionar y mejorar nuestros servicios, responder a consultas y personalizar la experiencia del usuario.
                        {'\n\n'}Google Analytics: Implementamos Google Analytics para recopilar datos de uso y tendencias. Estos datos nos ayudan a entender cómo los usuarios interactúan con la aplicación y a realizar mejoras continuas.
                    </Text>
                    <Text style={tailwind`mt-6 text-base font-normal leading-6 text-slate-600`}>
                        <Text style={tailwind`font-semibold`}>3. Compartir Información:</Text>
                        {'\n'}No compartimos tu información personal con terceros, excepto cuando sea necesario para cumplir con la ley, proteger nuestros derechos o responder a situaciones de emergencia.
                    </Text>
                    <Text style={tailwind`mt-6 text-base font-normal leading-6 text-slate-600`}>
                        <Text style={tailwind`font-semibold`}>4. Seguridad:</Text>
                        {'\n'}La aplicación utiliza Google Analytics para recopilar datos estadísticos sobre el uso de la aplicación. La información recopilada por Google Analytics puede incluir datos sobre el dispositivo, la ubicación y la actividad del usuario. Consulta la Política de Privacidad de Google.
                    </Text>
                    <Text style={tailwind`mt-6 text-base font-normal leading-6 text-slate-600`}>
                        <Text style={tailwind`font-semibold`}>5. Google Analytics:</Text>
                        {'\n'}Al utilizar la Aplicación, aceptas la descarga automática de imágenes relacionadas con los cultivos para su visualización sin conexión.
                    </Text>
                    <Text style={tailwind`mt-6 text-base font-normal leading-6 text-slate-600`}>
                        <Text style={tailwind`font-semibold`}>6. Cambios en la Política de Privacidad:</Text>
                        {'\n'}Nos reservamos el derecho de modificar esta Política de Privacidad en cualquier momento. Las actualizaciones se publicarán en www.lacanastacampesina.org.
                    </Text>
                    <Text style={tailwind`mt-4 text-base font-normal leading-6 text-slate-600 mb-8`}>
                        <Text style={tailwind`font-semibold`}>7. Contacto:</Text>
                        {'\n'}Si tienes preguntas sobre esta Política de Privacidad, puedes contactarnos en info@lacanastacampesina.org.
                    </Text>

                    <Text
                        style={tailwind`text-base font-normal leading-6 text-slate-600 mb-8`}
                    >
                        Al utilizar la aplicación, aceptas el procesamiento de tu información según lo descrito en esta Política de Privacidad. Te recomendamos revisar periódicamente la política para estar informado sobre cómo protegemos tu privacidad.
                    </Text>
                </View>
            </ParallaxScrollView>
            <StatusBar barStyle="dark-content" />
        </View>
    );
}
