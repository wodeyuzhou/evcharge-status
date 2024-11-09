import { NextApiRequest, NextApiResponse } from 'next';

let parkingData = {
  availableSpots: 0,
  parkingTimes: []
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { available_spots, parking_times } = req.body;
    parkingData = {
      availableSpots: available_spots,
      parkingTimes: parking_times
    };
    res.status(200).json({ message: 'Data updated successfully' });
  } else if (req.method === 'GET') {
    res.status(200).json(parkingData);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}