var ToDoList = {};

ToDoList.init = function () {
    var cloneArray = [];
    var descriptionToBeAdded, item,j;
    document.getElementById("add_button").addEventListener('click', ToAdd);
    var textEntered = document.getElementById("textbox");

    document.addEventListener('keypress',KeyPress);

    function KeyPress(event)
    {
        if(event.keyCode===13 || event.which===13)
        ToAdd();
    }

    function ToAdd() {
        descriptionToBeAdded = textEntered.value;
        if(descriptionToBeAdded==" "){
           var textFromPrompt=prompt("enter something"," ");
           descriptionToBeAdded=textFromPrompt;
        }
        var item = document.querySelector(".inner_div");
        var clone = item.cloneNode(true);
        clone.querySelector('[data-list="list"]').textContent = descriptionToBeAdded;
        clone.classList.add("div_list");
        clone.classList.remove("inner_div");
        cloneArray.push(clone);
        document.querySelector(".bottom").appendChild(clone);
        textEntered.value=" ";
        
    }

    document.getElementById("delete_selected_button").addEventListener('click', DeleteSelected);

    function DeleteSelected() {
        var checkedArray= [], numberOfCheckedElements= 0;
        for (j = 0; j < cloneArray.length; j++) {
            if (cloneArray[j])
                if (cloneArray[j].querySelector('[data-check="check"]').checked) {
                    cloneArray[j].remove();
                    checkedArray[numberOfCheckedElements++] = j;
                }
        }
        while (numberOfCheckedElements) {
            cloneArray.splice(checkedArray[--numberOfCheckedElements], 1);
        }
    }
    
    document.getElementById("delete_all").addEventListener('click',DeleteAll);

    function DeleteAll()
    {   
        for(var k=0;k<cloneArray.length;k++)
        {
            cloneArray[k].remove();
        }
        cloneArray=[];
    }
    
    document.getElementById("bottom_div").addEventListener('click', ListHandler);
     
    function ListHandler(event){
        var selectedElement;
        for(var i=0;i<cloneArray.length;i++)
        {
         selectedElement=cloneArray[i].querySelector('[data-list="list"]');
         if(event.target===cloneArray[i].querySelector('[data-active="active_list"]'))
         {   
             selectedElement.classList.remove("list");
             selectedElement.classList.add("list_changed");  
         }
        
        else if(event.target===cloneArray[i].querySelector('[data-delete="delete_list"]'))
        {
            cloneArray[i].remove();
            cloneArray.splice(i,1);
        }

        else if(event.target===cloneArray[i].querySelector('[date-update="update_list"]'))
        {
           
            var updateFromPrompt= prompt("enter to update"," ");
            cloneArray[i].querySelector('[data-list="list"]').textContent=updateFromPrompt;
        }
        
        }

    };
};
ToDoList.init();




