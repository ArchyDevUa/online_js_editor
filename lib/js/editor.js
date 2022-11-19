// const executeCodeBtn = document.querySelector('.editor__run');
// const resetCodeBtn = document.querySelector('.editor__reset')

// let codeEditor = ace.edit("editorCode");
// let consoleMessages = [];

// codeEditor.setFontSize(16)

// let editorLib = {
//     init(){
//         codeEditor.setTheme("ace/theme/dreamweaver");
//         codeEditor.session.setMode("ace/mode/javascript");
//         codeEditor.setOptions({
//             enableBasicAutocompletion: true,
//             enableLiveAutocompletion: true,

//         })
//     }
// }

// executeCodeBtn.addEventListener('click',() => {
//     const userCode = codeEditor.getValue();
//     try{
//         new Function(userCode)();
//     }catch(err){
//         console.error(err);
//     }
// });

// resetCodeBtn.addEventListener('click', () => {
//     codeEditor.setValue('')
// })

// editorLib.init();

// Retrieve Elements






const consoleLogList = document.querySelector('.editor__console-logs');
const executeCodeBtn = document.querySelector('.editor__run');
const resetCodeBtn = document.querySelector('.editor__reset');

// Setup Ace
let codeEditor = ace.edit("editorCode");
codeEditor.setFontSize(16)
let consoleMessages = [];

let editorLib = {
    clearConsoleScreen() {
        consoleMessages.length = 0;

        // Remove all elements in the log list
        while (consoleLogList.firstChild) {
            consoleLogList.removeChild(consoleLogList.firstChild);
        }
    },
    printToConsole() {
        consoleMessages.forEach(log => {
            const newLogItem = document.createElement('li');
            const newLogText = document.createElement('pre');

            newLogText.className = log.class;
            newLogText.textContent = `> ${log.message}`;

            newLogItem.appendChild(newLogText);

            consoleLogList.appendChild(newLogItem);
        })
    },
    init() {
        // Configure Ace

        // Theme
        codeEditor.setTheme("ace/theme/dreamweaver");

        // Set language
        codeEditor.session.setMode("ace/mode/javascript");

        // Set Options
        codeEditor.setOptions({
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
        });

        // Set Default Code
        // codeEditor.setValue(defaultCode);
    }
}

// Events
executeCodeBtn.addEventListener('click', () => {
    // Clear console messages
    editorLib.clearConsoleScreen();
    
    // Get input from the code editor
    const userCode = codeEditor.getValue();

    // Run the user code
    try {
        new Function(userCode)();
    } catch (err) {
        console.error(err);
    }

    // Print to the console
    editorLib.printToConsole();
});

resetCodeBtn.addEventListener('click', () => {
    // Clear ace editor
    codeEditor.setValue('');

    // Clear console messages
    editorLib.clearConsoleScreen();
})

editorLib.init();