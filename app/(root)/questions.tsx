import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Animated,
  StatusBar,
} from "react-native";
import tailwind from "twrnc";
import { CustomHeader } from "../../components/CustomHeader";
import { EvilIcons } from "@expo/vector-icons";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { useAuth } from "../../context/AuthContext";
import { useQueries } from "../../hooks/useQueries";
import { Image } from "expo-image";
import LocalImage from "../../components/LocalImage";
import formatDate from "../../helpers/dateFormatter";
import Loading from "../../components/Loading";
import { FadeInDown } from "react-native-reanimated";
import { Crops } from "../../components/Crops";
import ParallaxScrollView from "../../components/ParallaxScrollView";
import useScrollBar from "../../hooks/useScrollBar";

export default function Questions() {
  const { authState } = useAuth();
  const queriesHook = useQueries();
  const [image, setImage] = useState<string | null>();
  const [question, setQuestion] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [headerActive, setHeaderActive] = useState(true);
  const queryItems = queriesHook.items(authState?.user);

  const { ref, onScroll } = useScrollBar({});

  const postQuery = async () => {
    if (authState?.user) {
      const post = {
        qs_request: question,
        qs_image: image,
        qs_date_question: new Date(),
        qs_user: authState.user,
      };
      setLoading(true);
      const saved = await queriesHook.postQuery(post);

      if (saved) {
        setLoading(false);
        setImage(null);
        setQuestion("");
      } else {
        Alert.alert("Error", "No se pudo guardar la consulta");
        setLoading(false);
      }
    }
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView style={[tailwind`bg-white h-full`]}>
      <ParallaxScrollView
        ref={ref}
        onScroll={onScroll}
        renderStickyHeader={() => (
          <View style={tailwind`bg-white pb-0 h-20 z-20 absolute`} />
        )}
        backgroundColor="transparent"
        style={{ flex: 1 }}
        parallaxHeaderHeight={120}
        stickyHeaderHeight={120}
        renderBackground={() => (
          <View style={[tailwind`bg-white p-2 pt-2 pb-0 w-full`]}>
            <CustomHeader />
            <View style={tailwind`pt-12`}></View>
          </View>
        )}
        headerActive={headerActive}
        backgroundScrollSpeed={3}
      >
        <View style={[tailwind`px-5 mt-0`]}>
          {loading && <Loading />}
          <Text style={tailwind`text-lg py-2 text-green-900 font-semibold`}>
            Consultas
          </Text>
          <Text
            style={tailwind`text-base font-normal leading-6 text-slate-600`}
          >
            Este es un espacio para aclarar dudas con los cultivos, recomendamos
            utilizar esta opción luego de haber buscado en la biblioteca y no
            haber podido encontar una solución a su interrogante.
          </Text>
          <View>
            <TextInput
              style={[
                tailwind`border text-base h-40 border-gray-300 p-2 mt-4 rounded-md`,
                { textAlignVertical: "top" },
              ]}
              value={question}
              multiline
              onChange={(e) => setQuestion(e.nativeEvent.text)}
              placeholder="Escriba su consulta"
            />
            {image && (
              <View style={tailwind`w-full h-[200px] overflow-hidden mt-6`}>
                <Image
                  source={{ uri: image }}
                  style={tailwind`w-full h-full`}
                />
              </View>
            )}
            <View
              style={tailwind`pt-4 flex flex-row justify-start items-center`}
            >
              <Text
                style={tailwind`text-base font-normal leading-6 text-slate-600 mr-4`}
              >
                Seleccionar imagen
              </Text>
              <View style={tailwind`flex flex-row items-center gap-2`}>
                <TouchableOpacity
                  onPress={takePhoto}
                  style={tailwind`flex flex-row items-center`}
                >
                  <EvilIcons name="camera" size={28} color="orange" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={pickImage}
                  style={tailwind`flex flex-row items-center`}
                >
                  <EvilIcons name="image" size={28} color="green" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setImage(null)}
                  style={tailwind`flex flex-row items-center`}
                >
                  <EvilIcons name="trash" size={28} color="red" />
                </TouchableOpacity>
              </View>
            </View>
            <View style={tailwind`ml-auto pt-4 mb-6`}>
              <TouchableOpacity
                onPress={postQuery}
                style={tailwind`h-10 bg-orange-500 w-25 rounded-md flex flex-row justify-center items-center px-6`}
              >
                <View style={tailwind`flex-1 flex items-center`}>
                  <Text
                    style={tailwind`text-white text-base font-medium text-center`}
                  >
                    Enviar
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <Text style={tailwind`text-lg py-2 text-green-900 font-semibold`}>
              Consultas anteriores
            </Text>
            <View>
              {queryItems?.length ? (
                <>
                  {queryItems.map((item: any) => {
                    return (
                      <View
                        key={item._id}
                        style={tailwind`border border-gray-300 rounded-md p-2 mb-2`}
                      >
                        {item.imagen && (
                          <View
                            style={tailwind`w-20 h-20 overflow-hidden mt-2`}
                          >
                            <LocalImage source={item.imagen} />
                          </View>
                        )}
                        <View
                          style={tailwind`flex flex-row justify-between items-center`}
                        >
                          <Text
                            style={tailwind`text-base font-medium text-slate-600`}
                          >
                            {item.qs_request}
                          </Text>
                          <Text
                            style={tailwind`text-xs font-medium text-slate-600`}
                          >
                            {formatDate(item.qs_date_question)}
                          </Text>
                        </View>
                      </View>
                    );
                  })}
                </>
              ) : (
                <Text>No hay consultas</Text>
              )}
            </View>
          </View>
        </View>
      </ParallaxScrollView>
      <StatusBar barStyle="dark-content" />
    </SafeAreaView>
  );
}
