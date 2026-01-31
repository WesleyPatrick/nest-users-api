import { ConflitError } from "@/shared/domain/errors/conflit-error";
import { NotFoundError } from "@/shared/domain/errors/not-found-error";
import { InMemoryRepository } from "@/shared/domain/repositories/in-memory-repository";
import { UserEntity } from "@/users/domain/entities/user.entity";
import type { UserRepository } from "@/users/domain/repositories/user-repository";

export class UserInMemoryRepository extends InMemoryRepository<UserEntity> implements UserRepository {
  async findByEmail(email: string): Promise<UserEntity> {
    const user = this.items.find(item => item.email === email);
    if (!user) {
      throw new NotFoundError('User not found');
    }
    return user;
  }

  async existsByEmail(email: string): Promise<void> {
    const user = this.items.find(item => item.email === email);
    if (user) {
      throw new ConflitError('User already exists');
    }
  }
}