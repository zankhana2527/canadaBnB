import React from "react";
import { IRoomBookingContext, TBookingActions } from "./types";

export const RoomBookingContext = React.createContext<
  Partial<IRoomBookingContext>
>({ bookings: [] });

const bookingReducer = (
  state: IRoomBookingContext["bookings"],
  action: TBookingActions
) => {
  switch (action.type) {
    case "make_booking":
      return [...state, action.payload];
    case "remove_booking":
      return state.filter((state) => state.roomId !== action.payload.roomId);
    default:
      return state;
  }
};

export const RoomBookingContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [bookings, updateBooking] = React.useReducer(bookingReducer, []);

  return (
    <RoomBookingContext.Provider
      value={{
        bookings,
        updateBooking,
      }}
    >
      {children}
    </RoomBookingContext.Provider>
  );
};
