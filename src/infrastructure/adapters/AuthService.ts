import { IAuthService } from "../../application/IAuthService";
import { User } from "../../domain/entities/User";

export class AuthService implements IAuthService {
  async login(email: string, password: string): Promise<User> {
    try {
      const base64Credentials = btoa(`${email}:${password}`);

      const response = await fetch(
        "https://wmpenata-chexpressdb-tms-13720529.dev.odoo.com/api/v2/user",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${base64Credentials}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Credenciales inválidas");
      }

      const user = await response.json();
      localStorage.setItem("user", JSON.stringify(user));
      return user;
    } catch (error) {
      throw new Error("Error en el inicio de sesión");
    }
  }

  async logout(): Promise<void> {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  }

  getCurrentUser(): User | null {
    const userStr = localStorage.getItem("user");
    return userStr ? JSON.parse(userStr) : null;
  }
}
