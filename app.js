// var body = document.body,
// html = document.documentElement;
// var height = Math.max( body.scrollHeight, body.offsetHeight, 
//                    html.clientHeight, html.scrollHeight, html.offsetHeight );
//const { findAllPackage, removePackage, updatePackage } = require("./database/db-func");


var interval1;
var interval2;
var code;
var splitPayload;
let slot1 = null;
let slot2 = null;
var nextArr;
var lotArr=[];
var checkArrP=[];
var checkArrL=[];
var checkArrT=[];
var daction;
var index=1;
var totalDate;
var recordDate;
var recordDateFile;



function getTotalDate(){
    var d = new Date();
    A=d.getFullYear();
    B=d.getMonth();
    B=B+1;
    C=d.getDate();
    D=d.getHours();
    E=d.getMinutes();
    F=d.getSeconds();
    totalDate = ''+A+':'+B+':'+C+':'+D+':'+E+':'+F
    // alert(totalDate);
}
function getTRecordDate(){
    var d = new Date();
    montharr = ["January","February","March","April" , "May", "June", "July", "August", "September", "October", "November", "December"];
    dayarr = ["Sunday","Monday", "Tuesday", "Wednesday" ,"Thursday", "Friday", "Saturday"];
    A=d.getFullYear();
    B=d.getMonth();
    C=d.getDate();
    D=d.getHours();
    E=d.getMinutes();
    F=d.getSeconds();
    G=d.getDay();
    recordDate = dayarr[G] +', '+C+' '+montharr[B]+', '+A;
    document.getElementById("RecordDate").innerHTML=recordDate;
    recordDateFile= dayarr[G] +'-'+C+'-'+montharr[B]+'-'+A+'-Time-'+D+'-'+E;
}
function maintainHeight(){
    if (document.getElementById("table2").offsetHeight > 700 ){
        var kk = document.getElementById("table2").offsetHeight;
        kk=kk+100;
        kk.toString();
        kk= kk+"px";
        document.getElementById("content").style.height = kk; 
    }
}

function disable()
{
 document.onkeydown = function (e) 
 {
  return false;
 }
}


function enable()
{
 document.onkeydown = function (e) 
 {
  return true;
 }
}

function Export2Doc(element, filename = ''){
    var html = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML To Doc</title></head><body>";
    var footer = "</body></html>";
    var html = html+document.getElementById(element).innerHTML+footer;

    
    //link url
    var url = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(html);
    getTRecordDate();
    var nam= 'DailyScanRecord'+recordDateFile+'.doc';
    //file name
    filename = filename?filename+'.doc':nam;
    
    // Creates the  download link element dynamically
    var downloadLink = document.createElement("a");

    document.body.appendChild(downloadLink);
    
    //Link to the file
    downloadLink.href = url;
        
    //Setting up file name
    downloadLink.download = filename;
        
    //triggering the function
    downloadLink.click();
    //Remove the a tag after donwload starts.
    document.body.removeChild(downloadLink);
}
function exportTableToExcel(tableID, filename = ''){
    var downloadLink;
    var dataType = 'application/vnd.ms-excel';
    var tableSelect = document.getElementById(tableID);
    var tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');
    
    // Specify file name
    var nam= 'DailyScanRecordTable'+recordDateFile+'.xls';
    filename = filename?filename+'.xls':nam;
    
    // Create download link element
    downloadLink = document.createElement("a");
    
    document.body.appendChild(downloadLink);
    
    if(navigator.msSaveOrOpenBlob){
        var blob = new Blob(['\ufeff', tableHTML], {
            type: dataType
        });
        navigator.msSaveOrOpenBlob( blob, filename);
    }else{
        // Create a link to the file
        downloadLink.href = 'data:' + dataType + ', ' + tableHTML;
    
        // Setting the file name
        downloadLink.download = filename;
        
        //triggering the function
        downloadLink.click();
    }
}
function addNextRow(numberLine, newProductline1, newProductline2, newProductline3, newLocation, theDate) {
    var table = document.getElementById("table2");
    var row = table.insertRow(numberLine);
    // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    var cell6 = row.insertCell(5);

    // Add some text to the new cells:
    cell1.innerHTML = numberLine;
    cell2.innerHTML = newProductline1;
    cell3.innerHTML = newProductline2;
    cell4.innerHTML = newProductline3;
    cell5.innerHTML = newLocation;
    cell6.innerHTML = theDate;

    row.style.textAlign = "center";
}

