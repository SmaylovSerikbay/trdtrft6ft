interface Photo {
   name: string;
   resource_id: string;
   sizes: {
      name:
         | "ORIGINAL"
         | "DEFAULT"
         | "XXXS"
         | "XXS"
         | "XS"
         | "S"
         | "M"
         | "L"
         | "XL"
         | "XXL"
         | "XXXL"
         | "C";
      url: string;
   }[];
}

interface Preview {
   resource_id: string;
   preview: string;
   title: string;
   created: Date;
}

export async function getData(name: string) {
   const requests = [
      `https://cloud-api.yandex.net/v1/disk/resources?path=%2F${name}`,
      `https://cloud-api.yandex.net/v1/disk/resources/download?path=%2F${name}`,
   ].map((link) =>
      fetch(link, {
         method: "GET",
         headers: {
            Authorization:
               "OAuth y0__wgBEIWTi9cHGIGONCCk0_XuEUg7uFb-vRjRJ1cfOICK3ePgYAuf",
         },
      }).then((res) => res.json()),
   );

   const data = await Promise.all(requests);
   const [photoData, downloadObj] = data;

   // title
   const { name: title } = photoData;
   // Дата
   const { created } = photoData;

   const { items } = photoData._embedded;
   // Фото
   const photos = items.flatMap((photo: Photo) => {
      return {
         id: photo.resource_id,
         name: photo.name,
         url: photo.sizes
            .filter((size) => size.name === "ORIGINAL")
            .map((src) => src.url)[0],
      };
   });

   return { title, created, photos, downloadObj };
}

export async function getPreview(name: string): Promise<Preview> {
   try {
      const res = await fetch(
         `https://cloud-api.yandex.net/v1/disk/resources?path=%2F${name}&preview_size=420x500`,
         {
            method: "GET",
            headers: {
               Authorization:
                  "OAuth y0__wgBEIWTi9cHGIGONCCk0_XuEUg7uFb-vRjRJ1cfOICK3ePgYAuf",
            },
         },
      );

      const data = await res.json();

      const { resource_id } = data;

      const { name: title } = data;

      const { created } = data;

      const { items } = data._embedded;
      const preview = items[0].sizes[0].url;

      return { resource_id, preview, title, created };
   } catch (err) {
      throw err;
   }
}
