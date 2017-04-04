## Immutable

在传递数据时，可以直接使用 Immutable Data 来进一步提升组件的渲染性能。

JavaScript 中的对象一般是可变的（mutable），因为使用了引用赋值，新的对象简单地引用了原始对象，改变新的对象将影响到原始对象。比如：

```
foo = { a: 1 };
bar = foo;
bar.a = 2;
```

我们给 bar.a 赋值后，会发现此时 foo.a 也改成了 2。虽然这样做可以节约内存，但当应用复杂后，这就造成了非常大的隐患，可变性带来的优点变得得不偿失。为了解决这个问题，一般的做法是使用浅拷贝（shallowCopy）或深拷贝（deepCopy）来避免被修改，但这样做又造成了 CPU 和内存的浪费。

这时 Immutable 的出现很好地解决这些问题。

### Immutable Data

Immutable Data 就是一旦创建，就不能再更改的数据。对 Immutable 对象进行修改、添加或删除操作，都会返回一个新的 Immutable 对象。Immutable 实现的原理是持久化的数据结构 （persistent data structure），也就是使用旧数据创建新数据时，要保证旧数据同时可用且不变。同时为了避免深拷贝把所有节点都复制一遍带来的性能损耗，Immutable 使用了结构共享（structural sharing），即如果对象树中一个节点发生变化，只修改这个节点和受它影响的父节点，其他节点则进行共享。

Facebook 工程师 Lee Byron 花费三年时间打造 Immutable.js 库，与 React 同期出现，但没有被默认放到 React 工具集里（React 提供了简化的 Helper）。它内部实现了一套完整的持久化数据结构，还有很多易用的数据类型，比如 Collection、List、Map、Set、Record、Seq。有非常全面的 map、filter、groupBy、reduce、find 等函数式操作方法。同时，API 也尽量与 JavaScript 的 Object 或 Array 类似。

其中有 3 种最重要的数据结构说明一下。

1. Map：键值对集合，对应于 Object，ES6 也有专门的 Map 对象。

2. List：有序可重复的列表，对应于 Array。

3. ArraySet：无序且不可重复的列表。

### Immutable 的优点

Immutable 的优点有如下几点。

降低了“可变”带来的复杂度。可变数据耦合了 time 和 value 的概念，造成了数据很难被回溯。比如：
```
function touchAndLog(touchFn) {
  let data = { key: 'value' };
  touchFn(data);
  console.log(data.key);
}
```
在不查看 touchFn 的代码的情况下，因为不确定方法对 data 做了什么，我们是不可能知道结果是什么。但如果 data 是不可变的呢，你会很肯定地知道打印的结果是 value。

节省内存。Immutable 使用结构共享尽量复用内存。没有被引用的对象会被垃圾回收：
```
import { Map } from 'immutable';
　
let a = Map({
  select: 'users',
  filter: Map({ name: 'Cam' }),
});
let b = a.set('select', 'people');
　
a === b; // => false
　
a.get('filter') === b.get('filter'); // => true
```
上面 a 和 b 共享了没有变化的 filter 节点。

撤销/重做，复制/粘贴，甚至时间旅行这些功能做起来都是小菜一碟。因为每次数据都是不一样的，那么只要把这些数据放到一个数组里存储起来，想回退到哪里，就拿出对应的数据，这很容易开发出撤销及重做这两种功能。

并发安全。传统的并发非常难做，因为要处理各种数据不一致的问题，所以“聪明人”发明了各种锁来解决。但使用了 Immutable 之后，数据天生是不可变的，并发锁就不再需要了。然而现在并没有用，因为 JavaScript 还是单线程运行的。

拥抱函数式编程。Immutable 本身就是函数式编程中的概念。只要输入一致，输出必然一致，这样开发的组件更易于调试和组装。

像 ClojureScript、Elm 等函数式编程语言中的数据类型天生都是不可变的，这也是基于 ClojureScript 的 React 框架 Om 性能比 React 好的原因。

### 使用 Immutable 的缺点

容易与原生对象混淆是使用 Immutable 的过程中遇到的最大的问题。

虽然 Immutable 尽量把 API 设计的原生对象类似，但还是很难区分到底是 Immutable 对象还是原生对象。

Immutable 中的 Map 和 List 虽然对应的是 JavaScript 的 Object 和 Array，但操作完全不同，比如取值时要用 map.get('key') 而不是 map.key，要用 array.get(0) 而不是 array[0]。另外，Immutable 每次修改都会返回新对象，很容易忘记赋值。

当使用第三方库的时候，一般需要使用原生对象，同样容易忘记转换对象。下面给出一些办法来避免类似问题的发生：

使用 FlowType 或 TypeScript 静态类型检查工具；

约定变量命名规则，如所有 Immutable 类型对象以 $$ 开头；

使用 Immutable.fromJS 而不是 Immutable.Map 或 Immutable.List 来创建对象，这样可以避免 Immutable 对象和原生对象间的混用。
