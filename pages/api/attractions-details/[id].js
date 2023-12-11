import axios from 'axios';

export default async function handler(req, res) {
  try {
    const { id } = req.query;
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${id}&key=${process.env.NEXT_PUBLIC_GOOGLEMAPS_API_KEY}`
    );

    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
