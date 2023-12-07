import {PrismaClient} from "@prisma/client";

export class BaseRepository {

    protected prismaClient: any;
    protected table: string;

    constructor(table: string) {
        this.prismaClient = new PrismaClient();
        this.table = table;
    }

    async create(data: any) {
        return await this.prismaClient[this.table].create({
            data: data
        });
    }

    async findAll() {
        return await this.prismaClient[this.table].findMany();
    }

    async findOne(id: number) {
        return await this.prismaClient[this.table].findFirst({
            where: {
                id
            }
        });
    }

    async update(id: number, data: any) {
        return await this.prismaClient[this.table].update({
            where: {
                id: id
            },
            data: data
        });
    }

    async delete(id: number) {
        return await this.prismaClient[this.table].delete({
            where: {
                id: id
            }
        });
    }

    async paginate(skip: number, take: number, where?: any, include?: any) {
        console.log('xxx',where);
        const data = await this.prismaClient[this.table].findMany({
            skip,
            take,
            where,
            include
        });

        const total = await this.prismaClient[this.table].count();
        const totalPages = Math.ceil(total / take);
        const page = skip + 1;
        const pageSize = take;
        const count: number = data.length;
        const nextPage = page < totalPages ? page + 1 : null;
        const prevPage = page > 1 ? page - 1 : null;

        return {data, total, totalPages, page, pageSize, count, nextPage, prevPage};
    }
}