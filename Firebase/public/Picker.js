var students = [], weightTotal = 0;
totalRolls = 7;
var rollQueue=[];

var rollOutput = document.getElementById("rollOutput");
var reRollBtn = document.getElementById("reRollBtn");
var rollNumber = document.getElementById("rollNumber");
var pickerDisplay = document.getElementById("pickerDisplay");
var beepboopDisplay = document.getElementById("beepboopDisplay");


var rollHistory=[];
let selectedStudent;
let storePicked;
let foundInactive=false;

students = 
//contentHolder
[
  { name: "James Kelly", weight: 2, count: 0, active:true },
  { name: "Sam White", weight: 5, count: 0, active:false },
  { name: "Justin Green", weight: 2, count: 0, active:true },
  { name: "Kelly Orange", weight: 1, count: 0, active:true }
];
console.log(students);
/*
var weightRules= function(){
//each of these 'if' chunks represents the class rules for diff size classes. contentHolder is array object containing all students in Firebase database

 if (contentHolder.length==1){
  contentHolder.forEach(function (element){
    if (element.type=="Active"){
    element.newWeight=1}
    else if (element.type=="VIP"){
    element.newWeight=1}
    else if (element.type=="New"){
    element.newWeight=1}
    })
}


else if (contentHolder.length>1 && contentHolder.length<4){
  contentHolder.forEach(function (element){
    if (element.type=="Active"){
    element.newWeight=1}
    else if (element.type=="VIP"){
    element.newWeight=5}
    else if (element.type=="New"){
    element.newWeight=3}
    })
}

else if (contentHolder.length>3 && contentHolder.length<8){
  contentHolder.forEach(function (element){
    if (element.type=="Active"){
    element.newWeight=1}
    else if (element.type=="VIP"){
    element.newWeight=4}
    else if (element.type=="New"){
    element.newWeight=2}
    })
}

else if (contentHolder.length>7 && contentHolder.length<11){
  contentHolder.forEach(function (element){
    if (element.type=="Active"){
    element.newWeight=1}
    else if (element.type=="VIP"){
    element.newWeight=5}
    else if (element.type=="New"){
    element.newWeight=3}
    })
}

else if (contentHolder.length>10 && contentHolder.length<14){
  contentHolder.forEach(function (element){
    if (element.type=="Active"){
    element.newWeight=0}
    else if (element.type=="VIP"){
    element.newWeight=5}
    else if (element.type=="New"){
    element.newWeight=2}
    })
}

}
setTimeout(weightRules, 2000);

//adds property to each student representing their starting scores
var studentScore= function(){
//neeed variable that poitns to current student.
//also, need to differentiate btwn next and current student
contentHolder.forEach(function (element){
  element.bien=0;
  element.muybien=0;
  element.perfecto=0;
})
}
setTimeout(studentScore, 2000);
*/
  
//pickOne is given the argument of 'students', in this context named 'pool'
  var pickOne = function (pool) {
    var key = 0;
    var selector = Math.random();
    while (selector > 0) {
      selector -= pool[key].distribution;
      key++;
    }
    // Because the selector was decremented before key was
    // incremented we need to decrement the key to get the
    // element that actually exited the loop.
    key--;

    return key;
  }

  var displayRollOutput= function(){
    rollOutput.innerHTML = "";

  for (i = 0; i < students.length; i++) {
    var newP = document.createElement("p");
    var newContent = document.createTextNode(
      students[i].name +
        ": Weight: " +
        students[i].weight +
        //students[i].newWeight +

        " - Count: " +
        students[i].count +
        "/" +
        totalRolls +
        " ("+ Math.round((students[i].count / totalRolls) * 100) +"%)"
      /*
        +
        "Bien: "+students[i].bien+
        "Muy Bien: "+students[i].muybien+
        "Perfecto: "+students[i].perfecto
        */
    );
    newP.appendChild(newContent);
    rollOutput.appendChild(newP);
  }
}

