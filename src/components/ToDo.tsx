import { useSetRecoilState } from "recoil";
import { Categories, ITodo, toDoState } from "../atoms";

function ToDo({ text, category, id }: ITodo) {
  const setToDos = useSetRecoilState(toDoState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    //console.log("i wanna go to ", name);
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      //const oldToDo = oldToDos[targetIndex];
      const newToDo = { text, id, category: name as any };
      //console.log(oldToDo, newToDo);
      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };
  const delTodo = (event: React.MouseEvent<HTMLButtonElement>) => {
    //const { currentTarget } = event;
    //console.log(currentTarget);
    setToDos((currentToDo) => {
      const targetIndex = currentToDo.findIndex((toDo) => toDo.id === id);
      return [
        ...currentToDo.slice(0, targetIndex),
        ...currentToDo.slice(targetIndex + 1),
      ];
    });
  };
  return (
    <li>
      <span>{text}</span>
      {category !== Categories.TO_DO && (
        <button name={Categories.TO_DO + ""} onClick={onClick}>
          To Do
        </button>
      )}
      {category !== Categories.DOING && (
        <button name={Categories.DOING + ""} onClick={onClick}>
          Doing
        </button>
      )}
      {category !== Categories.DONE && (
        <button name={Categories.DONE + ""} onClick={onClick}>
          Done
        </button>
      )}
      <button onClick={delTodo}>Delete</button>
    </li>
  );
}

export default ToDo;