function DeladdNextRow(numberLine, newProductline1, newProductline2, newProductline3, newLocation, theDate) {
    var table = document.getElementById("table2");
    var row = table.insertRow(numberLine);
    // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    var cell6 = row.insertCell(5);

    // Add some text to the new cells:
    cell1.innerHTML = numberLine;
    cell2.innerHTML = newProductline1;
    cell3.innerHTML = newProductline2;
    cell4.innerHTML = newProductline3;
    cell5.innerHTML = newLocation;
    cell6.innerHTML = theDate;

    row.style.textAlign = "center";
    row.style.color= "red";
}
//Update today's date
getTRecordDate();

//Save file button click
document.getElementById("savefile").onclick = function(){
    Export2Doc("savecontent");
}
document.getElementById("savefileexcel").onclick = function(){
    exportTableToExcel("savecontent");
}

//Search itm click

document.getElementById("searchbutton").onclick = function(){
    document.getElementById("thesearch").style.display="block";
}
document.getElementById("endSearch").onclick = function(){
    document.getElementById("thesearch").style.display="none";
}
//Scan Button click
document.getElementById("scanbutton").onclick = function(){
    document.getElementById("onScan").style.display="block";
    document.getElementById("searchbutton").style.display="none";
    document.getElementById("savefile").style.display="none";
    document.getElementById("savefileexcel").style.display="none";
    document.getElementById("textarea").focus();
    document.getElementById("scanbutton").style.background="rgba(128, 128, 128, 0.96)";
    document.getElementById("scanbutton").style.color="rgba(54, 54, 54, 0.77)";
    document.getElementById("onScan").style.zIndex="2";
    //disable();
    alert("Ensure Scanning Device is connected, Application is listening to Scanning Signals");
    interval1 = setInterval(myTimer2, 10);
    function myTimer2() {
        document.getElementById("textarea").focus();
    }
    interval2 = setInterval(myTimer, 1500);

    function myTimer() {
            document.getElementById("textarea").focus();
            x = document.getElementById("textarea").value;
            // alert(x);
            // document.getElementById("textarea").value = "";
    
            x = x.replace(y,"");
            if (z===" init"){
                z=x;
            }else if( x=== ""){
                z=z;
            }else if( x!== ""){
                z=x;
            }

            //Sequential code goes here, use var Z as latest values. if x is empty, no new input, else new input.
            
            
            while (z.includes("\n")) {
                z = z.replace("\n","");
            }
            code = z.toString();
            if (code.includes("*") && x!=="") {
                // console.log('Product\n');
                splitPayload = code.split('*');
                if(splitPayload.length === 3){
                    if (slot1 == null) {
                        slot1 = splitPayload;
                        nextArr = slot1;
                        splitPayload="";
                        // addNextRow(1, nextArr[0], nextArr[1], nextArr[2], nextArr[2], "location");
                        // console.log('slot1: ', slot1)
                        // slot1 = null
                    }
                    else if (slot1 !== null && slot2 == null) {
                        slot2 = splitPayload;
                        // console.log('slot2: ', slot2)
                        // alert('yes');
                        //remove if thesame;364348
                        if ((slot1[0] == slot2[0]) && (slot1[1] == slot2[1]) && (slot1[2] == slot2[2])) {
                            var joined = slot1[0] + slot1[1] + slot1[2];
                            if (checkArrP.includes(joined)){
                                var i1=checkArrP.indexOf(joined);
                                document.getElementById("table2").deleteRow(i1+1);
                                // document.getElementById("table2").rows[i1+1].colSpan="4";
                                // addNextRow(i1+1, "PRODUCT" + "REMOVED FROM LOCATION>>>", "", "", checkArrL[i1] );
                                getTotalDate();
                                deldate="A"+ checkArrT[i1] + "\n" + "R" + totalDate;
                                DeladdNextRow(i1+1, "PRODUCT", checkArrP[i1], "REMOVEDfrom", checkArrL[i1],deldate );
                                // var myNextRow = i1+1+ "  <<<PRODUCT>>> " + checkArrP[i1] + "<<<REMOVED FROM>>>" + checkArrL[i1];

                                checkArrP[i1]="";
                                checkArrL[i1]="";
                                slot1 = null;
                                slot2 = null;
                            }//Else if it is in database{
                            //     DeladdNextRow(index, "PRODUCT", Productnamejoined, "REMOVEDfrom", Location , nowtime );
                            // }

                            // document.getElementById("table2").rows[i1+1].colSpan="4";
                            // document.getElementById("table2").rows[i1+1].innerHTML="THE ITEM IN THIS LOCATION HAS BEEN REMOVED";
                            // lotArr[i1]=[];
                            // removePackage(slot1[0], slot1[1], slot1[2])//.then(x1 => { console.log('removed success: ', x1) })
                            
                            // daction = "remove";
                            slot1 = slot2;
                            nextArr = slot1;
                            slot2 = null;
                        }
                        else {
                            slot1 = slot2;
                            nextArr = slot1;
                            slot2 = null;
                            // console.log('slot2: ', slot2)
                        }

                    }
                }else {
                    slot1 = slot2;
                    nextArr = slot1;
                    slot2 = null;
                    // console.log('slot2: ', slot2)
                }
                            

            }else if (slot1 !== null && slot2 == null && x!=="" && code!=="") {
                            // console.log('Location');
                            // alert('yes');
                            slot2 = code;
                            nextArr.push(slot2);
                            
                            // console.log('Adding to DB, slot1: ', slot1, ' Slot2: ', slot2);
                            //add new or update;
                            nextArr.unshift(index);
                            // alert(nextArr);
                            lotArr.push(nextArr);
                            var joined = nextArr[1] + nextArr[2] + nextArr[3];
                            checkArrP.push(joined);
                            checkArrL.push(nextArr[4]);
                            getTotalDate();
                            checkArrT.push(totalDate);
                            //updatePackage(nextArr[0], nextArr[1], nextArr[2], nextArr[3], nextArr[4], slot2).then(x1 => console.log("Successfully added or upsetted: ", x1));
                            addNextRow(nextArr[0], nextArr[1], nextArr[2], nextArr[3], nextArr[4],totalDate);
                            maintainHeight();
                            nextArr=[];
                            index=index+1;

                            document.getElementById("textarea").value="";
                            slot1 = null;
                            slot2 = null;
            }
            
            //End of code
            
            y=document.getElementById("textarea").value;
            // alert(z);
            document.getElementById("textarea").focus();
        
    }
};
document.getElementById("endscanbutton").onclick = function(){
    document.getElementById("onScan").style.display="none";
    document.getElementById("searchbutton").style.display="block";
    document.getElementById("savefile").style.display="block";
    document.getElementById("savefileexcel").style.display="block";
    document.getElementById("scanbutton").style.background="rgba(238, 240, 241, 0.96)";
    document.getElementById("scanbutton").style.color="rgba(19, 19, 19, 0.77)";
    enable();
    clearInterval(interval1);
    clearInterval(interval2);
};

