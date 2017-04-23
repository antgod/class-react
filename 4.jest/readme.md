## 测试框架Jest

### 1. 快速开始
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

### 2. 使用匹配

#### 普通匹配

jest使用`matchers`让你通过不同的方法测试值。你需要熟记很多不同的`matchers`。这里只介绍最常用的`matchers`。

最简单的测试值相等的是精确相等：
```
test('two plus two is four', () => {
  expect(2 + 2).toBe(4);
});
```

上段代码，`expect(2 + 2)`返回一个“期待”对象。除了调用`matchers`，关于期待对象你不需要做太多。在这段代码中，`.toBe(4)`是一个matcher。当jest运行时，将追踪所有失败的`matchers`，所以它可以精确的打印错误信息。

`toBe`使用`===`精确等于测试。如果你想深度测试对象相等，使用`toEqual`代替。
```
test('object assignment', () => {
  const data = {one: 1};
  data['two'] = 2;
  expect(data).toEqual({one: 1, two: 2});
});
```
`toEqual` 递归的查找每个字段对比是否相等。

你可以使用`not`去测试`matcher`的反面：
```
test('adding positive numbers is not zero', () => {
  for (let a = 1; a < 10; a++) {
    for (let b = 1; b < 10; b++) {
      expect(a + b).not.toBe(0);
    }
  }
});
```

#### 类型判断

有时候你需要判断undefined,null与false，但有时候你不需要明确的区分他们。jest包含工具明确的区分他们。

- toBeNull matches only null
- toBeUndefined matches only undefined
- toBeDefined is the opposite of toBeUndefined
- toBeTruthy matches anything that an if statement treats as true
- toBeFalsy matches anything that an if statement treats as false

举个例子：
```
test('null', () => {
  const n = null;
  expect(n).toBeNull();
  expect(n).toBeDefined();
  expect(n).not.toBeUndefined();
  expect(n).not.toBeTruthy();
  expect(n).toBeFalsy();
});

test('zero', () => {
  const z = 0;
  expect(z).not.toBeNull();
  expect(z).toBeDefined();
  expect(z).not.toBeUndefined();
  expect(z).not.toBeTruthy();
  expect(z).toBeFalsy();
});
```

你可以使用这些`matcher`做精确的匹配。

#### 数字
多种途径比较数字
```
test('two plus two', () => {
  const value = 2 + 2;
  expect(value).toBeGreaterThan(3);
  expect(value).toBeGreaterThanOrEqual(3.5);
  expect(value).toBeLessThan(5);
  expect(value).toBeLessThanOrEqual(4.5);

  // toBe and toEqual are equivalent for numbers
  expect(value).toBe(4);
  expect(value).toEqual(4);
});
```

你可以使用`toBeCloseTo`进行浮点比较
```
test('adding floating point numbers', () => {
  const value = 0.1 + 0.2;
  expect(value).not.toBe(0.3);    // 浮点数不会直接相等
  expect(value).toBeCloseTo(0.3); // 使用closeTo方法进行浮点数字比较
});
```

#### 字符串
你可以使用`toMatch`测试正则表达式来验证string字符串
```
test('there is no I in team', () => {
  expect('team').not.toMatch(/I/);
});

test('but there is a "stop" in Christoph', () => {
  expect('Christoph').toMatch(/stop/);
});
```
#### 数组
你可以检验数组是否包含某一个特别项
```
const shoppingList = [
  'diapers',
  'kleenex',
  'trash bags',
  'paper towels',
  'beer',
];

test('the shopping list has beer on it', () => {
  expect(shoppingList).toContain('beer');
});
```
#### 表达式
你可以使用`toThrow`来检验函数是否抛出异常
```
function compileAndroidCode() {
  throw new ConfigError('you are using the wrong JDK');
}

test('compiling android goes as expected', () => {
  expect(compileAndroidCode).toThrow();
  expect(compileAndroidCode).toThrow(ConfigError);

  // You can also use the exact error message or a regexp
  expect(compileAndroidCode).toThrow('you are using the wrong JDK');
  expect(compileAndroidCode).toThrow(/JDK/);
});
```
#### 更多
这是一个just尝试，查看完整的`matchers`列表[renerence docs][4]。

一旦你掌握了一个可用的`matcher`,建议下一步学习jest如何检验[异步代码][5]

  [1]: http://facebook.github.io/jest/docs/using-matchers.html
  [2]: https://facebook.github.io/jest/docs/cli.html
  [3]: http://facebook.github.io/jest/docs/webpack.html
  [4]: http://facebook.github.io/jest/docs/expect.html
  [5]: http://facebook.github.io/jest/docs/asynchronous.html