import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { SquarePen, Trash } from "lucide-react";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setshowFinished] = useState(false);

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      setTodos(todos);
    }
  }, []);

  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const handleAdd = () => {
    if (!todo.trim()) return;

    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);

    setTodo("");
    saveToLS();
  };

  const handleEdit = (id) => {
    let t = todos.filter((i) => i.id === id);
    setTodo(t[0].todo);
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLS();
  };

  const handleRemove = (id) => {
    setTodos(todos.filter((item) => item.id !== id));
    saveToLS();
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (id) => {
    let newTodos = todos.map((item) =>
      item.id === id ? { ...item, isCompleted: !item.isCompleted } : item,
    );

    setTodos(newTodos);
    saveToLS();
  };

  const toggleFinished = (e) => {
    setshowFinished(!showFinished);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl backdrop-blur-lg bg-white/20 border border-white/30 shadow-2xl rounded-3xl p-8">
        {/* Header */}
        <h1 className="text-4xl font-bold text-white text-center mb-8 tracking-wide">
          ✨ My Todo List
        </h1>

        {/* Add Todo Section */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <input
            onChange={handleChange}
            value={todo}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleAdd();
              }
            }}
            type="text"
            placeholder="Write your todos here?"
            className="flex-1 px-5 py-3 rounded-2xl bg-white/30 text-white placeholder-white/70 outline-none focus:ring-2 focus:ring-white transition"
          />
          <button
            onClick={handleAdd}
            className="cursor-pointer px-6 py-3 bg-white text-purple-600 font-semibold rounded-2xl hover:scale-105 hover:bg-purple-100 transition duration-200 shadow-md"
          >
            Add
          </button>
        </div>

        {/* Show Finished Toggle */}
        {todos.length > 0 && (
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-white text-xl font-semibold">Your Tasks</h2>
            <label className="flex items-center gap-2 text-white cursor-pointer">
              <input
                type="checkbox"
                checked={showFinished}
                onChange={() => setshowFinished(!showFinished)}
                className="w-4 h-4 accent-purple-600 cursor-pointer"
              />
              Show Completed
            </label>
          </div>
        )}

        {/* Todo List */}
        <div className="space-y-4">
          {todos.map((item) => {
            return (
              (showFinished || !item.isCompleted) && (
                <div
                  key={item.id}
                  className="group flex justify-between items-center bg-white/30 backdrop-blur-md p-4 rounded-2xl hover:bg-white/40 transition duration-200 shadow-md"
                >
                  <div className="flex items-center gap-4">
                    <input
                      checked={item.isCompleted}
                      onChange={() => handleCheckbox(item.id)}
                      type="checkbox"
                      className="w-5 h-5 accent-purple-600 cursor-pointer"
                    />
                    <span
                      className={`text-white text-lg ${
                        item.isCompleted ? "line-through opacity-60" : ""
                      }`}
                    >
                      {item.todo}
                    </span>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-4 opacity-70 group-hover:opacity-100 transition">
                    <button
                      onClick={() => handleEdit(item.id)}
                      className="text-white hover:text-yellow-300 transition cursor-pointer"
                    >
                      <SquarePen size={20} />
                    </button>

                    <button
                      onClick={() => handleRemove(item.id)}
                      className="text-white hover:text-red-400 transition cursor-pointer"
                    >
                      <Trash size={20} />
                    </button>
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
