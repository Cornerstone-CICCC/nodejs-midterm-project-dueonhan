import { User } from "../types/user";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

class UserModel {
  private users: User[] = [];
  private nextId = 1;

  async create(newUser: Omit<User, "id">) {
    const {
      userid,
      password,
      firstname,
      middlename,
      lastname,
      dateofbirth,
      email,
      phoneNumber,
    } = newUser;

    const foundIndex = this.users.findIndex(
      (u) => u.userid.toLocaleLowerCase() === userid.toLowerCase()
    );
    if (foundIndex !== -1) return false;

    const hashPassword = await bcrypt.hash(password, 12);

    this.users.push({
      id: this.nextId++,
      userid,
      password: hashPassword,
      firstname,
      middlename,
      lastname,
      dateofbirth,
      email,
      phoneNumber,
    });

    return true;
  }

  async login(details: { userid: string; password: string }) {
    const { userid, password } = details;
    const found = this.users.find((u) => u.userid === userid);
    if (!found) return false;

    const isMatch = await bcrypt.compare(password, found.password);
    if (!isMatch) return false;

    return found;
  }

  findByUsername(userid: string) {
    const user = this.users.find((u) => u.userid === userid);
    if (!user) return false;
    return user;
  }
}

export default new UserModel();
