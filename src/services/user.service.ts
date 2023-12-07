import {UserRepository} from "../repositories";
import {UserModel} from "../models";

export class UserService {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    async create(user: UserModel): Promise<UserModel> {
        const existUser = await this.userRepository.findByEmail(user.email || '');
        if (existUser) {
            throw new Error('User already exists');
        }

        return await this.userRepository.create(user);
    }

    async findOne(id: number): Promise<UserModel> {
        return await this.userRepository.findOne(id);
    }

    async findByEmail(email: string): Promise<UserModel> {
        return await this.userRepository.findByEmail(email);
    }

    async update(id: number, user: UserModel): Promise<UserModel> {
        return await this.userRepository.update(id, user);
    }

    async findByToken(token: string): Promise<UserModel> {
        return await this.userRepository.findByToken(token);
    }
}