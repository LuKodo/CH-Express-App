import { useState } from "react";
import { IAuthService } from "../../application/IAuthService";
import { User } from "../../domain/entities/User";

export const useAuth = (authService: IAuthService) => {
  const [user, setUser] = useState<User | null>(authService.getCurrentUser());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      const user = await authService.login(email, password);
      setUser(user);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
  };

  return { user, loading, error, login, logout };
};
