"use server";

import { CreateEventParams } from "../../types/index";
import { connectToDatabase } from "../database";
import Event from "../database/models/event.model";
import User from "../database/models/user.model";
import { handleError } from "../utils";

export const createEvent = async ({
  event,
  userId,
  path,
}: CreateEventParams) => {
  try {
    await connectToDatabase();
    console.log(userId)
    const organizer = await User.findById(userId);

    if (!organizer) {
      throw new Error("Organizer not found");
    }

    const newEvent = await Event.create({
      ...event,
      category: event.categoryId,
      organizer: userId,
    });

    return JSON.parse(JSON.stringify(newEvent));
  } catch (error) {
    handleError(error);
  }
};
