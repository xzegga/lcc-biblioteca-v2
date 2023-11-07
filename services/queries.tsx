import { AxiosClient } from "./axiosClient";

export default function QueryService(token: string) {
  const axiosClient = AxiosClient.get(token);
  const axiosClientMultipart = AxiosClient.get(token, true);
  return {
    async post(data: any) {
      const params = {
        title: data.qs_request,
        status: "publish",
      };
      try {
        const response = (await axiosClient.post("/wp/v2/consulta", params))
          .data;

        if (response?.id) {
          const img = data.imagen ? await this.upload(data.imagen) : null;
          const params = {
            acf: {
              ...data,
              imagen: img.id as number,
            },
          };
          await axiosClient.post(`/wp/v2/consulta/${response.id}`, params);

          return { ...response, img };
        }
      } catch (error) {
        return error;
      }
    },
    async upload(uri: any) {
      const name = uri.split("/").pop();
      const match = /\.(\w+)$/.exec(name as string);
      const type = match ? `image/*` : `image`;

      let formData = new FormData();

      formData.append("file", { uri, name, type } as any);

      const img = (await axiosClientMultipart.post("/wp/v2/media", formData))
        .data;
      return img;
    },
  };
}
