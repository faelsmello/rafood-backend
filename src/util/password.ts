import { hash, compare } from "bcrypt";

export class Password {
  public async createPasswordHashed(password: string): Promise<string> {
    const saltRounds = 10;
    return await hash(password, saltRounds);
  }

  public async validatePassword(
    password: string,
    passwordHashed: string
  ): Promise<boolean> {
    return compare(password, passwordHashed);
  }
}
