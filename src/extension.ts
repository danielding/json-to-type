'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import {window, workspace, commands, ExtensionContext, TextDocument} from 'vscode';
import TypeGenerator from './type-generator';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: ExtensionContext) {

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = commands.registerCommand('extension.convertJsonToType', () => {
        // The code you place here will be executed every time your command is executed
        let docContent = preCheck();
        if (docContent !== false) {
            generateType(<string>docContent);
        }
    });

    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
}

/**
 * precheck before doing covert
 */
function preCheck(): boolean | string {
    // read the current opened json file content
    let editor = window.activeTextEditor;
    if (!editor) {
        window.showInformationMessage('you didn\'t open a json file!');
        return false;
    }

    let docContent = editor.document.getText();
    if (!docContent) {
        window.showInformationMessage('you current active document is Empty!');
        return false;
    }

    // check weather the json file is in correct format
    if (!isJson(docContent)) {
        window.showInformationMessage('json file format is wrong! pls check it in http://jsonlint.com/');
        return false;
    }

    // check weather the workspace path is avaiable
    if (workspace === undefined || workspace.rootPath === null || workspace.rootPath === undefined) {
        window.showInformationMessage('please open a foler as your workspace!');
        return false;
    }

    return docContent;
}

/**
 * conver json to type
 */
function generateType(docContent: string) {
    // conver json to type
    let dataset = JSON.parse(docContent);
    let typeGenerator = new TypeGenerator('rootElement', dataset);
    let dataStr = typeGenerator.getResult();

    // write the content into file
    let fs = require("fs");
    let directoryPath = workspace.rootPath + '/typings';

    if (!fs.existsSync(directoryPath)) {
        fs.mkdirSync(directoryPath);
    }

    fs.writeFile(
        directoryPath + '/data-type.d.ts', 
        dataStr, 
        { flag: 'w' }, 
        function (err) {
            if (err) throw err;
            window.showInformationMessage('convert success. generated in ' + directoryPath + '/data-type.d.ts');
        }
    );
}

/**
 * check whether the file is json
 */
function isJson(stringContent) {
    try {
        JSON.parse(stringContent);
    } catch (e) {
        return false;
    }
    return true;
}