
window.addEventListener('DOMContentLoaded', function (){
    loadDataRecord();
});


function loadDataRecord(){
    var list = document.getElementById("collection");
    var dataTitle = JSON.parse(localStorage.getItem("dataTitles"))[localStorage.getItem("selectedRecord")];
    var dataList  = JSON.parse(localStorage.getItem("dataSources"))[localStorage.getItem("selectedRecord")];
    var formTitle = document.getElementById('card-title');
    var entries = dataList.split(",");
    formTitle.appendChild(document.createTextNode(dataTitle));
    
    if (dataList !== "" && dataList !== null){
        for (i=0; i < entries.length; i++){
            var list = document.getElementById("collection");
            var dataItem = document.createElement("li");
            dataItem.className = "collection-item";
            dataItem.value = i;
            dataItem.appendChild(document.createTextNode(entries[i]));
            list.appendChild(dataItem);
        }
    }
}