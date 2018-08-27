//Global Contents Variable
var contents = new Array();

//Event Listners
window.addEventListener('DOMContentLoaded', function (){
    loadDataRecords();
});
document.getElementById("add-data").addEventListener("click",function (e){
    addDataRecord(e);
});
document.getElementById("erase-data").addEventListener("click",function (){
    deleteAllDataRecords();
});

function deleteAllDataRecords(){
    localStorage.clear();
}
function deleteDataRecord(e){
    var recordIndex = e.target.parentNode.parentNode.value;
    var dataTitles  = JSON.parse(localStorage.getItem("dataTitles"));
    var dataSources = JSON.parse(localStorage.getItem("dataSources"));
    e.target.parentNode.parentNode.remove();
    dataSources.splice(recordIndex,1);
    dataTitles.splice(recordIndex,1);
    localStorage.setItem('dataSources', JSON.stringify(dataSources));
    localStorage.setItem('dataTitles', JSON.stringify(dataTitles));
}
function openDataRecord(e){
    //set the active record for the manipulator
    var recordIndex = e.target.parentNode.value;
    localStorage.setItem('selectedRecord', JSON.stringify(recordIndex));
}

function loadDataRecords(){
    recordSent = 0;
    var list = document.getElementById("collection");
    var dataList = JSON.parse(localStorage.getItem("dataTitles"));
    if (dataList !== "" && dataList !== null){
        var noDataRecord = document.getElementById('no-data');
        noDataRecord.parentNode.removeChild(noDataRecord);
        for (i=0; i < dataList.length; i++){
            var dataItem = document.createElement("li");
            var openLink = document.createElement("a");
            var dataLink = document.createElement("a");
            var deleteIcon = document.createElement("i");
            dataItem.className = "collection-item";
            dataItem.value = i;
            dataLink.className = "secondary-content";
            dataLink.href = "#";
            deleteIcon.className = "fas fa-times" ;
            deleteIcon.id = "delete-item";
            openLink.className = "fas fa-folder-open" ;
            openLink.id = "open-item";
            openLink.href = "manipulator.html"
            openLink.addEventListener("click",function (e){
                openDataRecord(e);
            });
            deleteIcon.addEventListener("click",function (e){
                deleteDataRecord(e);
            });
            dataItem.appendChild(openLink);
            dataItem.appendChild(document.createTextNode(dataList[i]));
            list.appendChild(dataItem);
            dataItem.appendChild(dataLink);
            dataLink.appendChild(deleteIcon);
        }
    }
}

function addDataRecord(e){
    if (document.getElementById("file").length === 0 ){
        alert("No Documents Uploaded!");
        return;
    }
    var fileUpload = document.getElementById("file");
    for (var i = 0; i < fileUpload.files.length; i++) {
        let dataSource = contents[i];
        let dataSources;
        let dataTitle = fileUpload.files[i].name;
        let dataTitles;
        var list = document.getElementById("collection");
        var dataItem = document.createElement("li");
        dataItem.appendChild(document.createTextNode(fileUpload.files[i].name));
        list.appendChild(dataItem);
        if (localStorage.getItem("dataSources") === null){
            dataSources = [];
        }
        else{
            dataSources = JSON.parse(localStorage.getItem("dataSources"));
        }
        if (localStorage.getItem("dataTitles") === null){
            dataTitles = [];
        }
        else{
            dataTitles = JSON.parse(localStorage.getItem("dataTitles"));
        }
        dataSources.push(dataSource);
        dataTitles.push(dataTitle);
        localStorage.setItem('dataSources', JSON.stringify(dataSources));
        localStorage.setItem('dataTitles', JSON.stringify(dataTitles));
    }
}

function FileUpload(){
    var fileUpload = document.getElementById("file");
    var fileText = "";
    if ('files' in fileUpload) {
        if (fileUpload.files.length == 0) {
            fileText = "Select one or more files.";
        } 
        else {
            for (var i = 0; i < fileUpload.files.length; i++) {
                fileText += "<br><strong>" + (i+1) + ". file</strong><br>";
                var file = fileUpload.files[i];
                if ('name' in file) {
                    fileText += "name: " + file.name + "<br>";
                }
                if ('size' in file) {
                    fileText += "size: " + file.size + " bytes <br>";
                }
                var r = new FileReader();
                r.onload = (function(file) {
                    return function(e) {
                    contents.push(e.target.result);
                    };
                })(file);
                r.readAsText(file);
            }
        }
    } 
    else {
        if (fileUpload.value == "") {
            fileText += "Select one or more files.";
        } else {
            fileText += "The files property is not supported by your browser!";
            fileText  += "<br>The path of the selected file: " + fileUpload.value; // If the browser does not support the files property, it will return the path of the selected file instead. 
        }
    }
}