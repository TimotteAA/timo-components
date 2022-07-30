import typescript from "rollup-plugin-typescript2";
import {nodeResolve} from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import sass from 'rollup-plugin-sass';
import excludeDependenciesFromBundle from "rollup-plugin-exclude-dependencies-from-bundle";

// 覆盖tsconfig.json的部分配置
const overrides = {
    "compilerOptions": {
        "outDir": "dist",
        "module": "esnext",
        "target": "es5",
        "declaration": true,
        "jsx": "react",
        "moduleResolution": "Node",
        "allowSyntheticDefaultImports": true
    },
    "include": ["src"],
    "exclude": [
        "src/**/*.test.tsx",
        "src/**/*.stories.tsx",
        "src/setupTests.ts"
    ]
}

export default {
    input: "./src/index.tsx",
    output: [{
        file: "dist/bundle.es.js",
        format: "es"
    }],
    plugins: [
        nodeResolve(),
        commonjs(),
        json(),
        excludeDependenciesFromBundle(),
        typescript({ tsconfigOverride: overrides }),
        sass({output: "dist/index.css"})
    ]
}
