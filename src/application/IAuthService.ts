import { User } from "../domain/entities/User";

export interface IAuthService {
  login(email: string, password: string): Promise<User>;
  logout(): Promise<void>;
  getCurrentUser(): User | null;
}
