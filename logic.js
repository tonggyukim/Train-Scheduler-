var config = {
    apiKey: "AIzaSyCdnO9-no_RT-o8DGBwxc32CEW2V1ExmEc",
    authDomain: "trainscheduler-d593e.firebaseapp.com",
    databaseURL: "https://trainscheduler-d593e.firebaseio.com",
    projectId: "trainscheduler-d593e",
    storageBucket: "",
    messagingSenderId: "697540447507",
    appId: "1:697540447507:web:146dd91a010fb4758f9ee6"
};

firebase.initializeApp(config);

var trainData = firebase.database();

$("#addTrainBtn").on("click", function(){
    var trainName = $("#trainNameInput").val().trim();
    var destination = $("#destinationInput").val().trim();
    var firstTrain = moment($("#firstTrainInput").val().trim(),"HH.mm").subtract(10,"years").format("X");
    var frequency = $("#frequencyInput").val().trim();

var newTrain = {
    name: trainName,
    destination: destination,
    firstTrain: firstTrain,
    frequency: frequency
}

trainData.ref().push(newTrain);

alert("Train Added!");

$("#trainNameInput").val("");
$("#destinationInput").val("");
$("#firstTrainInput").val("");
$("#frequencyInput").val("");

return false; 

})

trainData.ref().on("child_added",function(snapshot){
    var name =snapshot.val().name;
    var destination = snapshot.val().destination;
    var frequency = snapshot.val().frequency;
    var firstTrain = snapshot.val().firstTrain;

    var remainder = moment().diff(moment.unix(firstTrain),"minutes")%frequency;
    var minutes = frequency - remainder;
    var arrival = moment().add(minutes,"m").format("hh:mm A");

    console.log(remainder);
    console.log(minutes);
    console.log(arrival);

$("#trainTable > tBody").append("<tr><td>"+name+"</td><td>"+destination+"</td><td>"+frequency
+"</td><td>"+arrival+"</td><td>"+minutes+"</td></tr>");
})