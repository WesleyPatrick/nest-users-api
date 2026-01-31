import { RepositoryContract } from "@/shared/domain/repositories/repository-contract";
import { UserEntity } from "../entities/user.entity";

export interface UserRepository extends RepositoryContract<UserEntity> {
  findByEmail(email: string): Promise<UserEntity>;
  existsByEmail(email: string): Promise<void>;
}