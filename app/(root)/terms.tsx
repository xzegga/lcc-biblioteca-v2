import {
    View,
    Text,
    StatusBar,
    ImageBackground,
} from "react-native";
import tailwind from "twrnc";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Image } from "expo-image";
import ParallaxScrollView from "../../components/ParallaxScrollView";
import useScrollBar from "../../hooks/useScrollBar";

export default function Terms() {
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
                        Términos y Condiciones de Uso de la Aplicación "Biblioteca Virtual La Canasta Campesina"
                    </Text>
                    <Text>Fecha de entrada en vigor: Noviembre 15, 2023</Text>
                    <Text
                        style={tailwind`text-base font-normal leading-6 text-slate-600`}
                    >
                        Bienvenido/a a la aplicación móvil "Biblioteca Virtual La Canasta Campesina" (en adelante, la "Aplicación"). Antes de utilizar esta aplicación, te solicitamos que leas detenidamente los siguientes Términos y Condiciones de Uso (en adelante, los "Términos"). Al acceder y utilizar la Aplicación, aceptas automáticamente estos Términos en su totalidad.
                    </Text>
                    <Text style={tailwind`mt-6 text-base font-normal leading-6 text-slate-600`}>
                        <Text style={tailwind`font-semibold`}>
                            1. Registro y Credenciales de Usuario:
                        </Text>
                        {'\n'}Para acceder a la Aplicación, debes registrarte en el sitio web www.lacanastacampesina.org y completar el formulario de solicitud.
                        {'\n\n'}Tu usuario y contraseña serán proporcionados después de que tu solicitud sea aprobada.
                        {'\n\n'}Es responsabilidad del usuario mantener la confidencialidad de sus credenciales y notificar cualquier uso no autorizado de su cuenta.
                    </Text>
                    <Text style={tailwind`mt-6 text-base font-normal leading-6 text-slate-600`}>
                        <Text style={tailwind`font-semibold`}>2. Uso Aceptable:</Text>
                        {'\n'}La Aplicación está diseñada para proporcionar información sobre cultivos, patologías, insectos y deficiencias en los cultivos, así como para ofrecer una consulta en temas no cubiertos por la aplicación.
                        {'\n\n'}No puedes utilizar la Aplicación de manera que viole leyes aplicables o estos Términos. Cualquier uso indebido resultará en la terminación de tu cuenta.
                    </Text>
                    <Text style={tailwind`mt-6 text-base font-normal leading-6 text-slate-600`}>
                        <Text style={tailwind`font-semibold`}>3. Permisos de Acceso:</Text>
                        {'\n'}La Aplicación requiere permisos para acceder a la galería y la cámara del dispositivo para el área de consultas.
                        {'\n\n'}Es necesario otorgar permisos para descargar imágenes al dispositivo y permitir el funcionamiento sin conexión.
                    </Text>
                    <Text style={tailwind`mt-6 text-base font-normal leading-6 text-slate-600`}>
                        <Text style={tailwind`font-semibold`}>4. Consultas y Contenido Generado por Usuarios:</Text>
                        {'\n'}El área de consulta permite a los usuarios plantear preguntas relacionadas con los cultivos. La información proporcionada por otros usuarios es responsabilidad de los mismos.
                        {'\n\n'}El contenido generado por los usuarios debe cumplir con normas éticas y legales. Nos reservamos el derecho de eliminar contenido que viole estos principios.
                    </Text>
                    <Text style={tailwind`mt-6 text-base font-normal leading-6 text-slate-600`}>
                        <Text style={tailwind`font-semibold`}>5. Descarga de Imágenes:</Text>
                        {'\n'}Al utilizar la Aplicación, aceptas la descarga automática de imágenes relacionadas con los cultivos para su visualización sin conexión.
                    </Text>
                    <Text style={tailwind`mt-6 text-base font-normal leading-6 text-slate-600`}>
                        <Text style={tailwind`font-semibold`}> 6. Privacidad:</Text>
                        {'\n'}La privacidad de los usuarios es fundamental. Consulta nuestra Política de Privacidad en www.lacanastacampesina.org para obtener más detalles sobre cómo manejamos la información personal.
                    </Text>
                    <Text style={tailwind`mt-6 text-base font-normal leading-6 text-slate-600`}>
                        <Text style={tailwind`font-semibold`}>7. Modificaciones y Actualizaciones:</Text>
                        {'\n'}Nos reservamos el derecho de modificar estos Términos en cualquier momento. Las actualizaciones se publicarán en www.lacanastacampesina.org.
                    </Text>
                    <Text style={tailwind`mt-6 text-base font-normal leading-6 text-slate-600`}>
                        <Text style={tailwind`font-semibold`}>8. Terminación del Servicio:</Text>
                        {'\n'}Podemos suspender o dar por terminado el acceso a la Aplicación en cualquier momento, por cualquier motivo, sin previo aviso.
                    </Text>
                    <Text style={tailwind`mt-4 text-base font-normal leading-6 text-slate-600 mb-8`}>
                        <Text style={tailwind`font-semibold`}>9. Contacto:</Text>
                        {'\n'}Para preguntas o inquietudes sobre estos Términos, contáctanos en info@lacanastacampesina.org.
                    </Text>

                    <Text
                        style={tailwind`text-base font-normal leading-6 text-slate-600 mb-8`}
                    >
                        Al utilizar la Aplicación, aceptas cumplir con estos Términos. Te recomendamos revisar periódicamente los Términos, ya que pueden actualizarse. ¡Gracias por utilizar "Biblioteca Virtual La Canasta Campesina"!
                    </Text>
                </View>
            </ParallaxScrollView>
            <StatusBar barStyle="dark-content" />
        </View>
    );
}
