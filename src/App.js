import "./App.css";
import { useState,useRef,useEffect } from "react";

function App() {
  const [toDos, setToDos] = useState([]);
  const [toDo, setToDo] = useState("");
  let [filter, setFilter] = useState("");
  const input = useRef();
  useEffect(()=>{
    if(input.current){
      input.current.focus()
    }
  },[])
  return (
    <div className="app">
      <div className="mainHeading">
        <h1>ToDo List</h1>
      </div>
      <div className="input">
        <input ref={input}
          value={toDo}
          onChange={(e) => setToDo(e.target.value)}
          type="text"
          placeholder="🖊️ Add item..."
        />
        <i
          onClick={() =>{
            setToDos([...toDos, { id: Date.now(), text: toDo, status: false }])
            setToDo("")
          }
          }
          className="fas fa-plus"
        ></i>
      </div>
      <div className="filters">
        <div onClick={() => setFilter("all")} className={`buttons ${filter === "all" ? "active" : ""}`}>
          All
        </div>
        <div onClick={() => setFilter("incomplete")} className={`buttons ${filter === "incomplete" ? "active" : ""}`}>
          Incomplete
        </div>
        <div onClick={() => setFilter("complete")} className={`buttons ${filter === "complete" ? "active" : ""}`}>
          Complete
        </div>
      </div>
      <div className="todos">
        {toDos.map((obj) => {
          if (obj.text === "") {
            return null;
          } else {
            if (filter === "" || filter === "all") {
            
          return (
            <div className="todo">
              <div className="left">
                <input
                  onChange={(e) => {
                    setToDos(
                      toDos.filter((obj2) => {
                        if (obj2.id === obj.id) {
                          obj2.status = e.target.checked;
                        }
                        return obj2;
                      })
                    );
                  }}
                  value={obj.status}
                  type="checkbox"
                  name=""
                  id=""
                />
                <p>{obj.status === true ? <s>{obj.text}</s> : obj.text}</p>
              </div>
              <div className="right">
                <i
                  onClick={() =>{
                   return setToDos(
                      toDos.filter((obj3) => obj3.id !== obj.id) 
                    );
                  }}
                  className="fas fa-times"
                ></i>
              </div>
            </div>
          );
                }else if (filter === "complete" || filter === 'incomplete'){
                  const con = filter ==='complete' ? true : false;
                  if(obj.status === con){
                    return(
                      <div className="todo">
                        <div className="left">
                          <input
                          onChange={(e)=>{
                            setToDos(
                              toDos.filter((obj2)=>{
                                if(obj2.id === obj.id){
                                  obj.status = e.target.checked;
                                }
                                return obj2;
                              })
                            )
                          }}
                          value={obj.status}
                          type="checkbox"
                          checked={obj.status}
                          name=""
                          id=""
                          />
                          <p>{obj.status === true ? <s>{obj.text}</s> : obj.text}</p>
                          </div>
                          <div className="right">
                          <i
                      onClick={() => {
                        return setToDos(
                          toDos.filter((obj3) => obj3.id !== obj.id)
                        );
                      }}
                      className="fas fa-times"
                    ></i>
                    </div>
                    </div>
                    );
                }
              }return null;
            }
        })}
      </div>
    </div>
  );
}

export default App;
