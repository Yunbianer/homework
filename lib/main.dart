// 导入 Flutter 官方的 Material Design 组件库。
// 有了它，才能使用 Text、Scaffold、AppBar、按钮等现成的界面组件。
import 'package:flutter/material.dart';

// 应用程序的入口函数。整个 Dart/Flutter 程序从这里开始执行。
void main() {
  // runApp 是 Flutter 的启动函数：把给定的根组件（这里是 MyApp）
  // 挂载到屏幕上，应用界面由此开始渲染。没有它，界面不会显示。
  runApp(const MyApp());
}

// MyApp 是应用的根组件（根 Widget）。
// 它继承 StatelessWidget，表示这是一个“无状态组件”——自身不保存会变化的数据。
class MyApp extends StatelessWidget {
  // 构造函数。const 表示这是一个常量构造，可提升性能；
  // super.key 把组件的唯一标识 key 传给父类。
  const MyApp({super.key});

  // 重写 build 方法：描述这个组件“长什么样”，返回一个 Widget 树。
  // 每次界面需要渲染时，框架都会调用 build。
  @override
  Widget build(BuildContext context) {
    // MaterialApp 是整个应用的“外壳”，负责配置主题、标题、首页等全局信息。
    return MaterialApp(
      title: 'Flutter Demo', // 应用的标题（在任务切换等地方显示）
      theme: ThemeData(
        // 配置应用主题。用 seedColor（种子色）生成一整套配色方案，
        // 这里用深紫色 deepPurple，所以界面主色调是紫色。
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
        useMaterial3: true, // 启用 Material 3（新一代设计语言）风格
      ),
      // home 指定应用启动后显示的第一个页面，即首页 MyHomePage。
      home: const MyHomePage(title: 'Flutter Demo Home Page'),
    );
  }
}

// MyHomePage 是首页组件。
// 它继承 StatefulWidget，表示这是一个“有状态组件”——
// 它有一个 State 对象，用来保存会变化的数据（比如计数器的值）。
class MyHomePage extends StatefulWidget {
  // 构造函数。required this.title 表示创建时必须传入标题文本。
  const MyHomePage({super.key, required this.title});

  // 保存页面标题。Widget 子类里的字段习惯用 final（不可变）。
  final String title;

  // 重写 createState：为这个有状态组件创建对应的状态对象。
  // 真正会变化的数据和逻辑都放在 _MyHomePageState 里。
  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

// _MyHomePageState 是 MyHomePage 的状态类（以下划线开头表示私有）。
// 计数器的值、点击按钮的逻辑都写在这里。
class _MyHomePageState extends State<MyHomePage> {
  // 定义计数器变量，初始值为 0。这就是界面上那个会变化的数字。
  int _counter = 0;

  // 点击按钮时调用的方法：让计数器加 1。
  void _incrementCounter() {
    // setState 是关键：告诉 Flutter“状态变了，请重新渲染界面”。
    // 不调用 setState，只改 _counter 的值，界面数字不会更新。
    setState(() {
      _counter++; // 计数器自增 1
    });
  }

  // 重写 build：描述首页的界面结构。
  // 每次调用 setState 后，这个 build 会重新执行，刷新显示。
  @override
  Widget build(BuildContext context) {
    // Scaffold 是页面的“骨架”，提供 appBar（顶栏）、body（内容区）、
    // floatingActionButton（悬浮按钮）等标准页面结构。
    return Scaffold(
      appBar: AppBar(
        // 顶栏背景色：取当前主题配色里的 inversePrimary（紫色的浅色变体）。
        backgroundColor: Theme.of(context).colorScheme.inversePrimary,
        // 顶栏的标题文字，用的是传入的 title。
        title: Text(widget.title),
      ),
      body: Center(
        // Center 是布局组件：把它的子组件放在屏幕正中间。
        child: Column(
          // Column 是布局组件：把多个子组件沿垂直方向（竖排）排列。
          mainAxisAlignment: MainAxisAlignment.center, // 子组件在垂直方向居中
          children: <Widget>[
            // 第一行文字：固定提示语。
            const Text(
              'You have pushed the button this many times:',
            ),
            // 第二行文字：显示当前计数器的值。
            // '$_counter' 是字符串插值，把 _counter 的数值转成文字显示。
            Text(
              '$_counter',
              // 用主题里的 headlineMedium 样式，让数字大而醒目。
              style: Theme.of(context).textTheme.headlineMedium,
            ),
          ],
        ),
      ),
      // 右下角的悬浮按钮（那个 + 号按钮）。
      floatingActionButton: FloatingActionButton(
        onPressed: _incrementCounter, // 点击时调用 _incrementCounter，计数器 +1
        tooltip: 'Increment', // 长按按钮时的提示文字
        child: const Icon(Icons.add), // 按钮上显示一个“加号”图标
      ),
    );
  }
}
