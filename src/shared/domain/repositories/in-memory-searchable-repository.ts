import { Entity } from "../entities/entity";
import { InMemoryRepository } from "./in-memory-repository";
import type { SearchableRepositoryContract } from "./searchable-repository-contract";

export abstract class InMemorySearchableRepository<E extends Entity> 
extends InMemoryRepository<E> implements SearchableRepositoryContract<E, any, any> {

  items: E[] = [];

  async search(input: any): Promise<any> {
    return this.items;
  }
}