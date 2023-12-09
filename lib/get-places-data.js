import axios from 'axios';

export const getPlacesData = async (longitude, latitude) => {
  try {
    const {
      data: { data },
    } = await axios.get(
      `https://travel-advisor.p.rapidapi.com/restaurants/list-by-latlng`,
      {
        //url: URL,
        params: {
          longitude: '109.19553',
          latitude: '12.235588',
          lunit: 'km',
          currency: 'USD',
          lang: 'en_US',
        },
        headers: {
          'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
          'x-rapidapi-key': process.env.NEXT_PUBLIC_RAPID_API_KEY,
        },
      }
    );
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
};
