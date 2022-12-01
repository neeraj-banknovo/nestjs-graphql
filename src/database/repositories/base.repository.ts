/* eslint-disable prettier/prettier */
import { DeepPartial, FindManyOptions, FindOneOptions, Repository, UpdateResult } from 'typeorm';
import { findOneOptions, findAllOptions } from '../../common/interfaces/repository.interface';

export const defaultScope: FindOneOptions = {
    withDeleted: false,
};


/* This is a base repository where you need to add the methods which are common in all the repositories */

export abstract class BaseRepository<TEntity> {
    private readonly _repository: Repository<TEntity> = null;
    constructor(childRepository: Repository<TEntity>) {
        this._repository = childRepository;
    }

    async getById(id: string, findOptions: findOneOptions<TEntity> = {}): Promise<TEntity> {
        const { select = [], relations = [] } = findOptions;
        const options: FindOneOptions = {
            where: { id },
            ...(select.length && { select }),
            ...(relations.length && { relations }),
            ...defaultScope,
        };
        return this._repository.findOne(options);
    }

    async getAll(findOptions: findAllOptions<TEntity> = {}): Promise<TEntity[]> {
        const { select = [], relations = [], skip = null, take = null } = findOptions;
        const options: FindManyOptions = {
            ...(select.length && { select }),
            ...(relations.length && { relations }),
            ...(skip && {skip}),
            ...(take && {take}),
            ...defaultScope,
        };
        return this._repository.find(options);
    }
    
    async getActiveCount(): Promise<number> {
        const options: FindManyOptions = {
            ...defaultScope,
        }
        return this._repository.count(options);
    }

    async save(data: DeepPartial<TEntity>): Promise<TEntity> {
        return this._repository.save(data);
    }
    
    async delete(id: string): Promise<UpdateResult> {
        return this._repository.softDelete(id);
    }
    
    async update(id: string, data: DeepPartial<TEntity>): Promise<UpdateResult> {
        return this._repository.update(id, data as any);
    }
}
