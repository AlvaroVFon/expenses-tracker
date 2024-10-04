import { userService } from "../../services/users.service.js";
import { User } from "../../models/user.js";
import { users } from "../factories/users.factory.js";

async function seedUsers() {
  try {
    await clearUsers();

    const createUsers = users.map(async (user) => {
      await userService.create(user);
      console.log(`User ${user.name} created`);
    });

    await Promise.all(createUsers);
  } catch (error) {
    console.error(error);
  }
}

async function clearUsers() {
  try {
    await User.collection.drop();
    console.log("Users deleted");
  } catch (error) {
    console.error(error);
  }
}

export { seedUsers };
