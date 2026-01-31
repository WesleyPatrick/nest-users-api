import { Entity } from "@/shared/domain/entities/entity";
export type UserEntityProps = {
  name: string;
  email: string;
  password: string;
  createdAt?: Date;
};

export class UserEntity extends Entity<UserEntityProps> {
  constructor(public readonly props: UserEntityProps, id?: string) {
    super(props, id);
    this.props.createdAt = this.props.createdAt ?? new Date();
  }

  update(value: string): void {
    this.name = value;
  }

  updatePassword(value: string): void {
    this.password = value;
  }

  get name() {
    return this.props.name;
  }

  get email() {
    return this.props.email;
  }

  get password() {
    return this.props.password;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  private set name(value: string) {
    this.props.name = value;
  }

  private set password(value: string) {
    this.props.password = value;
  }
}
