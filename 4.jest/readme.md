## 测试框架Jest

### 快速开始
#### 安装jest
```
npm install --save-dev jest
```

我们先写一个测试函数，有两个数字参数做加法，首先，创建`sum.js`文件
```
function sum(a, b) {
  return a + b
}
module.exports = sum
```

然后，创建创建`sum.test.js`,包含我们目前的测试代码。
```
const sum = require('./sum');

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
```

然后添加片段到package.json中
```
{
  "scripts": {
    "test": "jest"
  }
}
```
最后运行`npm test`,jest输入如下内容

```
PASS  ./sum.test.js
✓ adds 1 + 2 to equal 3 (5ms)
```

你刚刚成功的编写了一个jest测试！

这个测试用例使用了`expect`和`toBe`进行两个值相同的测试。想要学习更多的关于jest测试，请参考 [Using Matchers][1]


#### 从命令行运行
你也可以直接从命令行执行，可以输入一些有空的参数（npm install jest -g）。

Here's how to run Jest on files matching my-test, using config.json as a configuration file and display a native OS notification after the run:
```
jest my-test --notify --config=config.json
```

如果你想学习更多的命令行执行，请参考 [Jest CLI Options][2] 


#### 附加配置
** 使用 Babel:** 
安装`babel-jest` 和 `regenerator-runtime` 包:
```
npm install --save-dev babel-jest regenerator-runtime
```
*注意: 如果你使用npm 3或者npm 4，你不用指明安装`regenerator-runtime`。*

添加一份`.babelrc`文件到你的工程根目录，比如，如果你使用es6或者react.js需要使用`babel-preset-es2015`和`babel-preset-react`预设：
```
{
  "presets": ["es2015", "react"]
}
```
这样你会使用es6与react所有指定的语法。

*注意: 如果你使用更多的babel编译配置，请使用`babel's env option`,记住jest将会自动定义node_env作为测试。*

**使用webpack**

jest可以实用在工程内使用webpack管理你的资产,样式和编辑。webpack 提供一些特别的功能相比于其他工具。更多资料请参考 [webpack guide][3]


  [1]: http://facebook.github.io/jest/docs/using-matchers.html
  [2]: https://facebook.github.io/jest/docs/cli.html
  [3]: http://facebook.github.io/jest/docs/webpack.html