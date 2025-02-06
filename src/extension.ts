import * as vscode from "vscode";
import { Uri } from "vscode";
import WebSocket from "ws";

interface AppState {
  context?: vscode.ExtensionContext;
}
const state: AppState = {};

let chatClient: WebSocket;

export async function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "codertreasure" is now active!');

  const disposable = vscode.commands.registerCommand(
    "codertreasure.helloWorld",
    () => {
      vscode.window.showInformationMessage("Hello VS Code from codertreasure!");
    }
  );

  context.subscriptions.push(disposable);

  const nowdate = vscode.commands.registerCommand(
    "codertreasure.NowDate",
    () => {
      let date = String(new Date());
      vscode.window.showInformationMessage(date);
    }
  );
  context.subscriptions.push(nowdate);

  context.subscriptions.push(
    vscode.commands.registerCommand("codertreasure.start", () => {
      // 将上下文储存至store
      state.context = context;

      // 创建并显示新的webview
      const panel = vscode.window.createWebviewPanel(
        "codertreasure.extensionWebView", // 只供内部使用，这个webview的标识
        "codertreasure", // 给用户显示的面板标题
        vscode.ViewColumn.Beside,
        { enableScripts: true, retainContextWhenHidden: true }
      );

      panel.webview.html = getWebviewContent();

      panel.webview.options = {
        enableScripts: true, // 允许使用脚本
        localResourceRoots: [Uri.joinPath(state.context.extensionUri, "media")], // 允许访问其他本地资源，并定义加载本地内容的根 URI
      };

      // 在activate函数中添加
      chatClient = new WebSocket("ws://your-python-server:5000");

      // 消息接收处理
      panel.webview.onDidReceiveMessage(
        (message) => {
          switch (message.command) {
            case "sendMsg":
              chatClient.send(
                JSON.stringify({
                  type: "msg",
                  content: message.text,
                  user: "Anonymous",
                })
              );
              break;
          }
        },
        undefined,
        context.subscriptions
      );

      panel.webview.options = {
        enableScripts: true,
        localResourceRoots: [Uri.joinPath(context.extensionUri, "media")],
      };

      panel.webview.onDidReceiveMessage(
        (message) => {
          if (message.command === "toggleDisplay") {
            // 处理快捷键逻辑
          }
        },
        undefined,
        context.subscriptions
      );
    })
  );
}

