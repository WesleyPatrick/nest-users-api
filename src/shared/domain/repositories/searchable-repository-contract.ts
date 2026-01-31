import { Entity } from "../entities/entity";
import { RepositoryContract } from "./repository-contract";

export interface SearchableRepositoryContract<
E extends Entity,
SearchInput,
SearchOutput,
> extends RepositoryContract<E> {
  search(input: SearchInput): Promise<SearchOutput>;
} 