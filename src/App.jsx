import react, { useState } from "react";

const App = () => {
  const [input, setInput] = useState('');
  const [todos, setTodos] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [editItem, setEditItem] = useState(null);


  const added = () => {
    if (!input) {
      alert('please type something')
    }
    else if (input && isEdit) {
      setTodos(prev => {
        return prev.map(item => {
          if (item.ide === editItem) {
            return {
              ...item,
              name: input
            }
          }
          return item;
        })
      })
      setIsEdit(false);
      setEditItem(null);
      setInput('');
    }
    else {
      const newTodo = { ide: new Date().getTime().toString(), name: input };
      setTodos([...todos, newTodo]);
      setInput('');
    }
  }

        const dele = (id) => {
       const newTodos = todos.filter((todo) => {
      return id !== todo.ide
    })
    setTodos(newTodos);
  }

  const edit = (id) => {
    const newTodos = todos.find((todo) => {
      return id === todo.ide
              ;
    });
    setInput(newTodos.name);
    setIsEdit(true);
    setEditItem(id);
  }




  return (
    <>
      <div className="Main-div">
        <div className="inner-div">
          <div className="header"> <h1>SaAd ToDo List</h1></div>
          <div className="flex-inp">
            <div className="input-div"><input type="text" placeholder="Enter Item Name" value={input} onChange={(e) => { setInput(e.target.value) }} /></div>
            {isEdit ? <button className="btn" title="Update Item" onClick={() => { added() }}>🖋</button> : <button className="btn" onClick={() => { added() }}>➕</button>}
          </div>
          {todos.map((todo) => {
            return (
              <div className="list-div" key={todo.ide}>
                <button title="Edit item" onClick={() => edit(todo.ide)}>🖋</button>
                <button onClick={() => { dele(todo.ide) }} title="Delete Item">❌</button><p>{todo.name}</p>
              </div>
            )
          })}

          <div className="delete-but">
            <button onClick={() => { setTodos([]) }}>Delete All</button>
          </div>
        </div>
      </div>

    </>
  )
}
export default App;