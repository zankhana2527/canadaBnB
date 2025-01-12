import { sleep } from "../utils/common";
import rooms from "../mock-data/rooms.json";
import { IRoom } from "@/types/room";

class RoomListingService {
  /**
   * @returns list of available rooms based on filters
   */
  async get(
    location: string | undefined,
    minPrice: number,
    maxPrice: number
  ): Promise<{ rooms: IRoom[]; total: number }> {
    // Dummy wait time to get behaviour of actual network call
    await sleep(2000);

    let allRooms = rooms;
    if (location) {
      allRooms = allRooms.filter((room) => room.location === location);
    }

    // Price filter
    minPrice = minPrice || 0;
    maxPrice = maxPrice || Infinity;
    allRooms = allRooms.filter(
      (room) => room.price >= minPrice && room.price <= maxPrice
    );

    // [INFO]: Could include pagination here
    return { rooms: allRooms, total: rooms.length };
  }

  /**
   * @returns details of a room based on id passed
   */
  async getById(id: number): Promise<IRoom | undefined> {
    // Dummy wait time to get behaviour of actual network call
    await sleep(2000);

    const roomDetail = rooms.find((room) => room.id === id);
    return roomDetail;
  }

  /**
   * @returns payload of available filters such as min and max prices and locations on which users can perform filter operation
   */
  async filters(): Promise<{
    minPrice: number;
    maxPrice: number;
    locations: string[];
  }> {
    // Dummy wait time to get behaviour of actual network call
    await sleep(2000);

    const prices = rooms.map((room) => room.price);
    const [minPrice, maxPrice] = [Math.min(...prices), Math.max(...prices)];

    const locations = [...new Set(rooms.map((room) => room.location))];

    return { minPrice, maxPrice, locations };
  }
}

const RoomListing = new RoomListingService();
export default RoomListing;
