import Link from "@/components/atoms/link";
import RoomListing from "@/services/room-listing";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { CircleUserRound, Star, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Static placeholder images
import roomDetailPrimaryImg from "../assets/rooms/room-detail-primary.jpg";
import roomDetail1 from "../assets/rooms/room-detail-2.jpg";
import roomDetail2 from "../assets/rooms/room-detail-3.jpg";
import roomDetail3 from "../assets/rooms/room-detail-4.jpg";
import Weather from "@/services/weather";
import { RoomBookingContext } from "@/contexts/room-booking";
import React from "react";
import { useToast } from "@/hooks/use-toast";

const RoomDetailPage = () => {
  const { roomId } = useParams();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { bookings, updateBooking } = React.useContext(RoomBookingContext);

  const { data: room } = useQuery({
    queryKey: ["room-detail", roomId],
    queryFn: () => RoomListing.getById(Number(roomId)),
  });
  const { data: weather } = useQuery({
    queryKey: ["weather-for-room", roomId, room?.lat, room?.lng],
    queryFn: () => Weather.get(room?.lat as number, room?.lng as number),
    enabled: !!room,
  });

  if (!roomId) {
    <div>
      <p>
        We are not able to track down the room in our listings. Please double
        verify the link.
      </p>
    </div>;
  }

  const reserve = () => {
    updateBooking?.({
      type: "make_booking",
      // [INFO] - Hardcoding no of guests for just demo purpose
      payload: { roomId: room?.id || NaN, noOfGuests: 2 },
    });
    toast({
      title: "Room is reserved!!",
    });
  };

  const cancelReservation = () => {
    updateBooking?.({
      type: "remove_booking",
      // [INFO] - Hardcoding no of guests for just demo purpose
      payload: { roomId: room?.id || NaN, noOfGuests: 2 },
    });
    toast({
      title: "Cancelled room reservation.",
      variant: "destructive",
    });
  };

  const isBooked = !!bookings?.find((booking) => booking.roomId === room?.id);

  return (
    <div className="sm:mx-8 md:mx-12 lg:mx-24 flex flex-col gap-4">
      <div>
        <Button
          className="w-auto"
          variant="secondary"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft />
          Back
        </Button>
      </div>
      <div className="flex flex-row justify-between items-center">
        <h3 className="text-2xl">{room?.name}</h3>
        <div>
          <Link href="/share" label="Share" />
        </div>
      </div>
      <div className="grid grid-rows-2 grid-cols-4 grid-flow-col gap-2 rounded-md overflow-hidden">
        <div className="h-full  row-span-2 col-span-2">
          <img src={roomDetailPrimaryImg} className="h-full" />
        </div>
        <div className="h-full">
          <img src={roomDetail1} className="h-full w-full" />
        </div>
        <div className="h-full">
          <img src={roomDetail2} className="h-full w-full" />
        </div>
        <div className="h-full">
          <img src={roomDetail3} className="h-full w-full" />
        </div>
        <div className="h-full">
          <img src={roomDetail1} className="h-full w-full" />
        </div>
      </div>
      <div className="flex flex-row justify-between items-start gap-8 sm:flex-wrap lg:flex-nowrap">
        <div className="w-full flex flex-col gap-4 divide-y-[1px]">
          <div>
            <p className="text-lg font-medium">Room in {room?.location}</p>
            <p className="text-md text-slate-700">
              Details: 1 double bed, 2 bathrooms, 1 kitchen
            </p>
            <div className="flex flex-row items-center gap-1">
              <Star size="16px" />
              <p>{room?.rating}</p>
            </div>
          </div>
          <div className="border-slate-200 pt-4 flex flex-row gap-4 items-center">
            <CircleUserRound size="32px" className="text-slate-500" />
            <p>
              Hosted by <span className="font-medium">{room?.hostName}</span>
            </p>
          </div>
          <div className="border-slate-200 py-4 flex flex-col gap-2">
            <h3 className="text-xl font-medium">About the place</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex quo
              alias possimus a! Corrupti nihil eaque molestiae delectus
              exercitationem dolorem? Maiores sapiente dignissimos praesentium
              eius autem architecto voluptatibus repudiandae consequuntur? Lorem
              ipsum dolor sit amet consectetur adipisicing elit. Ex quo alias
              possimus a! Corrupti nihil eaque molestiae delectus exercitationem
              dolorem? Maiores sapiente dignissimos praesentium eius autem
              architecto voluptatibus repudiandae consequuntur?
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex quo
              alias possimus a! Corrupti nihil eaque molestiae delectus
              exercitationem dolorem? Maiores sapiente dignissimos praesentium
              eius autem architecto voluptatibus repudiandae consequuntur?
            </p>
          </div>
        </div>
        <div className="flex sm:flex-row lg:flex-col gap-4 sm:flex-1 lg:flex-none">
          <div className="border-2 bg-blue-100 border-dashed border-slate-200 rounded-md sm:w-full lg:w-96 p-4 h-auto flex flex-col gap-4">
            <div>
              <p className="text-xs font-medium text-blue-800">Weather info:</p>
              <p className="font-medium text-3xl">
                {weather?.weather?.[0]?.main || ""}
              </p>
            </div>

            <div className="flex flex-row items-start divide-x-2 divide-y-slate-700">
              <div className="flex-1">
                <p className="text-slate-500">Temp</p>
                <p className="text-2xl"> {weather?.main?.temp || "-"}</p>
              </div>
              <div className="flex-1">
                <p className="text-slate-500">Feels like</p>
                <p className="text-2xl">{weather?.main?.feels_like || "-"}</p>
              </div>
            </div>
          </div>

          <div className="border border-slate-200 rounded-md sm:w-full lg:w-96 p-4 h-auto flex flex-col gap-4">
            <p className="text-lg font-medium">CAD {room?.price} / night</p>

            <div className="flex flex-row items-center gap-2">
              <label className="text-slate-500" htmlFor="number-of-guests">
                Guests:
              </label>
              <Input
                type="number"
                id="number-of-guests"
                defaultValue={1}
                min={1}
                max={10}
              />
            </div>
            {isBooked ? (
              <Button
                className="w-full"
                variant="destructive"
                onClick={cancelReservation}
              >
                Cancel Booking
              </Button>
            ) : (
              <Button className="w-full" onClick={reserve}>
                Reserve
              </Button>
            )}
            <p className="text-xs text-slate-400 text-center">
              Booking can be cancelled anytime.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetailPage;
