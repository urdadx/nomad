import axios from 'axios';

export default async function handler(req, res) {
  try {
    const cities = [
      'Accra',
      'Kumasi',
      'Ho',
      'Tamale',
      'Wa',
      'Bolgantanga',
      'Sunyani',
    ];
    const attractionsData = [];

    for (const city of cities) {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/textsearch/json?query=point+of+interest+in+${city}&key=${process.env.NEXT_PUBLIC_GOOGLEMAPS_API_KEY}&rankby=prominence`
      );

      if (response.data.results && response.data.results.length > 0) {
        // Filter out items without photos
        const attractionsWithPhotos = response.data.results.filter(
          (attraction) => attraction.photos && attraction.photos.length > 0
        );

        // Extract the first 3 places from the results with photos
        const limitedResults = attractionsWithPhotos.slice(0, 3);

        attractionsData.push(limitedResults);
      }
    }
    console.log(attractionsData);
    res.status(200).json(attractionsData);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
