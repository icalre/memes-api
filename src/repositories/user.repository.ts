import {BaseRepository} from "./base.repository";
import {UserModel} from "../models";

export class UserRepository extends BaseRepository {
    constructor() {
        super('user');
    }

    async findByEmail(email: string): Promise<UserModel> {
        return await this.prismaClient.user.findFirst({
            where: {
                email
            }
        });
    }

    async findByToken(token: string): Promise<UserModel> {
        return await this.prismaClient.user.findFirst({
            where: {
                token
            }
        });
    }
}