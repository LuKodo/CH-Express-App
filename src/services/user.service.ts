export interface User {
  usuario: string;
  contrasena: string;
  vehiculos_asignados: number[];
}

export const getUsers = async (): Promise<User[]> => {
  const response = await fetch("users.json");

  const data = await response.json();
  return data;
};

export const loggedIn = (): boolean => {
  const user = localStorage.getItem("user");

  if (user) {
    return true;
  }

  return false;
}