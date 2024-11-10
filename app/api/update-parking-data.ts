import { NextRequest, NextResponse } from 'next/server';

let parkingData = {
  availableSpots: 0,
  parkingTimes: []
};

export async function POST(req: NextRequest) {
  const { available_spots, parking_times } = await req.json();
  parkingData = {
    availableSpots: available_spots,
    parkingTimes: parking_times
  };
  return NextResponse.json({ message: 'Data updated successfully' });
}

export async function GET() {
  return NextResponse.json(parkingData);
}