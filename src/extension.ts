import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";

export function activate(context: vscode.ExtensionContext) {
  console.log('CoderTreasure extension is now active!');

  context.subscriptions.push(
    vscode.commands.registerCommand("codertreasure.helloWorld", () => {
      vscode.window.showInformationMessage("Hello VS Code from CoderTreasure!");
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("codertreasure.NowDate", () => {
      vscode.window.showInformationMessage(String(new Date()));
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("codertreasure.start", () => {
      const panel = vscode.window.createWebviewPanel(
        "codertreasure.codeLinkGame",
        "main.service.ts - CoderTreasure",
        vscode.ViewColumn.Beside,
        { enableScripts: true, retainContextWhenHidden: true }
      );

      const html = getWebviewContent();
      panel.webview.html = html;

      // Send user's VS Code editor settings to the webview
      const config = vscode.workspace.getConfiguration('editor');
      const fontFamily = config.get<string>('fontFamily') || 'Consolas';
      const fontSize = config.get<number>('fontSize') || 14;
      const theme = vscode.workspace.getConfiguration('workbench').get<string>('colorTheme') || '';

      setTimeout(() => {
        try {
          panel.webview.postMessage({
            type: 'settings',
            fontFamily,
            fontSize,
            theme: theme.toLowerCase().includes('light') ? 'light' : 'dark'
          });
          console.log(`[CoderTreasure] Sent editor settings: font=${fontFamily} size=${fontSize} theme=${theme}`);
        } catch (e) { /* ignore */ }
      }, 200);
    })
  );
}

export function deactivate() {
  // no-op
}

function getWebviewContent(): string {
  const htmlPath = path.join(__dirname, "game.html");
  try {
    const html = fs.readFileSync(htmlPath, "utf8");
    console.log(`[CoderTreasure] Loaded game.html (${html.length} chars) from: ${htmlPath}`);
    return html;
  } catch (err) {
    console.error(`[CoderTreasure] Failed to load game.html from: ${htmlPath}`, err);
    return `<!DOCTYPE html><html><body style="font-family:monospace;background:#1e1e1e;color:#d4d4d4;padding:20px;">
      <h1 style="color:#f44747;">⚠ Failed to load CoderTreasure UI</h1>
      <p>Expected file: <code>${htmlPath}</code></p>
      <p>Error: <code>${String(err)}</code></p>
      <p style="color:#6a9955;">Tip: Run 'npm run compile' to build the extension first.</p>
    </body></html>`;
  }
}
