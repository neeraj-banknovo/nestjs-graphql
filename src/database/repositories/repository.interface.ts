import { FindOptionsOrder } from 'typeorm';

export interface findOneOptions<TEntity> {
  select?: (keyof TEntity)[];
  relations?: string[];
}

export interface findAllOptions<TEntity> extends findOneOptions<TEntity> {
  skip?: number;
  take?: number;
  order?: FindOptionsOrder<TEntity>;
}
