import { createBrowserRouter } from "react-router-dom";
import RoomListingPage from "../pages/rooms";
import RoomDetailPage from "../pages/room-detail";
import RootLayout from "../layout/root";

const rootRouter = createBrowserRouter([
  {
    path: "/",
    errorElement: <h1>Error - Page not found</h1>,
    element: <RootLayout />,
    children: [
      {
        path: "",
        element: <RoomListingPage />,
      },
      {
        path: "room-detail/:roomId",
        element: <RoomDetailPage />,
      },
    ],
  },
]);

export default rootRouter;
