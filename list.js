//TO DO Setup Local Storage



document.getElementById("add-data").addEventListener("click",function (){
    addDataRecord();
});

function addDataRecord(){
    if (document.getElementById("file").length === 0 ){
        alert("No Documents Uploaded!");
        return;
    }
    var fileUpload = document.getElementById("file");
    alert(fileUpload.files.length);
    for (var i = 0; i < fileUpload.files.length; i++) {
        var list = document.getElementById("collection");
        var dataItem = document.createElement("li");
        dataItem.appendChild(document.createTextNode(fileUpload.files[i].name));
        list.appendChild(dataItem);
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
    var file = (fileUpload.files)[0]; 
    var r = new FileReader();
    r.onload = (function(file) {
    return function(e) {
      var contents = e.target.result;
      alert(contents);
    };
    })(file);
  r.readAsText(file);
}