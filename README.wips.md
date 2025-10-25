## 1 init
npx create-react-app demo
create folder 
- apis
- assets
- components
- pages
- router
- store
- utils

npm start

## 2 install sass
```
npm i sass -D
```

## 3 install ant design
```
npm install antd --save
npm install @ant-design/icons@5.x --save
npm install normalize.css
```

## 4 install react-router-dom
```
npm install react-router-dom
```
{doc link : https://reactrouter.com/6.28.0/start/overview}

## 5 配置@别名路径
1 路径转换，修改webpack别名路径配置 craco
```
npm i @craco/craco -D
```
- 根目录下创建 craco.config.js
```
const path = require('path')

module.exports = {
    //webpack配置
    webpack: {
        //配置别名
        alias: {
            //约定：使用@标识src文件所在路径
            '@': path.resolve(__dirname, 'src')
        }
    }
}
```
- 修改package.json
```
  "scripts": {
    "start": "craco start",
    "build": "craco build",
    "test": "craco test",
    "eject": "react-scripts eject"
  },
```
2 联想提示， 修改vscode配置 jsconfig.json
-根目录下创建 jsconfig.json文件
```
{
    "compilerOptions": {
        "baseUrl": "./",
        "paths": {
            "@/*": ["src/*"]
        }
    }
}
```
## 6 安装axios
```
npm i axios
```

## 7 redux 管理token
```
npm i react-redux @reduxjs/toolkit
```

## 8 安装echarts
```
npm install echarts
```

## 9 安装附文本编辑器
```
npm i react-quill-new
```

## 10 打包+本地预览
```
<!-- 打包 -->
npm run build 
<!-- 预览 -->
npm i -g serve
serve -s ./build
浏览器访问 http://localhost:3000
```

## 11 包体积分析
```
npm i source-map-explorer
```
修改package.json
```
 "scripts": {
    "analyze": "source-map-explorer 'build/static/js/*.js'"
  },
```

## 12 cdn优化
