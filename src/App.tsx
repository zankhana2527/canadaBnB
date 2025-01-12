import { RouterProvider } from "react-router-dom";
import router from "./router";
import AppQueryClientProvider from "./providers/query-client";
import { RoomBookingContextProvider } from "./contexts/room-booking";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <AppQueryClientProvider>
      <RoomBookingContextProvider>
        <Toaster />
        <RouterProvider router={router} />
      </RoomBookingContextProvider>
    </AppQueryClientProvider>
  );
}

export default App;
