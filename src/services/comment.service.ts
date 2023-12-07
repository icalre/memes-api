import {CommentRepository} from "../repositories";
import {CommentModel} from "../models";

export class CommentService {
    private commentRepository: CommentRepository;

    constructor() {
        this.commentRepository = new CommentRepository();
    }

    async create(meme: CommentModel): Promise<CommentModel> {
        return await this.commentRepository.create(meme);
    }

    async findOne(id: number): Promise<CommentModel> {
        return await this.commentRepository.findOne(id);
    }

    async update(id: number, meme: CommentModel): Promise<CommentModel> {
        return await this.commentRepository.update(id, meme);
    }

    async delete(id: number): Promise<CommentModel> {
        return await this.commentRepository.delete(id);
    }

    async paginate(page: number, limit: number, memeId:number): Promise<any> {
        const skip = (page - 1) * limit;
        return await this.commentRepository.findByMeme(skip, limit, memeId);
    }

}