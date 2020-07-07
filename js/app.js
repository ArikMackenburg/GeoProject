'use strict';
var data;
console.log(data);
var arrayData =[];
// var userBeds = 0;

function Organization(beds,fte,investment,budget,redesign){
  this.beds = beds;
  this.fte = fte;
  this.investment = investment;
  this.budget = budget;
  this.redesign = redesign;
  arrayData.push(this);
}

// var stringData = JSON.stringify(data);

for(var i = 0; i < data.length; i++){
  new Organization(data[i].beds, data[i].fte,data[i].investment,data[i].budget,data[i].redesign);
}

// function setUserBeds(event){
//   event.preventDefault();
//   var inputBeds = document.getElementById('beds');
//   console.log(inputBeds);
//   userBeds = Number(inputBeds.value);
// }

// var formElement = document.getElementById('setBeds');
// formElement.addEventListener('submit', setUserBeds);


var smallArray = [];
var medArray = [];
var largeArray = [];

Organization.prototype.groupOrganizations = function(){
  for(var i = 0; i < arrayData.length; i++){
    console.log(arrayData);
    if(this.beds < 500){
      smallArray.push(this.beds);
    }else if((this.beds >= 500) && (this.beds <= 1000)){
      medArray.push(this.beds);
    }else{
      largeArray.push(this.beds);
    }
  }
};

groupOrganizations();







// var scatterChart = new Chart(ctx, {
//   type: 'scatter',
//   data: {
//     datasets: [{
//       label: 'FTE Per Beds',
//       data: [{
//         x: -10,
//         y: 0
//       }, {
//         x: 0,
//         y: 10
//       }, {
//         x: 10,
//         y: 5
//       }]
//     }]
//   },
//   options: {
//     scales: {
//       xAxes: [{
//         type: 'linear',
//         position: 'bottom'
//       }]
//     }
//   }
// });
