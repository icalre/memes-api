import {BaseRepository} from "./base.repository";
import {MemeModel} from "../models";

export class MemeRepository extends BaseRepository {
    constructor() {
        super('meme');
    }

    async findByUser(userId: number): Promise<MemeModel> {
        return await this.prismaClient.meme.paginate({
            where: {
                userId
            }
        });
    }

    async findByTitle(search: string): Promise<MemeModel> {
        return await this.prismaClient.meme.paginate({
            where: {
                body: {
                    search
                }
            }
        });
    }

    override async delete(id: number): Promise<MemeModel> {

        await this.prismaClient.like.deleteMany({
            where: {
                memeId: id
            }
        });

        await this.prismaClient.comment.deleteMany({
            where: {
                memeId: id
            }
        });

        return await this.prismaClient.meme.delete({
            where: {
                id
            }
        });
    }
}