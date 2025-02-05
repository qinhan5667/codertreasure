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

      // const editorColor = vscode.window.activeColorTheme.kind === 2 ? "#1e1e1e" : "#ffffff";
    })
  );
}

function generateRandomFunctionName() {
  const verbs = ["handle", "process", "generate", "calculate"];
  const nouns = ["Data", "Event", "Result", "Request"];
  return `${verbs[Math.floor(Math.random() * verbs.length)]}${
    nouns[Math.floor(Math.random() * nouns.length)]
  }`;
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
      }
      #game-container {
        display: none; /* 默认隐藏 */
        position: relative;
        width: 800px;
        height: 600px;
      }
      .code-mask {
        font-family: var(--vscode-editor-font-family);
        white-space: pre;
      }
      .game-tile {
        background-color: var(--vscode-editor-background);
        color: var(--vscode-editor-foreground);
        border: 1px solid var(--vscode-editorLineNumber-foreground);
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
    // ${generateRandomFunctionName()} initialization...
    function ${generateRandomFunctionName()}() {
      ${Array(20)
        .fill("")
        .map(() => `// ${Math.random().toString(36).substr(2, 5)}`)
        .join("\n        ")}
    }
  </div>
  
  <div id="game-container"></div>

  <script>
      // 连连看游戏逻辑
      const symbols = ['🍎', '🍌', '🍇', '🍓', '🍍', '🍒', '🥝', '🍅'];
      // const symbols = ['{}', '()', '[]', '<>', '=>', '//', '/*', '*/'];
      let selectedTiles = [];
      let gameState = [];
      
      // 初始化游戏
      function initGame() {
        // 生成游戏网格逻辑
        const container = document.getElementById('game-container');
        container.style.display = 'grid';
        container.style.gridTemplateColumns = 'repeat(8, 1fr)';
        
        // 创建游戏元素
        symbols.forEach(sym => {
          for (let i=0; i<4; i++) {
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
      initGame();

	    const ws = new WebSocket('ws://localhost:5000');

      // WebSocket 事件处理
      ws.onopen = function(event) {
        console.log('WebSocket connection opened');
      };

      ws.onmessage = function(event) {
        const msg = JSON.parse(event.data);
        const messageElement = document.createElement('div');
        messageElement.style.color = '#' + Math.random().toString(16).substr(2, 6);
        messageElement.textContent = \`\${msg.user}: \${msg.content}\`; // 使用模板字符串
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
  </html>`;
}

export function deactivate() {
  if (chatClient) {
    chatClient.close();
  }
}