var displayPicker= function(){
  pickerDisplay.innerHTML = "";

  var newP1 = document.createElement("p");
 
  //selectedStudent=students[pickOne(students)];
  selectedStudent=rollQueue[0];
  rollQueue.shift();
  //this checks if the same student is about to be rolled twice in a row. will reroll until a diff student is picked
  /*
  while  (selectedStudent.name==rollHistory[rollHistory.length-1]){
    selectedStudent.name=students[pickOne(students)].name
    //console.log("double")
  } 
*/
  var newContent1 = document.createTextNode("Queue: "+
  selectedStudent.name+','+rollQueue.map(function (x){return x.name}));
  
  
  newP1.appendChild(newContent1);
 // rollHistory.push(selectedStudent);
  rollHistory.push(selectedStudent.name);

  pickerDisplay.appendChild(newP1);
  
  console.log(rollHistory);
 // console.log("Most recent roll was: "+rollHistory[rollHistory.length-1]+", then "+rollHistory[rollHistory.length-2]+", then "+rollHistory[rollHistory.length-3])
}

var displayBeepBoop=function(){
  beepboopDisplay.innerHTML = "";
  var newP2 = document.createElement("p");
 
  var newContent2 = document.createTextNode("Beepboop Student: "+
  selectedStudent.name);
  
  
  newP2.appendChild(newContent2);

  beepboopDisplay.appendChild(newP2);
}


var checkDoublePick= function(){
  //checks for twice in a row picked students
  while (storePicked==students.indexOf(rollQueue[0])){
    //console.log('found duplicate')
    storePicked=pickOne(students)
  }
}

var checkInactivePick= function(){
  while (students[storePicked].active==false){
    storePicked=pickOne(students)
  }
}

var checkInactive= function(){
  students.forEach((x)=>{
    if (x.active == false) {
        console.log('recognizes inactive1')
       // x.active=true;
        foundInactive=true
  }});
  return true}


var setQueue= function(){
  //this adds a property named count to the index for that student and 
  //increases it by one everytime the student is rolled
  //also adds each student to our rollQueue

if (checkInactive()){
      if (foundInactive==true && rollQueue.length==0){
        console.log('ran checkinactive')
        for (i = 0; i < totalRolls; i++) {

        storePicked=pickOne(students)
        checkInactivePick();
        //sometimes it skips the inactivepick
        checkDoublePick();

        students[storePicked].count++; 
        rollQueue.unshift(students[storePicked])

        //students[storePicked].active==true
        foundInactive=false
      }  
    }
  }

else if (rollQueue.length==0){
  console.log('ran elseif')

  for (i = 0; i < totalRolls; i++) {
    //students[pickOne(students)].count++;
    //note, pickOne returns index of students array
    storePicked=pickOne(students)

    checkInactivePick();
    checkDoublePick();

    students[storePicked].count++; 
    rollQueue.unshift(students[storePicked])
  }
}
}




var weightedRoll = function() {
  // Normalise Weights
  var weightTotal = 0;
  for (var i = 0; i < students.length; i++) {
    weightTotal += students[i].weight;
      //weightTotal += students[i].newWeight;
  }

  for (var i = 0; i < students.length; i++) {
  students[i].distribution = students[i].weight / weightTotal;
   //students[i].distribution = students[i].newWeight / weightTotal;
  } 

  setQueue();
  console.log(rollQueue)

  //console.log(pickOne(students)); //returns key for that run
  //console.log(students[pickOne(students)]); //returns object data for that run

  displayRollOutput();
  displayPicker();
};




//reroll button and rollnumber fields dont do anything, but will break code if u just delete them
reRollBtn.onclick = function(e) {
  e.preventDefault();
  weightedRoll();
};

rollNumber.onchange = function(e){
  totalRolls = this.value;
}


//this is initial run of weightedRoll function
setTimeout(weightedRoll, 2000);


rePickBtn.onclick = function(e) {
  e.preventDefault();
  weightedRoll();
  //console.log(selectedStudent)
};



bien.onclick= function(e){
  e.preventDefault();
  selectedStudent.bien++;
  weightedRoll();
}

muybien.onclick= function(e){
  e.preventDefault();
  selectedStudent.muybien++;
  weightedRoll();
}

perfecto.onclick= function(e){
  e.preventDefault();
  selectedStudent.perfecto++;
  weightedRoll();
}


////still working on the functionality of the beepboop button.
var testStudent={ name: "Sam White", weight: 2, count: 0 };
////mess around w beepboopstatus
beepboop.onclick= function(e){
  e.preventDefault();
  displayBeepBoop();
  selectedStudent.active=false
  weightedRoll()
//  weightedRoll();
}

