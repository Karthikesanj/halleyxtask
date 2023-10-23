document.addEventListener("DOMContentLoaded", function () {
  const draggableElements = document.querySelectorAll(".draggable-element");
  const content = document.getElementById("content");

  let isSplit = false;

  draggableElements.forEach((element) => {
    element.setAttribute("draggable", "true");
    element.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("text/plain", element.textContent);
      if (element.textContent === "Layout") {
        isSplit = true;
      } else {
        isSplit = false;
      }
    });
  });

  content.addEventListener("dragover", (e) => {
    e.preventDefault();
  });

  content.addEventListener("drop", (e) => {
    e.preventDefault();
    const data = e.dataTransfer.getData("text/plain");

    if (isSplit) {
      const leftColumn = document.createElement("div");
      leftColumn.className = "column";
      const rightColumn = document.createElement("div");
      rightColumn.className = "column";
      content.innerHTML = ''; 
      content.appendChild(leftColumn);
      content.appendChild(rightColumn);
    }
    const newElement = document.createElement("div");
    newElement.innerText = data;
    newElement.className = "draggable-element";
    if (data === "Label") {
    const label = document.createElement("label");
    label.textContent = "";
    const input = document.createElement("input");
    input.setAttribute("type", "text");
    newElement.appendChild(label);
    newElement.appendChild(input);
  }else if (data === "Text box") {
      const textInput = document.createElement("input");
      textInput.setAttribute("type", "text");
      newElement.appendChild(textInput);
      }
      else if (data === "Check box") {
      const label = document.createElement("label");
      label.textContent = "Checkbox Label: ";
      const checkbox = document.createElement("input");
      checkbox.setAttribute("type", "checkbox");
      const input = document.createElement("input");
      input.setAttribute("type", "text");
      newElement.appendChild(checkbox); 
     }
    else if (data === "Radio Button") {
      const label = document.createElement("label");
      label.textContent = "Radio Button Label: ";
      const radioButton = document.createElement("input");
      radioButton.setAttribute("type", "radio");
      const input = document.createElement("input");
      input.setAttribute("type", "text");
      newElement.appendChild(radioButton);
      
    }
    else if (data === "Table") {
      const numRows = prompt("Enter the number of rows for the table:");
      const numCols = prompt("Enter the number of columns for the table:");
        if (numRows && numCols) {
        const table = document.createElement("table");
        for (let i = 0; i < numRows; i++) {
          const row = document.createElement("tr");
          for (let j = 0; j < numCols; j++) {
            const cell = document.createElement("td");
            cell.className = "drop-target"; 
            row.appendChild(cell);
          }
          table.appendChild(row);
        }
        newElement.appendChild(table);
      }
    }
     else if (data === "Navigation") {
      const label = document.createElement("label");
      const linkInput = document.createElement("input");
      linkInput.setAttribute("type", "url");
      newElement.appendChild(label);
      newElement.appendChild(linkInput);
    } else {
    newElement.innerText = data;
  }
    const columns = document.querySelectorAll(".column");
    if (columns.length === 2) {
      columns[0].appendChild(newElement);
    } else {
      content.appendChild(newElement);
    }
  });
  const publishButton = document.getElementById("publish-button");
  const previewButton = document.getElementById("preview-button");
  publishButton.addEventListener("click", function () {
    
  });
  previewButton.addEventListener("click", function () {
    alert("This is a preview.Implement your publish functionality here.");
  });
previewButton.addEventListener("click", function () {
  const previewContent = content.innerHTML;
  const previewWindow = window.open();
  previewWindow.document.write("<html><head><title>Preview</title></head><body>");
  previewWindow.document.write("<h1>Preview</h1>");
  previewWindow.document.write(previewContent);
  previewWindow.document.write("</body></html>");
  previewWindow.document.close();
});

});
