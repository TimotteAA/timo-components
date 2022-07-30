import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import "./index.scss";

library.add(fas);

// 组件库的入口文件
export {default as Button} from "./components/Button";
export {default as Alert} from "./components/Alert";
export {default as AutoComplete} from "./components/AutoComplete";
export {default as Input} from "./components/Input";
export {default as Skeleton} from "./components/Skeleton";
export {default as Form} from "./components/Form";
export {default as Menu} from "./components/Menu";
export {default as Icon} from "./components/Icon";
export {default as Upload} from "./components/Upload";
export {default as Tabs} from "./components/Tabs";
