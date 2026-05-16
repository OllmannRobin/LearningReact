import { useEffect, useState } from "react";
import type { usersType } from "../types/userstype";

const SelectUserById = () => {
  const [users, setUsers] = useState<usersType[]>([]);

  useEffect(() => {
    console.log("Appel API vers :", "https://jsonplaceholder.typicode.com/users");
    // L'URL doit être EXACTEMENT celle du test MSW
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Erreur:", error));
  }, []);

  return (
    <div>
      <select>
        <option value="">Choisir un utilisateur</option>
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectUserById;