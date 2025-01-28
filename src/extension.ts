import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";

export function activate(context: vscode.ExtensionContext) {
  console.log(
    'Congratulations, your extension "add-function-to-directory" is now active!'
  );

  const disposable = vscode.commands.registerCommand(
    "add-function-to-directory.createFunction",
    async (uri: vscode.Uri) => {
      const folderPath = uri.fsPath;

      const functionName = await vscode.window.showInputBox({
        prompt: "Enter the function name",
        placeHolder: "exampleFunction",
      });

      if (!functionName) {
        vscode.window.showErrorMessage("Function name is required");
        return;
      }

      const indexJsPath = path.join(folderPath, "index.js");
      const indexTsPath = path.join(folderPath, "index.ts");

      let indexFilePath: string;
      let fileExtension: string;

      if (fs.existsSync(indexJsPath)) {
        indexFilePath = indexJsPath;
        fileExtension = "js";
      } else if (fs.existsSync(indexTsPath)) {
        indexFilePath = indexTsPath;
        fileExtension = "ts";
      } else {
        const selectedExtension = await vscode.window.showQuickPick(
          ["ts", "js"],
          {
            placeHolder:
              "No index file found. Select the file extension for the new index file:",
          }
        );

        if (!selectedExtension) {
          vscode.window.showErrorMessage(
            "File extension selection is required"
          );
          return;
        }

        fileExtension = selectedExtension;
        indexFilePath = path.join(folderPath, `index.${fileExtension}`);
      }

      const functionFilePath = path.join(
        folderPath,
        `${functionName}.${fileExtension}`
      );

      if (fs.existsSync(functionFilePath)) {
        vscode.window.showWarningMessage(
          `${functionName}.${fileExtension} already exists.`
        );
        return;
      }

      fs.writeFileSync(
        functionFilePath,
        `const ${functionName} = () => {\n  // Your code here\n}\n\nexport default ${functionName}\n`
      );
      vscode.window.showInformationMessage(
        `Created ${functionName}.${fileExtension}`
      );

      const files = fs.readdirSync(folderPath);
      const functionFiles = files.filter(
        (file) =>
          file.endsWith(`.${fileExtension}`) &&
          file !== `index.${fileExtension}`
      );

      const exportLines = functionFiles
        .sort((a, b) => a.localeCompare(b))
        .map((file) => {
          const name = path.basename(file, `.${fileExtension}`);
          return `export { default as ${name} } from './${name}'`;
        });

      fs.writeFileSync(indexFilePath, exportLines.join("\n") + "\n");
      vscode.window.showInformationMessage(
        `Updated and alphabetized index.${fileExtension}`
      );
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
