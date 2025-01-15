interface YandexDiskItem {
  type: string;
  mime_type: string;
  resource_id: string;
  name: string;
  file: string;
}

interface YandexDiskResponse {
  _embedded: {
    items: YandexDiskItem[];
  };
}

const YANDEX_DISK_TOKEN = "y0_AgAAAAB64smFAAz8zQAAAAEc7G8dAABxKsTxTQ9BpLnROYn1Mmf0LOMo4A";

export async function getYandexDiskFiles(folderPath: string) {
  try {
    const response = await fetch(
      `https://cloud-api.yandex.net/v1/disk/resources?path=${encodeURIComponent(folderPath)}&limit=1000`,
      {
        headers: {
          Authorization: `OAuth ${YANDEX_DISK_TOKEN}`
        }
      }
    );

    if (!response.ok) throw new Error('Failed to fetch files');

    const data = await response.json() as YandexDiskResponse;
    const { items } = data._embedded;

    return items
      .filter((item) => item.type === 'file' && item.mime_type.startsWith('image/'))
      .map((photo) => ({
        id: photo.resource_id,
        name: photo.name,
        url: photo.file
      }));
  } catch (error) {
    console.error('Error fetching files:', error);
    return [];
  }
}

export async function createYandexDiskFolder(path: string) {
  try {
    const response = await fetch(
      `https://cloud-api.yandex.net/v1/disk/resources?path=${encodeURIComponent(path)}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `OAuth ${YANDEX_DISK_TOKEN}`
        }
      }
    );

    return response.ok;
  } catch (error) {
    console.error('Error creating folder:', error);
    return false;
  }
}

export async function uploadToYandexDisk(file: File, path: string) {
  try {
    // Получаем URL для загрузки
    const getUploadUrlResponse = await fetch(
      `https://cloud-api.yandex.net/v1/disk/resources/upload?path=${encodeURIComponent(path)}`,
      {
        headers: {
          Authorization: `OAuth ${YANDEX_DISK_TOKEN}`
        }
      }
    );

    const { href } = await getUploadUrlResponse.json();

    // Загружаем файл
    const uploadResponse = await fetch(href, {
      method: 'PUT',
      body: file
    });

    return uploadResponse.ok;
  } catch (error) {
    console.error('Error uploading file:', error);
    return false;
  }
} 