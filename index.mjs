import Myreact, { useState, useEffect } from "./react.mjs";

function ExampleComponent() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  useEffect(() => {
    console.log("effect", count);
    return () => {
      console.log("cleanup", count);
    };
  }, [count]);
  useEffect(() => {
    console.log("effect", text);
    return () => {
      console.log("cleanup", text);
    };
  }, [text]);
  return {
    click: () => setCount(count + 1),
    type: (text) => setText(text),
    noop: () => setCount(count),
    render: () => console.log("render ->", { count, text }),
  };
}

let App = Myreact.render(ExampleComponent);
App.click();
App = Myreact.render(ExampleComponent);
App.type("bar");
App = Myreact.render(ExampleComponent);

export default Myreact;
