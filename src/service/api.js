import axios from 'axios';

export default async ({ url, limit }) => {
  try {
    const { data } = await axios.get(url, {
      params: {
        limit,
      },
    });
    return data;
  } catch (err) {
    return err;
  }
};
