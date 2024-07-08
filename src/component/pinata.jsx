import axios from 'axios';

const pinataApiKey = 'a6e50f62847b55509419';
const pinataSecretApiKey = '2f89858b273342a7994d2093faa0a56480bda602b56c63b55dd81593b3de1cd7';

export const uploadToPinata = async (file) => {
  const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;

  let data = new FormData();
  data.append('file', file);

  const metadata = JSON.stringify({
    name: file.name,
  });
  data.append('pinataMetadata', metadata);

  const options = JSON.stringify({
    cidVersion: 0,
  });
  data.append('pinataOptions', options);

  try {
    const response = await axios.post(url, data, {
      maxContentLength: 'Infinity',
      headers: {
        'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
        pinata_api_key: pinataApiKey,
        pinata_secret_api_key: pinataSecretApiKey,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error uploading file to Pinata:', error);
    throw error;
  }
};
