import { useQuery } from "react-query";
import Select from "../atoms/select";
import RoomListing from "@/services/room-listing";
import { IRoomListingFilters } from "@/types/room-filters";
import ButtonToggle from "../molecules/button-toggle";
import RangeSlider from "../molecules/range-slider";

interface Props {
  filters: IRoomListingFilters;
  updateFilters: (updatedFilters: IRoomListingFilters) => void;
}

const RoomListingFilters: React.FC<Props> = ({ filters, updateFilters }) => {
  const { data } = useQuery({
    queryKey: ["room-filters"],
    queryFn: RoomListing.filters,
  });

  return (
    <div className="flex flex-row gap-4 items-center">
      <Select
        label="Location"
        placeholder="Choose destination"
        options={data?.locations || []}
        onSelectionChange={(v) => updateFilters({ ...filters, location: v })}
      />
      <ButtonToggle
        label="Availability"
        buttons={["Available", "Booked"]}
        selected={filters?.availability}
        onChange={(status) => {
          updateFilters({ ...filters, availability: status });
        }}
      />
      <div className="w-44">
        <RangeSlider
          label="Price range"
          range={[filters.minPrice, filters.maxPrice]}
          max={data?.maxPrice || 5000}
          min={data?.minPrice || 100}
          onChange={(range) =>
            updateFilters({
              ...filters,
              minPrice: range[0],
              maxPrice: range[1],
            })
          }
        />
      </div>
    </div>
  );
};

export default RoomListingFilters;
