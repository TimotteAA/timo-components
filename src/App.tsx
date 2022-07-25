import Input from "./components/Input";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import Simple from "./test-components/Simple"
import Skeleton  from "./components/Skeleton";

library.add(fas);


function App() {
  return (
    <div className="App">
      {/*<hr />*/}
      {/*<Input prefix={"123124"} suffix="1231231" />*/}
      {/*<Input*/}
      {/*  prefix={"123124"}*/}
      {/*  suffix="1231231"*/}
      {/*  size="large"*/}
      {/*  placeholder="请输入内容....."*/}
      {/*/>*/}
        <Simple />
    </div>
  );
}

export default App;
