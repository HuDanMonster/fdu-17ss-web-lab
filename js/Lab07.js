let addTable = document.getElementsByClassName("addTable")[0];
let showTable = document.getElementsByClassName("showTable")[0];
let selectedBox = document.getElementsByClassName("table1")[0];
let showedTable = document.getElementsByClassName("show")[0];
let commit = document.getElementsByClassName("commit")[0];
let tables = [];
let inputs = [];
let input_text;

function clear(table) {
    if (table === showTable) {
        while (showTable.hasChildNodes()) {
            showTable.removeChild(showTable.firstChild);
        }
    } else if (table === addTable) {
        while (addTable.hasChildNodes()) {
            addTable.removeChild(addTable.firstChild);
        }
    }
}

function showTables(table) {
    clear(showTable);
    let selectedNum = showedTable.selectedIndex;
    if (selectedNum > 0) {
        let selectedTable = tables[selectedNum][0];
        showTable.appendChild(selectedTable);
    }
}

function createTable() {
    clear(addTable);
    input_text = document.createElement("input");
    input_text.type = "text";
    input_text.placeholder = "Table Name";
    let input_number = document.createElement("input");
    input_number.type = "number";
    input_number.placeholder = "Cloumns";
    addTable.appendChild(input_text);
    addTable.appendChild(input_number);
    input_number.addEventListener("change", function() {
        if (addTable.childNodes.length > 1) {
            for (var i = addTable.childNodes.length - 1; i > 2; i--) {
                addTable.removeChild(addTable.lastChild);
            }
            inputs.length = 0;
        }
        if (input_number.value > 0) {
            let th, th_text, input;
            inputs.length = 0;
            let br = document.createElement("br");
            addTable.appendChild(br);
            for (var i = 0; i < input_number.value; i++) {
                input = document.createElement("input");
                input.type = "text";
                input.placeholder = "Attr" + i;
                inputs[inputs.length] = input;
                input.addEventListener("change", function() {
                    let NotEmpty = true;
                    for (var i = 0; i < inputs.length; i++) {
                        if (inputs[i].value == "")
                            NotEmpty = false;
                    }
                    if (NotEmpty && inputs.length != 0)
                        commit.style.display = "";
                }, false);
                addTable.appendChild(input);
            }
        }
    }, false);
}

function addRow() {
    clear(addTable);
    inputs.length = 0;
    if (tables.length > 1) {
        for (var i = 0; i < tables[refresh()][0].childNodes[0].childNodes.length; i++) {
            let input = document.createElement("input");
            input.type = "text";
            input.placeholder = tables[refresh()][0].childNodes[0].childNodes[i].innerText;
            inputs[i] = input;
            input.addEventListener("change", function() {
                let NotEmpty = true;
                for (var i = 0; i < inputs.length; i++) {
                    if (inputs[i].value == "")
                        NotEmpty = false;
                }
                if (NotEmpty && inputs.length != 0)
                    commit.style.display = "";
            }, false);
            addTable.appendChild(input);
        }
    }
}

function deleteRow() {
    clear(addTable);
    inputs.length = 0;
    if (tables.length > 1) {
        for (var i = 0; i < tables[refresh()][0].childNodes[0].childNodes.length; i++) {
            let input = document.createElement("input");
            input.type = "text";
            input.placeholder = tables[refresh()][0].childNodes[0].childNodes[i].innerText;
            inputs[i] = input;
            input.addEventListener("change", function() {
                let NotEmpty = true;
                for (var i = 0; i < inputs.length; i++) {
                    if (inputs[i].value == "")
                        NotEmpty = false;
                }
                if (NotEmpty && inputs.length != 0)
                    commit.style.display = "";
            }, false);
            addTable.appendChild(input);
        }
        commit.style.display = "";
    }
}

function deleteTable() {
    let warning = document.createElement("p");
    let message = document.createTextNode("WARNING: You cannot undo this action!");
    warning.appendChild(message);
    clear(addTable);
    addTable.appendChild(warning);
    commit.style.display = "";
}

selectedBox.addEventListener("change", function() {
    commit.style.display = "none";
    switch (selectedBox.selectedIndex) {
        case 0:
            clear(addTable);
            break;
        case 1:
            createTable();
            break;
        case 2:
            addRow();
            break;
        case 3:
            deleteRow();
            break;
        case 4:
            deleteTable();
            break;
    }
}, false);

showedTable.addEventListener("change", function() {
    clear(showTable);
    let selectedNum = showedTable.selectedIndex;
    if (selectedNum > 0) {
        let selectedTable = tables[selectedNum][0];
        showTable.appendChild(selectedTable);
        if (selectedBox.value == "ADD ROW") {
            addRow();
        }
    }
}, false);

commit.addEventListener("click", function() {
    let i;switch (selectedBox.selectedIndex) {
        case 0:
            return;
        case 1:
            while (showTable.hasChildNodes()) {
                showTable.removeChild(showTable.firstChild);
            }
            let table = document.createElement("table");
            let tr = document.createElement("tr");
            for (i = 0; i < inputs.length; i++) {
                th = document.createElement("th");
                th_text = document.createTextNode(inputs[i].value);
                th.appendChild(th_text);
                tr.appendChild(th);
            }
            table.appendChild(tr);
            tables[0] = [];
            tables[tables.length] = [table, input_text.value];
            let option = document.createElement("option");
            let option_text = document.createTextNode(input_text.value);
            option.appendChild(option_text);
            showedTable.appendChild(option);
            option.selected = true;
            showTables(table);
            break;
        case 2:
            let selectedTable = tables[refresh()][0];
            let addtr = document.createElement("tr");
            for (i = 0; i < inputs.length; i++) {
                let td = document.createElement("td");
                let td_text = document.createTextNode(inputs[i].value);
                td.appendChild(td_text);
                addtr.appendChild(td);
            }
            if (selectedTable.childNodes.length % 2 === 0) {
                addtr.className = "odd";
            }
            selectedTable.appendChild(addtr);
            break;
        case 3:
            let selectedTableTr = tables[refresh()][0];
            let deletetr = document.createElement("tr");
            for (i = selectedTableTr.childNodes.length - 1; i > 0; i--) {
                if (selectedTableTr.childNodes[i].childNodes[0].innerText === inputs[0].value) {
                    selectedTableTr.removeChild(selectedTableTr.childNodes[i]);
                }
            }
            break;
        case 4:
            if (showedTable.childNodes.length > 2) {
                let selectedNum = showedTable.selectedIndex;
                tables.splice(selectedNum, 1);
                showedTable.removeChild(showedTable.childNodes[selectedNum]);
                showedTable.childNodes[1].selected = true;
            } else if (showedTable.childNodes.length == 2) {
                let selectedNum = showedTable.selectedIndex;
                tables.splice(selectedNum, 1);
                showedTable.removeChild(showedTable.childNodes[selectedNum]);
                showedTable.childNodes[0].selected = true;
            }
            showTables();
            break;
    }
}, false);

function refresh() {
    let selectedNum = showedTable.selectedIndex;
    return selectedNum;
}