import {BaseRepository} from "./base.repository";

export class LikeRepository extends BaseRepository {
    constructor() {
        super('like');
    }

    async findByMeme(skip: number, take: number, memeId: number): Promise<any> {
        return await this.paginate(skip, take, {memeId})
    }
}