(function () {
    var toDoListArray = [], toDoId = 0;
    var selectedElement, selectedParentElement, toDoItemId;

    function ToDoConstructor(toDoText, toDoId) {
        this.toDoText = toDoText;
        this.toDoId = toDoId;
        this.toDoStatus = false;
        this.toDoChecked = false;
    }

    ToDoConstructor.prototype.updatingArray = function(toDoItemId) {
        for(var i = toDoItemId; i < toDoListArray.length; i++) {
            document.querySelector(`[toDoId="${toDoListArray[i].toDoId}"]`).setAttribute("toDoId",`${toDoListArray[i].toDoId-1}`);
            toDoListArray[i].toDoId -= 1;
        }
    }

    ToDoConstructor.prototype.toDoDone = function(toDoItemId,selectedElement) { 
      switch(this.toDoStatus) {
        case false:
                 selectedElement.classList.remove('list');
                 selectedElement.classList.add('list_changed');  
                 this.toDoStatus = true;
                 break;
        case true:
                 selectedElement.classList.remove('list_changed'); 
                 selectedElement.classList.add('list');  
                 this.toDoStatus = false;
                  break;
      }
    } 

    ToDoConstructor.prototype.toDoDelete = function(toDoItemId) {
        selectedParentElement = document.querySelector(`[todoId="${toDoItemId}"]`);
        selectedParentElement.remove();
        toDoListArray.splice(toDoItemId,1);
        this.updatingArray(toDoItemId);
        toDoId--;
    }

    ToDoConstructor.prototype.toDoUpdate = function(toDoItemId,selectedElement) {
        var updateFromPrompt = prompt("enter to update"," ");
        selectedElement.textContent += updateFromPrompt;
        this.toDoText = updateFromPrompt;
    }

    var textEntered = document.getElementById("textbox");
    document.getElementById("add_button").addEventListener('click', toAdd);
    document.addEventListener('keypress', KeyPress);

    function KeyPress(event) {
         if(event.keyCode === 13 || event.which === 13)
         toAdd();
    }

    function toAdd() {
        var descriptionToBeAdded;
        descriptionToBeAdded = textEntered.value;
        if(descriptionToBeAdded == " ") {
           var textFromPrompt = prompt("enter something"," ");
           descriptionToBeAdded = textFromPrompt;
        }
        var item = document.querySelector(".inner_div");
        var clone = item.cloneNode(true);
        clone.querySelector('[data-list="list"]').textContent = descriptionToBeAdded;
        clone.setAttribute("toDoId",toDoId);
        clone.classList.remove("inner_div");
        clone.classList.add("div_list");
        var toDoElement = new ToDoConstructor(descriptionToBeAdded,toDoId);
        toDoListArray.push(toDoElement);
        document.querySelector(".bottom").appendChild(clone);
        textEntered.value = " ";
        toDoId++;
        
    }

    document.getElementById("delete_selected_button").addEventListener('click', deleteSelected);

    function deleteSelected() {
        for(var j = toDoListArray.length - 1; j >= 0; j--) {
            selectedParentElement = document.querySelector(`[todoId="${j}"]`);
            if(selectedParentElement.querySelector('[data-check="check"]').checked) {
               toDoListArray[j].toDoChecked = true;
               toDoListArray[j].toDoDelete(j);
            }
        }
    }

    document.getElementById("delete_all").addEventListener('click',deleteAll);
    function deleteAll() {
       for(var j = toDoListArray.length - 1; j >= 0; j--)
         {
           toDoListArray[j].toDoDelete(j);
         }
    }

    document.getElementById("bottom_div").addEventListener('click', listHandler);
     
    function listHandler(event) {
            toDoItemId = event.target.parentElement.getAttribute("toDoId");
            selectedParentElement = document.querySelector(`[todoId="${toDoItemId}"]`);
            selectedElement = selectedParentElement.querySelector('[data-list="list"]');
            switch(event.target.getAttribute("data-type")) {
                case "done":
                     toDoListArray[toDoItemId].toDoDone(toDoItemId,selectedElement);
                     break;
                case "delete":
                     toDoListArray[toDoItemId].toDoDelete(toDoItemId);
                     break;
                case "update":
                     toDoListArray[toDoItemId].toDoUpdate(toDoItemId,selectedElement);
                     break;
                default: break;
            }
    };
})();





