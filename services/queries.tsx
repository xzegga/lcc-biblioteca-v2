import { AxiosClient } from "./axiosClient";

export default function QueryService(token: string) {
    const axiosClient = AxiosClient.get(token);
    const axiosClientMultipart = AxiosClient.get(token, true);
    return {
        async post(data: any) {
            const params = {
                title: data.qs_request,
                status: 'publish',
            }
            try {
                const response = (await axiosClient.post('/wp/v2/consulta', params)).data;

                if (response?.id) {
                    const img = data.qs_image ? await this.upload(data.qs_image) : null;

                    const params = {
                        acf: {
                            ...data,
                            qs_image: img.id,
                        }
                    }
                    await axiosClient.post(`/wp/v2/consulta/${response.id}`, params);

                    return {...response, img}
                };
            } catch (error) {
                return error;
            }
        },
        async upload(image: any) {

            const name = image.split("/").pop();
            const match = /\.(\w+)$/.exec(name as string);
            const type = match ? `image/*` : `image`;

            let formData = new FormData();

            formData.append("file", {
                uri: image,
                name: name,
                type: type
            } as any);

            const img = (await axiosClientMultipart.post('/wp/v2/media', formData)).data; 
            return img;
        }

    }
}
