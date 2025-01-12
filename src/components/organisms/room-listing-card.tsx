import { IRoom } from "@/types/room";
import React from "react";
import { Star } from "lucide-react";
import { Link } from "react-router-dom";
import { RoomBookingContext } from "@/contexts/room-booking";

interface Props {
  room: IRoom;
}
const RoomListingCard: React.FC<Props> = ({ room }) => {
  const { bookings } = React.useContext(RoomBookingContext);

  const isBooked = !!bookings?.find((booking) => booking.roomId === room.id);

  return (
    <Link to={`room-detail/${room.id}`}>
      <div className="flex flex-col gap-2 rounded-md hover:bg-gray-100 hover:scale-5 cursor-pointer hover:scale-105 transition-all hover:p-2">
        <div className="relative">
          <img
            src={room.imageUrl}
            className="rounded-md w-full h-[200px] object-cover"
          />
          <div className="absolute top-3 right-3 bg-white rounded-md px-2">
            <div className="flex flex-row items-center gap-1">
              <Star size="16px" />
              <p className="bg-white rounded-full">{room.rating}</p>
            </div>
          </div>
          {isBooked && (
            <div className="absolute top-3 left-3 bg-red-700 rounded-md px-2">
              <p className="text-white rounded-full text-sm py-1">Booked</p>
            </div>
          )}
        </div>
        <div>
          <p className="text-medium">{room.name}</p>
          <p className="text-sm text-slate-500">{room.location}</p>
          <p className="text-sm text-slate-500">CAD {room.price} / night</p>
        </div>
      </div>
    </Link>
  );
};

export default RoomListingCard;
