import _debounce from 'async-debounce';
import axios from 'axios';

import qs from 'qs';

const WIT_API_KEY = 'ZVNP7QNSQRZ76EF7WHBS4PD6B76DQP5U';

export const getWitResponse = async (query) => {
  try {
    const result = await axios.get(`https://api.wit.ai/message?${qs.stringify({
      q: query
    })}`, {
      headers: {
        Authorization: `Bearer ${WIT_API_KEY}`
      }
    })
    return result && result.data;
  }
  catch (e) {
    return null;
  }
};