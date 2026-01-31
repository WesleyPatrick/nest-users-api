import { type UserEntityProps } from "../../entities/user.entity";
import { faker } from "@faker-js/faker";

type props = {
  name?: string;
  email?: string;
  password?: string;
  createdAt?: Date;
};

export function userDataBuilder(props: props): UserEntityProps {
  return {
    name: props.name ?? faker.person.fullName(),
    email: props.email ?? faker.internet.email(),
    password: props.password ?? faker.internet.password(),
    createdAt: props.createdAt ?? new Date(),
  };
}