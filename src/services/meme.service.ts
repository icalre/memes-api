import {MemeRepository} from "../repositories";
import {MemeModel} from "../models";

export class MemeService {
    private memeRepository: MemeRepository;

    constructor() {
        this.memeRepository = new MemeRepository();
    }

    async create(meme: MemeModel): Promise<MemeModel> {
        return await this.memeRepository.create(meme);
    }

    async findOne(id: number): Promise<MemeModel> {
        return await this.memeRepository.findOne(id);
    }

    async update(id: number, meme: MemeModel): Promise<MemeModel> {
        return await this.memeRepository.update(id, meme);
    }

    async delete(id: number): Promise<MemeModel> {
        return await this.memeRepository.delete(id);
    }

    async paginate(page: number, limit: number, where?:any): Promise<any> {
        const skip = (page - 1) * limit;
        return await this.memeRepository.paginate(skip, limit, where);
    }

    async updateCommentsLike(id: number, like: number, comment: number): Promise<void> {

        const meme = await this.memeRepository.findOne(id);
        meme.numberOfLikes = meme.numberOfLikes + like;
        meme.numberOfComments = meme.numberOfComments + comment;

        await this.memeRepository.update(id, meme);
    }

}