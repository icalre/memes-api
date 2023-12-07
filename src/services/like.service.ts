import {LikeRepository} from "../repositories";
import {LikeModel} from "../models";

export class LikeService {
    private likeRepository: LikeRepository;

    constructor() {
        this.likeRepository = new LikeRepository();
    }

    async create(meme: LikeModel): Promise<LikeModel> {
        return await this.likeRepository.create(meme);
    }

    async findOne(id: number): Promise<LikeModel> {
        return await this.likeRepository.findOne(id);
    }

    async update(id: number, meme: LikeModel): Promise<LikeModel> {
        return await this.likeRepository.update(id, meme);
    }

    async delete(id: number): Promise<LikeModel> {
        return await this.likeRepository.delete(id);
    }

    async paginate(page: number, limit: number, memeId:number): Promise<any> {
        const skip = (page - 1) * limit;
        return await this.likeRepository.findByMeme(skip, limit, memeId);
    }

}