var i=0;
var j=0;
var newArr=[4,'pewrer', 'pcaded', 'psvvff', 'lewdfwf'];
var textArray = [[1,'pewrer','ptryew', 'pcaded','lewdfwf'],[2,'pewrer', 'pcaded','pfeveev','lfefref'],[3,'psfvssv','pewrer', 'pcaded','ldffsw']];
textArray.push(newArr);


var x;
var z=" init";
var y = document.getElementById("textarea").value;
// function checkCode(){
    
//         // document.getElementById("textarea").value="324u76i3424768934525768962345768906234576890623547689";
//         x = document.getElementById("textarea").value;
//     }
// setTimeout(function(){ checkCode(); }, 3000);


setTimeout(function(){ getTRecordDate(); }, 3600000);

//check input continuously

// setTimeout(function(){ alert(myInput); }, 10000);


document.getElementById("head").onclick =function(){
        var newRow = textArray[i];
        numberLine=newRow[0];
        newProductline1=newRow[1];
        newProductline2=newRow[2];
        newProductline3=newRow[3];
        newLocation=newRow[4];
        addNextRow(numberLine, newProductline1, newProductline2, newProductline3, newLocation);
        maintainHeight();
        i=i+1;
        textArray.push(newArr);
        if(i==4){
            document.getElementById("table2").deleteRow(2);
            addNextRow(2 , 'Product', 'Product' , 'Product', 'Location');
        }

    // This is where you get the user input, saved in the "mytext" variable; do your processing
    
    // And the bot reply is saved in the "intendedReply" variable above
    
  
    //alert(height);
}