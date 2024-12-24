import { Model } from "sequelize-typescript";
export declare class User extends Model<User> {
    firstName: string;
    lastName: string;
    isActive: boolean;
}
