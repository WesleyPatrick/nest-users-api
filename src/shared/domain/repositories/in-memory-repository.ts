import { Entity } from "../entities/entity";
import { NotFoundError } from "../errors/not-found-error";
import { RepositoryContract } from "./repository-contract";

export abstract class InMemoryRepository<E extends Entity> implements RepositoryContract<E> {

  items: E[] = [];

  async insert(entity: E): Promise<void> {
    this.items.push(entity);
  }

  async findAll(): Promise<E[]> {
    return this.items;
  }

  async findById(id: string): Promise<E> {
    const _id = `${id}`;  
    const item = this.items.find(item => item.id === _id) as E;
    if (!item) {
      throw new NotFoundError('Entity not found');
    }
    return item;

  }

  async update(entity: E): Promise<void> {
    const index = this.items.findIndex((item) => item.id === entity.id);
    if (index === -1) {
      throw new NotFoundError('Entity not found');
    }
    this.items[index] = entity;
  }

  async delete(id: string): Promise<void> {
    const index = this.items.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundError('Entity not found');
    }
    this.items.splice(index, 1);
  }
}