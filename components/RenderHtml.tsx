import React from "react";
import { View } from "react-native";
import HTML from "react-native-render-html";

export default function RenderHTMLComponent({ html }: { html: string }) {
  const renderers = {
    // Personaliza cómo se representan los elementos HTML aquí si es necesario
  };

  return (
    <View style={{ flex: 1 }}>
      <HTML
        source={{ html }}
        renderers={renderers}
        contentWidth={300} // Ajusta el ancho según tus necesidades
      />
    </View>
  );
}
