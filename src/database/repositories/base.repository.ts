/* eslint-disable prettier/prettier */
import { DeepPartial, FindManyOptions, FindOneOptions, FindOptionsOrder, Repository, UpdateResult } from 'typeorm';

interface findOneOptions<T> {
    select?: (keyof T)[];
    relations?: string[];
}

interface findAllOptions<T> extends findOneOptions<T> {
    skip?: number;
    take?: number;
    order?: FindOptionsOrder<T>;
}

const defaultScope: FindOneOptions = {
    withDeleted: true,
};


/* This is a base repository where you need to add the methods which are common in all the repositories */

export abstract class BaseRepository<T> {
    private readonly _repository: Repository<T> = null;
    constructor(childRepository: Repository<T>) {
        this._repository = childRepository;
    }

    async getById(id: string, findOptions: findOneOptions<T> = {}): Promise<T> {
        const { select = [], relations = [] } = findOptions;
        const options: FindOneOptions = {
            ...defaultScope,
            where: { id },
            ...(select.length && { select }),
            ...(relations.length && { relations }),
        };
        return this._repository.findOne(options);
    }
    
    async getByUserId(userId: string, findOptions: findAllOptions<T> = {}): Promise<T[]> {
        const { select = [], relations = [], skip = null, take = null } = findOptions;
        const options: FindManyOptions = {
            ...defaultScope,
            where: { userId },
            ...(select.length && { select }),
            ...(relations.length && { relations }),
            ...(skip && {skip}),
            ...(take && {take}),
        };
        return this._repository.find(options);
    }

    async getAll(findOptions: findAllOptions<T> = {}): Promise<T[]> {
        const { select = [], relations = [], skip = null, take = null } = findOptions;
        const options: FindManyOptions = {
            ...defaultScope,
            ...(select.length && { select }),
            ...(relations.length && { relations }),
            ...(skip && {skip}),
            ...(take && {take}),
        };
        return this._repository.find(options);
    }
    
    async getActiveCount(): Promise<number> {
        const options: FindManyOptions = {
            ...defaultScope,
        }
        return this._repository.count(options);
    }

    async save(data: DeepPartial<T>): Promise<T> {
        return this._repository.save(data);
    }
    
    async delete(id: string): Promise<UpdateResult> {
        return this._repository.softDelete(id);
    }
    
    async update(id: string, data: DeepPartial<T>): Promise<UpdateResult> {
        return this._repository.update(id, data as any);
    }
}
