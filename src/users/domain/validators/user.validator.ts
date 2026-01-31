import { IsDate, IsEmail, IsNotEmpty, IsOptional, IsString, Length, MinLength } from "class-validator";
import { UserEntityProps } from "../entities/user.entity";
import { ClassValidatorFields } from "@/shared/domain/validator/class-validator-fields";

class UserRules {
  @IsString()
  @IsNotEmpty()
  @Length(3, 255)
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @IsDate()
  @IsOptional()
  createdAt: Date;

  constructor({name, email, password, createdAt}: UserEntityProps) {
    Object.assign(this, { name, email, password, createdAt });
  }
}

export class UserValidator extends ClassValidatorFields<UserRules> {
  validate(data: UserEntityProps): boolean {
    return super.validate(new UserRules(data));
  }
}

export class UserValidatorFactory {
  static create(): UserValidator {
    return new UserValidator();
  }
}