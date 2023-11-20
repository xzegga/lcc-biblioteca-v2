import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import { useEffect, useState } from 'react';
import { Alert, StatusBar, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import tailwind from 'twrnc';

import { EvilIcons } from '@expo/vector-icons';
import NetInfo from '@react-native-community/netinfo';

import BackBtn from '../../components/BackAction';
import Loading from '../../components/Loading';
import LocalImage from '../../components/LocalImage';
import { useAuth } from '../../context/AuthContext';
import formatDate from '../../helpers/dateFormatter';
import { useQueries } from '../../hooks/useQueries';
import { useStore } from '../../hooks/useGlobalStore';

export default function Questions() {
  const { authState } = useAuth();
  const queriesHook = useQueries();
  const [image, setImage] = useState<string | null>();
  const [question, setQuestion] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const queryItems = queriesHook.items(authState?.user);


  const { networkStatus, setState } = useStore(state => ({
    networkStatus: state.networkStatus,
    setState: state.setState
  }));

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setState({ networkStatus: (state.isConnected! && state.isInternetReachable!) });
    });

    return () => {
      unsubscribe();
    }
  }, []);

  const postQuery = async () => {
    if (authState?.user) {
      const post = {
        qs_request: question,
        imagen: image,
        qs_date_question: new Date().toISOString(),
        qs_answer: "",
        qs_date_answer: "",
        qs_user: authState.user,
      };
      setLoading(true);
      const saved = await queriesHook.postQuery(post, networkStatus);

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
      allowsEditing: true,
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
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={[tailwind`bg-white h-full`]}>
      <BackBtn color={'rgb(15 23 42)'} />
      <ScrollView>
        <View style={[tailwind`px-5 mt-5`]}>
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
            <View style={tailwind`flex flex-row justify-end items-end mb-10`}>

              <View
                style={tailwind`pt-4`}
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
                    <EvilIcons name="camera" size={42} color="orange" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={pickImage}
                    style={tailwind`flex flex-row items-center`}
                  >
                    <EvilIcons name="image" size={42} color="green" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setImage(null)}
                    style={tailwind`flex flex-row items-center`}
                  >
                    <EvilIcons name="trash" size={42} color="red" />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={tailwind`ml-auto pt-4`}>
                <TouchableOpacity
                  onPress={postQuery}
                  disabled={question === "" || image === null || loading}
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

          </View>
          <View>
            <Text style={tailwind`text-lg py-2 text-green-900 font-semibold`}>
              Consultas anteriores
            </Text>
            <View>
              {queryItems?.length ? (
                <>
                  {queryItems.map((item: any, index) => {
                    return (
                      <View key={index}>
                        <View
                          style={tailwind`flex flex-row gap-3 justify-between items-center 
                        border-0 border-b-[1px] border-gray-300 rounded-md p-2 mb-2`}
                        >

                          <View
                            style={tailwind`flex flex-row gap-3 justify-between items-start`}
                          >
                            {item.imagen && (
                              <View
                                style={tailwind`w-20 h-20 overflow-hidden mt-0 rounded-md`}
                              >
                                <LocalImage source={item.imagen} />
                              </View>
                            )}

                            <View style={tailwind`w-full pr-4 flex-1`}>
                              <View style={tailwind`pb-2`}>
                                <Text
                                  style={tailwind`text-xs font-medium text-slate-600`}
                                >
                                  {formatDate(item.qs_date_question)}
                                </Text>
                                <Text
                                  style={tailwind`text-base font-medium text-slate-600`}
                                >
                                  {item.qs_request}
                                </Text>

                              </View>
                              {item.qs_answer! ? (
                                <View >
                                  <Text style={tailwind`text-base font-normal text-slate-600`}>
                                    {item.qs_answer}</Text>
                                  <Text
                                    style={tailwind`text-xs font-medium text-slate-600  self-end`}
                                  >
                                    {formatDate(item.qs_date_answer)}
                                  </Text>
                                </View>
                              ) : <Text>Sin respuesta por el momento</Text>}

                            </View>

                          </View>

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

      </ScrollView>
      <StatusBar barStyle="dark-content" />
    </View>
  );
}
