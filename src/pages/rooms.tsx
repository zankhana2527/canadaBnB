import React from "react";
import RoomListingCard from "@/components/organisms/room-listing-card";
import RoomListing from "../services/room-listing";
import { useQuery } from "react-query";
import RoomListingFilters from "@/components/organisms/room-listing-filters";
import { IRoomListingFilters } from "@/types/room-filters";
import { RoomBookingContext } from "@/contexts/room-booking";

const RoomListingPage = () => {
  const { bookings } = React.useContext(RoomBookingContext);

  const [filters, setFilters] = React.useState<IRoomListingFilters>({
    location: "",
    minPrice: 0,
    maxPrice: 700,
    availability: "Available",
  });

  const { data, isLoading } = useQuery({
    queryKey: [
      "rooms-listing",
      filters.location,
      filters.minPrice,
      filters.maxPrice,
    ],
    // Location filter is on server side
    queryFn: () =>
      RoomListing.get(filters.location, filters.minPrice, filters.maxPrice),
  });

  // Local side filtering
  const rooms = React.useMemo(() => {
    const booked = bookings?.map((booking) => booking.roomId) || [];
    return data?.rooms?.filter((room) =>
      filters.availability === "Available"
        ? !booked.includes(room.id)
        : booked.includes(room.id)
    );
  }, [bookings, data?.rooms, filters.availability]);

  return (
    <div className="flex flex-col gap-8">
      <RoomListingFilters filters={filters} updateFilters={setFilters} />
      {isLoading ? (
        <div className="flex justify-center items-center bg-slate-100 h-96 rounded-md">
          Fetching available rooms...
        </div>
      ) : rooms?.length === 0 ? (
        <div>
          No rooms available. Try clearing/changing the filters to find rooms.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {rooms?.map((room) => (
            <RoomListingCard key={room.id} room={room} />
          ))}
        </div>
      )}
    </div>
  );
};

export default RoomListingPage;
