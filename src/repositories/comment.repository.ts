import {BaseRepository} from "./base.repository";

export class CommentRepository extends BaseRepository {
    constructor() {
        super('comment');
    }

    async findByMeme(skip: number, take: number, memeId: number): Promise<any> {
        return await this.paginate(skip, take, {memeId}, {user: {select: {name: true}}})
    }
}