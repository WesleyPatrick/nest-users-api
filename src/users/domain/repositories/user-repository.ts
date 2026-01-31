import { RepositoryContract } from "@/shared/domain/repositories/repository-contract";
import { UserEntity } from "../entities/user.entity";
import type { SearchableRepositoryContract } from "@/shared/domain/repositories/searchable-repository-contract";

export interface UserRepository extends SearchableRepositoryContract<UserEntity, any, any> {
  findByEmail(email: string): Promise<UserEntity>;
  existsByEmail(email: string): Promise<void>;
}