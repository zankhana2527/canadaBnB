export interface IRoomListingFilters {
  minPrice: number;
  maxPrice: number;
  location: string;

  // More strict types can be inforced here, keeping it simple for assignment purpose.
  // availability: "Booked" | "Available";
  availability: string;
}
