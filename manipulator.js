//Global Contents Variable
var contents = new Array();

//Event Listners
window.addEventListener('DOMContentLoaded', function (){
    loadDataRecord();
});
document.getElementById("word-count").addEventListener("click",function (e){
    wordCount(e);
});
document.getElementById("alphabetic-order").addEventListener("click",function (e){
    alphabeticOrder(e);
});
document.getElementById("reverse-words").addEventListener("click",function (e){
    reverseWords(e);
});
document.getElementById("palindromes").addEventListener("click",function (e){
    palindromes(e);
});


function loadDataRecord(){
    var list = document.getElementById("collection");
    var dataTitle = JSON.parse(localStorage.getItem("dataTitles"))[localStorage.getItem("selectedRecord")];
    var dataList  = JSON.parse(localStorage.getItem("dataSources"))[localStorage.getItem("selectedRecord")];
    var formTitle = document.getElementById('card-title');
    var entries = dataList.split(/[.,\/ -]/); //Regex to split by either of these characters [.,\/ -]
    formTitle.appendChild(document.createTextNode(dataTitle));
    
    if (dataList !== "" && dataList !== null){
        for (i=0; i < entries.length; i++){
            var list = document.getElementById("collection");
            var dataItem = document.createElement("li");
            dataItem.className = "collection-item";
            dataItem.value = i;
            if (entries[i] !== ""){
                dataItem.appendChild(document.createTextNode(entries[i]));
                contents.push(entries[i]);
                list.appendChild(dataItem);
            }
        }
    }
}

function deleteRecords(){
    var list = document.getElementById("collection");
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }
}

function wordCount(e){
    e.preventdefault;
    deleteRecords();
    var wordCountList = {}; //Hash Map
    var sortArray = [];
    //Set the key value  pairs
    contents.forEach(function(entry) {
        if (!wordCountList[entry]) {
            wordCountList[entry] = 0;
        }
        wordCountList[entry] += 1;
    });
    //push to sortable array
    for (var key in wordCountList){
        sortArray.push([key,wordCountList[key]]);
    }
    //numeric sort
    sortArray.sort(function(a,b) {
            return b[1] - a[1];
    });
    //display sorted list
    for (i=0; i < sortArray.length; i++){
        var list = document.getElementById("collection");
        var dataItem = document.createElement("li");
        dataItem.className = "collection-item";
        dataItem.value = i;
        if (sortArray[i] !== ""){
            dataItem.appendChild(document.createTextNode("Entry (" + sortArray[i][0] + ") Appears " + sortArray[i][1]  + " Times"));
            list.appendChild(dataItem);
        }
    }

}

function alphabeticOrder(e){
    e.preventdefault;
    deleteRecords();
    contents.sort();
    var list = document.getElementById("collection");
    
    if (contents !== "" && contents !== null){
        for (i=0; i < contents.length; i++){
            var list = document.getElementById("collection");
            var dataItem = document.createElement("li");
            dataItem.className = "collection-item";
            dataItem.value = i;
            if (contents[i] !== ""){
                dataItem.appendChild(document.createTextNode(contents[i]));
                list.appendChild(dataItem);
            }
        }
    }
}

function reverseWords(e){
    e.preventdefault;
    deleteRecords();
    var wordToReverse;
    if (contents !== "" && contents !== null){
        for (i=0; i < contents.length; i++){
            var list = document.getElementById("collection");
            var dataItem = document.createElement("li");
            wordToReverse = contents[i];
            dataItem.className = "collection-item";
            dataItem.value = i;
            if (contents[i] !== ""){
                dataItem.appendChild(document.createTextNode(wordToReverse.split("").reverse().join("")));
                list.appendChild(dataItem);
            }
        }
    }
}

function palindromes(e){
    e.preventdefault;
    deleteRecords();
    if (contents !== "" && contents !== null){
        for (i=0; i < contents.length; i++){
            alert(contents[i]);
            if (contents[i] !== ""){
                if (isPalindrome(contents[i])){
                    var list = document.getElementById("collection");
                    var dataItem = document.createElement("li");
                    dataItem.className = "collection-item";
                    dataItem.value = i;
                    dataItem.appendChild(document.createTextNode(contents[i]));
                    list.appendChild(dataItem);
                }
            }
        }
    }
}

function isPalindrome(word){
    var halfLength = Math.floor(word.length / 2);
    for (r=0; r < halfLength; r++){
        if (word[r] !== word[word.legnth - (r-1)]){
            return false;
        }
    }
    return true;
}