'use strict';
var data;
console.log(data);
var arrayData =[];
var userBeds = 0;

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

function setUserBeds(event){
  event.preventDefault();
  var inputBeds = document.getElementById('beds');
  console.log(inputBeds);
  userBeds = Number(inputBeds.value);
  selectSize(userBeds);
  budgetChart();
  fteChart();
  tallyBudget();
  tallyRedesign();
}

var formElement = document.getElementById('setBeds');
formElement.addEventListener('submit', setUserBeds);


var smallArray = [];
var medArray = [];
var largeArray = [];

Organization.prototype.groupOrganizations = function(){
  for(var i = 0; i < arrayData.length; i++){
    if(arrayData[i].beds < 300){
      smallArray.push(arrayData[i]);
    }else if((arrayData[i].beds >= 300) && (arrayData[i].beds <= 1000)){
      medArray.push(arrayData[i]);
    }else{
      largeArray.push(arrayData[i]);
    }
  }
};

Organization.prototype.groupOrganizations();

var arraySelector;
function selectSize(userBeds){
  if(userBeds < 300){
    arraySelector = smallArray;
  }else if ((userBeds >= 300) && (userBeds <= 1000)){
    arraySelector = medArray;
  }else{
    arraySelector = largeArray;
  }
  console.log(arraySelector);
}

function getData(propertyName){
  var answer = [];
  for(var i = 0; i < arraySelector.length; i++){
    answer[i] = arraySelector[i][propertyName];
  }
  console.log(answer);
  return answer;
}
function color(){
  var backgroundColor = [];
  for(var i = 0; i < arraySelector.length; i++){
    backgroundColor[i] = '#79242f';
  }
  return backgroundColor;
}

var budgetArray = [0,0,0,0,0,0];
function tallyBudget(){
  for(var i = 0; i < arraySelector.length; i++){
    if((arraySelector[i].budget === 'Unsure') || (arraySelector[i] === ' ') || (arraySelector[i].budget === '')){
      budgetArray[0] = budgetArray[0] + 1;
    }if(arraySelector[i].budget === 'Less than 20%'){
      budgetArray[1] = budgetArray[1] + 1;
    }if(arraySelector[i].budget === '20-40%'){
      budgetArray[2] = budgetArray[2] + 1;
    }if(arraySelector[i].budget === '40-60%'){
      budgetArray[3] = budgetArray[3] + 1;
    }if(arraySelector[i].budget === '60-80%'){
      budgetArray[4] = budgetArray[4] + 1;
    }if(arraySelector[i].budget === 'More than 80%'){
      budgetArray[5] = budgetArray[5] + 1;
    }
  }
}
var redesignArray = [0,0,0,0,0];
function tallyRedesign(){
  for(var i = 0; i < arraySelector.length; i++){
    if((arraySelector[i].redesign === 'Unsure') || (arraySelector[i].redesign === ' ') || (arraySelector[i].redesign === '')){
      redesignArray[0] = redesignArray[0] + 1;
    }if(arraySelector[i].redesign === 'No plans to redesign'){
      redesignArray[1] = redesignArray[1] + 1;
    }if(arraySelector[i].redesign === 'Planning'){
      redesignArray[2] = redesignArray[2] + 1;
    }if(arraySelector[i].redesign === 'In progress'){
      redesignArray[3] = redesignArray[3] + 1;
    }if(arraySelector[i].redesign === 'Recently completed'){
      redesignArray[4] = redesignArray[4] + 1;
    }
  }
}






function budgetChart(){

  var ctx = document.getElementById('myChart').getContext('2d');

  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: getData('beds'),
      datasets: [{
        label: 'Test',
        data: getData('investment'),
        backgroundColor: color(),
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}

// var scatterPlot;
function fteChart(){
  // var canvas = document.querySelector('canvas');
  var labels = [];
  var ftePerOrg = [];
  var numOfBeds = [];
  var scatterData = [];
  for (var i = 0; i < arraySelector.length; i++) {
    var fteNum = Number(arraySelector[i].fte);
    var bedsNum = Number(arraySelector[i].beds);
    // labels[i] = arraySelector[i].beds;
    ftePerOrg[i] = fteNum;
    numOfBeds[i] = bedsNum;

    scatterData[i] = {
      x: numOfBeds[i],
      y: ftePerOrg[i]

    };
  }

  // if(scatterPlot){
  //   scatterPlot.data.datasets[0].data = scatterData;
  //   scatterPlot.update();
  //   return;
  // }

  var ctx = document.getElementById('fteChart').getContext('2d');


  var scatterChart = new Chart(ctx, {
    type: 'scatter',
    data: {
      labels: labels,
      datasets: [{
        backgroundColor: 'rgba(180, 13, 23, 0.273)',
        data: scatterData,
        radius: 6

      }]
    },
    options: {
      scales: {
        xAxes: [{
          type: 'linear',
          position: 'bottom'
        }]
      }
    }
  });
}
