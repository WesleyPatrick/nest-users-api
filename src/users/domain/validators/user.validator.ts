import { IsDate, IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";
import { UserEntityProps } from "../entities/user.entity";
import { ClassValidatorFields } from "@/shared/domain/validator/class-validator-fields";

class UserRules {
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  name: string;

  @MaxLength(255)
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @MaxLength(100)
  @IsString()
  @IsNotEmpty()
  password: string;

  @IsDate()
  @IsOptional()
  createdAt: Date;

  constructor(data: UserEntityProps | null) {
    if (data) {
      Object.assign(this, data);
    }
  }
}

export class UserValidator extends ClassValidatorFields<UserEntityProps> {
  validate(data: UserEntityProps): boolean {
    const rules = new UserRules(data);
    const isValid = super.validate(rules);
    if (isValid) {
      this.validatedData = data;
    }
    return isValid;
  }
}

export class UserValidatorFactory {
  static create(): UserValidator {
    return new UserValidator();
  }
}