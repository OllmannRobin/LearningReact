import axios from "axios";
/*import de mon interface*/
import type { TodoType } from "../types/todotype";

interface AxiosButtonProps {
  label?: string;
  onGetTodos: (data: TodoType[]) => void;
}

function AxiosButton({ label = "Appel axios", onGetTodos }: AxiosButtonProps) {
  async function callAxios() {
    try {
      const reponse = await axios.get(
        "https://jsonplaceholder.typicode.com/todos",
      );

      const todoAxios = reponse.data;

      onGetTodos(todoAxios);
    } catch {
      console.warn("erreur");
    }
  }

  return (
    // c'est un fragment
    <>
      <button onClick={callAxios}>{label}</button>
    </>
  );
}

export default AxiosButton;