function getWebviewContent(): string {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <style>
      body {
        background-color: ${
          vscode.window.activeColorTheme.kind === vscode.ColorThemeKind.Dark
            ? "#1e1e1e"
            : "#ffffff"
        };
        color: ${
          vscode.window.activeColorTheme.kind === vscode.ColorThemeKind.Dark
            ? "#d4d4d4"
            : "#333"
        };
        margin: 0;
        padding: 20px;
        font-family: var(--vscode-editor-font-family);
      }
      #game-container {
        display: grid;
        grid-template-columns: repeat(8, 1fr);
        gap: 10px;
      }
      .game-tile {
        background-color: var(--vscode-editor-background);
        color: var(--vscode-editor-foreground);
        border: 1px solid var(--vscode-editorLineNumber-foreground);
        width: 60px;
        height: 60px;
        font-size: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
      }
      .code-mask {
        font-family: var(--vscode-editor-font-family);
        white-space: pre;
        font-size: 14px; /* 调整字体大小 */
        line-height: 1.5; /* 调整行高 */
        position: relative;
      }
      .code-mask .line-numbers {
        position: absolute;
        left: 0;
        top: 0;
        width: 40px; /* 行号宽度 */
        text-align: right;
        color: #757575; /* 行号颜色 */
        font-size: 12px; /* 行号字体大小 */
        padding-right: 5px;
      }
      .code-mask code {
        display: block;
        margin-left: 40px; /* 为行号留出空间 */
      }
      .code-mask span.keyword {
        color: #569cd6; /* 蓝色 */
      }
      .code-mask span.string {
        color: #ce9178; /* 红色 */
      }
      .code-mask span.comment {
        color: #6a9955; /* 绿色 */
      }
      .code-mask span.identifier {
        color: #d4d4d4; /* 默认字体颜色 */
      }
      #difficulty-selector {
        margin-top: 20px;
      }
      #symbol-selector {
        margin-top: 20px;
      }
    </style>
  </head>
  <body>
  <div id="chat-box" style="display:none;position:fixed;bottom:20px;right:20px;width:300px;background:#1e1e1e;padding:10px;">
    <div id="messages" style="height:200px;overflow-y:auto;"></div>
    <input id="msgInput" style="width:70%;color:#000;">
    <button onclick="sendMessage()" style="width:25%;">Send</button>
  </div>

  <div id="code-mask" class="code-mask">
    <div class="line-numbers">
      1<br>
      2<br>
      3<br>
      4<br>
      5<br>
      6<br>
      7<br>
      8<br>
      9<br>
      10<br>
      11<br>
      12<br>
      13<br>
      14<br>
      15<br>
      16<br>
      17<br>
      18<br>
      19<br>
      20<br>
      21<br>
      22<br>
      23<br>
      24<br>
      25<br>
      26<br>
      27<br>
      28<br>
      29<br>
      30<br>
      31<br>
      32<br>
      33<br>
      34<br>
      35<br>
      36<br>
      37<br>
      38<br>
      39<br>
      40<br>
    </div>
    <code>
      <span class="keyword">public</span> <span class="keyword">class</span> <span class="identifier">IPServiceImpl</span> <span class="keyword">implements</span> <span class="identifier">IPService</span> {
      <br>
      <span class="keyword">@Override</span>
      <br>
      <span class="keyword">public</span> <span class="keyword">void</span> <span class="identifier">on</span>(<span class="keyword">String</span> <span class="identifier">mode</span>, <span class="keyword">String</span> <span class="identifier">ip</span>) {
      <br>
      <span class="identifier">log</span>.<span class="identifier">info</span>(<span class="string">"IPService is turned on with mode: "</span> + <span class="identifier">mode</span>);
      <br>
      <span class="identifier">ipMapper</span>.<span class="identifier">turnOn</span>(<span class="identifier">mode</span>, <span class="identifier">ip</span>);
      <br>
      }
      <br>
      <span class="keyword">@Override</span>
      <br>
      <span class="keyword">public</span> <span class="keyword">void</span> <span class="identifier">off</span>() {
      <br>
      <span class="identifier">ipMapper</span>.<span class="identifier">turnOff</span>();
      <br>
      }
      <br>
      <span class="keyword">@Override</span>
      <br>
      <span class="keyword">public</span> <span class="keyword">Map</span>&lt;<span class="keyword">String</span>, <span class="keyword">String</span>&gt; <span class="identifier">detail</span>() {
      <br>
      <span class="identifier">log</span>.<span class="identifier">info</span>(<span class="string">"Querying ipRules"</span>);
      <br>
      <span class="keyword">List</span>&lt;<span class="keyword">Map</span>&lt;<span class="keyword">String</span>, <span class="keyword">String</span>&gt;&gt; <span class="identifier">ipRule</span> = <span class="identifier">ipMapper</span>.<span class="identifier">getIPRule</span>();
      <br>
      <span class="keyword">Map</span>&lt;<span class="keyword">String</span>, <span class="keyword">String</span>&gt; <span class="identifier">status</span> = <span class="identifier">ipMapper</span>.<span class="identifier">getStatus</span>();
      <br>
      <span class="identifier">ipRule</span>.<span class="identifier">stream</span>().<span class="identifier">forEach</span>(<span class="identifier">t</span> -&gt; {
      <br>
      <span class="keyword">if</span> (<span class="identifier">t</span>.<span class="identifier">get</span>(<span class="string">"type"</span>).<span class="identifier">equals</span>(<span class="string">"white"</span>)) {
      <br>
      <span class="identifier">status</span>.<span class="identifier">put</span>(<span class="string">"whiteIP"</span>, <span class="identifier">t</span>.<span class="identifier">get</span>(<span class="string">"ip"</span>));
      <br>
      } <span class="keyword">else</span> <span class="keyword">if</span> (<span class="identifier">t</span>.<span class="identifier">get</span>(<span class="string">"type"</span>).<span class="identifier">equals</span>(<span class="string">"black"</span>)) {
      <br>
      <span class="identifier">status</span>.<span class="identifier">put</span>(<span class="string">"blackIP"</span>, <span class="identifier">t</span>.<span class="identifier">get</span>(<span class="string">"ip"</span>));
      <br>
      }
      <br>
      });
      <br>
      <span class="keyword">return</span> <span class="identifier">status</span>;
      <br>
      }
      <br>
      <span class="keyword">@Override</span>
      <br>
      <span class="keyword">public</span> <span class="keyword">boolean</span> <span class="identifier">check</span>(<span class="keyword">String</span> <span class="identifier">mode</span>, <span class="keyword">String</span> <span class="identifier">ipList</span>, <span class="keyword">String</span> <span class="identifier">originIp</span>) {
      <br>
      <span class="keyword">return</span> <span class="identifier">ipMapper</span>.<span class="identifier">check</span>(<span class="identifier">mode</span>, <span class="identifier">ipList</span>, <span class="identifier">originIp</span>);
      <br>
      }
      <br>
    </code>
  </div>

  <div id="game-container"></div>
  <div id="difficulty-selector">
    <label for="difficulty">Difficulty:</label>
    <select id="difficulty" onchange="setDifficulty(this.value)">
      <option value="easy">Easy</option>
      <option value="medium">Medium</option>
      <option value="hard">Hard</option>
    </select>
  </div>

  <div id="symbol-selector">
    <label for="symbols">Symbols:</label>
    <select id="symbols" onchange="setSymbols(this.value)">
      <option value="fruits">Fruits</option>
      <option value="brackets">Brackets</option>
      <option value="keywords">Keywords</option>
    </select>
  </div>

  <script>
    // 连连看游戏逻辑
    let symbols = ['🍎', '🍌', '🍇', '🍓', '🍍', '🍒', '🥝', '🍅'];
    let selectedTiles = [];
    let gameState = [];

    // 初始化游戏
    function initGame(symbols, symbolCount) {
      const container = document.getElementById('game-container');
      container.innerHTML = ''; // 清空现有内容

      symbols.forEach(sym => {
        for (let i = 0; i < symbolCount; i++) {
          const div = document.createElement('div');
          div.textContent = sym;
          div.style.border = '1px solid #666';
          div.style.padding = '10px';
          div.style.cursor = 'pointer';
          div.addEventListener('click', handleTileClick);
          container.appendChild(div);
        }
      });
    }

    // 设置难度
    function setDifficulty(difficulty) {
      const container = document.getElementById('game-container');
      let gridSize = 6;
      let symbolCount = 8;

      if (difficulty === 'easy') {
        gridSize = 6;
        symbolCount = 4;
      } else if (difficulty === 'medium') {
        gridSize = 8;
        symbolCount = 6;
      } else if (difficulty === 'hard') {
        gridSize = 10;
        symbolCount = 8;
      }

      container.style.gridTemplateColumns = \`repeat(\${gridSize}, 1fr)\`;
      initGame(symbols, symbolCount);
    }

    // 设置符号
    function setSymbols(symbolSet) {
      let newSymbols = [];
      if (symbolSet === 'fruits') {
        newSymbols = ['🍎', '🍌', '🍇', '🍓', '🍍', '🍒', '🥝', '🍅'];
      } else if (symbolSet === 'brackets') {
        newSymbols = ['{}', '()', '[]', '<>', '=>', '//', '/*', '*/'];
      } else if (symbolSet === 'keywords') {
        newSymbols = ['def', 'function', 'class', 'array', 'list', 'axios', 'ref', 'let'];
      }
      symbols = newSymbols;
      initGame(symbols, 8);
    }

    // 处理点击事件
    function handleTileClick(e) {
      if (selectedTiles.length < 2) {
        e.target.style.background = '#333';
        selectedTiles.push(e.target);

        if (selectedTiles.length === 2) {
          checkMatch(selectedTiles);
          selectedTiles = [];
        }
      }
    }

    // 验证匹配
    function checkMatch(tiles) {
      if (tiles[0].textContent === tiles[1].textContent) {
        setTimeout(() => {
          tiles.forEach(t => t.style.visibility = 'hidden');
        }, 300);
      } else {
        setTimeout(() => {
          tiles.forEach(t => t.style.background = 'transparent');
        }, 300);
      }
    }

    // 切换显示模式
    function toggleDisplay() {
      const game = document.getElementById('game-container');
      const mask = document.getElementById('code-mask');
      game.style.display = game.style.display === 'none' ? 'grid' : 'none';
      mask.style.display = mask.style.display === 'none' ? 'block' : 'none';
    }

    // 快捷键监听
    document.addEventListener('keydown', (e) => {
      if (e.altKey && e.key === 'F12') {
        toggleDisplay();
      }
      if (e.key === 'Escape') {
        document.getElementById('game-container').style.display = 'none';
        document.getElementById('code-mask').style.display = 'block';
      }
    });

    // 初始化
    initGame(symbols, 8);

    const ws = new WebSocket('ws://localhost:5000');

    // WebSocket 事件处理
    ws.onopen = function(event) {
      console.log('WebSocket connection opened');
    };

    ws.onmessage = function(event) {
      const msg = JSON.parse(event.data);
      const messageElement = document.createElement('div');
      messageElement.style.color = '#' + Math.random().toString(16).substr(2, 6);
      messageElement.textContent = \`\${msg.user}: \${msg.content}\`;
      document.getElementById('messages').appendChild(messageElement);
    };

    ws.onclose = function(event) {
      console.log('WebSocket connection closed');
    };

    ws.onerror = function(error) {
      console.error('WebSocket error:', error);
    };

    // 发送消息
    function sendMessage() {
      const input = document.getElementById('msgInput');
      if (ws.readyState === WebSocket.OPEN) {
        try {
          ws.send(JSON.stringify({
            type: 'msg',
            content: input.value,
            user: 'Anonymous'
          }));
          input.value = '';
        } catch (error) {
          console.error('Error sending message:', error);
        }
      } else {
        console.error('WebSocket connection is not open.');
      }
    }

    // 切换聊天窗口
    document.addEventListener('keydown', (e) => {
      if (e.ctrlKey && e.altKey && e.key === 'T') {
        const chat = document.getElementById('chat-box');
        chat.style.display = chat.style.display === 'none' ? 'block' : 'none';
      }
    });
  </script>
  </body>
  </html>
  `;
}

export function deactivate() {
  if (chatClient) {
    chatClient.close();
  }
}
