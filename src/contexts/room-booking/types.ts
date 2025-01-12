export type TBooking = {
  roomId: number;
  noOfGuests: number;
};

export type TBookingActions =
  | { type: "make_booking"; payload: TBooking }
  | { type: "remove_booking"; payload: TBooking };

export interface IRoomBookingContext {
  bookings: TBooking[];
  updateBooking: (call: TBookingActions) => void;
}
