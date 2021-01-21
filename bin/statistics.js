//graph values
const TemperatureThreshold = {min: 20, max: 50}
const TemperatureTitles = {x: "Date", y: "Degree Celsius °C"}
const PHThreshold = {min: 6, max: 8}
const PHTitles = {x: "Date", y: "PH Level"}
const ElectricThreshold = {min: 10, max: 30}
const ElectricTitles = {x: "Date", y: "Electric Conductivity mV"}
//check which graph radio is checked
const checkCheckedRadio = ()=>{
  const radioDiv = document.getElementById('radio-div')
  var htmlCollection = radioDiv.getElementsByTagName("input");
  console.log(htmlCollection)
  //you can't use filter on an htmlCollection must convert it into a normal array
  var radioButtonsArray = [...htmlCollection]
  var checkedRadio = radioButtonsArray.filter(radio => radio.checked)
  console.log("Checked radio button is :",checkedRadio[0].value)
  return checkedRadio[0].value
}
//assign data of graph based on radio check
const assingGraphData = (dataSet)=>{
 const checkedRadio =  checkCheckedRadio()
 if(checkedRadio == "Temperature"){
   return graph(dataSet,TemperatureThreshold,TemperatureTitles)
 }
  else if(checkedRadio == "PH"){
   return graph(dataSet,PHThreshold,PHTitles)
    
  }
  else if (checkedRadio == "ElectricConductivity"){
   return graph(dataSet,ElectricThreshold,ElectricTitles)
    
  }
}
//get the last and firt dates inside rects to get whatever data is less than them
const getDates = ()=>{
  const svg = d3.select("#svg-graph")
  const lastRectDate = svg.attr("max-date")
  const firstRectDate = svg.attr("min-date")
  console.log( "first rect value",firstRectDate,"last rect  value",lastRectDate)
  return {lastRectDate: lastRectDate , firstRectDate : firstRectDate}
}
//construct payload based on user choices
const constructPayload = (event)=>{
  var data = null;
  var dateObj = getDates();
   if(event.target.id == "previous-button"){
  //construct body of post
   data = {action : "previous" ,modelName: checkCheckedRadio() ,minDate : dateObj.firstRectDate, maxDate : dateObj.lastRectDate}
 }
  else if(event.target.id == "next-button"){
   data = {action : "next" , modelName: checkCheckedRadio()  ,minDate : dateObj.firstRectDate, maxDate : dateObj.lastRectDate}
    
  }
  else if(event.target.id == "last-button"){
   data = {action : "last" , modelName: checkCheckedRadio()  ,minDate : dateObj.firstRectDate, maxDate : dateObj.lastRectDate}
    
  }
  else if (event.target.id == "first-button"){
   data = {action : "first" , modelName: checkCheckedRadio()  ,minDate : dateObj.firstRectDate, maxDate : dateObj.lastRectDate}
    
  }
  console.log(data)
  return data;
  
}


//event handler for radio button
const handleChange = ()=>{
  let data = null;
  //construct payload
  data = {action : "radio" , modelName: checkCheckedRadio()  ,minDate : "", maxDate : ""}
  
  //create request
fetch('https://automated-vegetation-system.piemaker1.repl.co/api/exportData/', {
  method: 'POST', // or 'PUT'
  headers: {
    'Content-Type': 'application/json',
    
  },
  mode: 'cors',
  
  body: JSON.stringify(data),
})
.then(response => response.json())
.then(data => {
  console.log('Success:', data);
 //graph data 
  d3.select("#svg-graph").remove()
  const dataSet = data.map(x=> {return{value: x.value,date:new Date(Date.parse(x.date))}})
  //unhide any buttons from page buttons
  unhideButtons()
  //hide the next buttons
  nextButton.setAttribute("style","visibility: hidden")
  firstButton.setAttribute("style","visibility: hidden")
  //redraw graph
  assingGraphData(dataSet)
 
  
  
 
})
.catch((error) => {
  console.error('Error:', error);
});
}

//event handler for page buttons
const handlePageButton = (event)=>{

  let data = null;
  //construct payload
  data = constructPayload(event);
  
  //create request
fetch('https://automated-vegetation-system.piemaker1.repl.co/api/exportData/', {
  method: 'POST', // or 'PUT'
  headers: {
    'Content-Type': 'application/json',
    
  },
  mode: 'cors',
  
  body: JSON.stringify(data),
})
.then(response => response.json())
.then(data => {
  console.log('Success:', data);
 //graph data if there still any
if(data.length != 0){
  //unhide all buttons
  unhideButtons()
  d3.select("#svg-graph").remove()
  const dataSet = data.map(x=> {return{value: x.value,date:new Date(Date.parse(x.date))}})
  
  //redraw graph
  assingGraphData(dataSet)
  
  
  }
  else{
    //hide specified buttons if data has reached the end
    hideButtons(event)
  }
 
})
.catch((error) => {
  console.error('Error:', error);
});
 
}



//create event handler for page buttons
const previousButton = document.getElementById( "previous-button");
const nextButton = document.getElementById( "next-button");
const lastButton = document.getElementById( "last-button");
const firstButton = document.getElementById( "first-button");
previousButton.addEventListener('click',handlePageButton);
nextButton.addEventListener('click',handlePageButton);
lastButton.addEventListener('click',handlePageButton);
firstButton.addEventListener('click',handlePageButton);

//create event handler for radio buttons
const temperatureRadio = document.getElementById( "temperature-radio");
const phRadio = document.getElementById( "ph-radio");
const electricRadio = document.getElementById( "electric-radio");
temperatureRadio.addEventListener('change',handleChange);
phRadio.addEventListener('change',handleChange);
electricRadio.addEventListener('change',handleChange);

//the latest data is available by default so hide next and first buttons
nextButton.setAttribute("style","visibility: hidden")
firstButton.setAttribute("style","visibility: hidden")

const unhideButtons = ()=>{
const previousButton = document.getElementById( "previous-button");
const nextButton = document.getElementById( "next-button");
const lastButton = document.getElementById( "last-button");
const firstButton = document.getElementById( "first-button");
nextButton.setAttribute("style","visibility: visible")
firstButton.setAttribute("style","visibility: visible")
lastButton.setAttribute("style","visibility: visible")
previousButton.setAttribute("style","visibility: visible")
}
//hide/unhide buttons when response is []
const hideButtons = (event)=> {
const previousButton = document.getElementById( "previous-button");
const nextButton = document.getElementById( "next-button");
const lastButton = document.getElementById( "last-button");
const firstButton = document.getElementById( "first-button");
  if(event.target.id == "previous-button" || event.target.id == "last-button"){
        previousButton.setAttribute("style","visibility: hidden")
        lastButton.setAttribute("style","visibility: hidden")
  }
  else if(event.target.id == "next-button" || event.target.id == "first-button"){
    
          nextButton.setAttribute("style","visibility: hidden")
          firstButton.setAttribute("style","visibility: hidden")
  }
}






const graph = (dataSet,threshold,titles)=>{
  
  
  //color array
  const colorArr = ["#EBDA58","#2BED8A","#F15F46"]
  
  //svg intiallization  
const w = 1000;
const h = 550;
padding = 50;

  //get minimum/max values for x&y axes
const maxX =  d3.max(dataSet, (d)=> d.date);
const minX =  d3.min(dataSet, (d)=> d.date);
const maxY = d3.max(dataSet, d => d.value);
const minY = d3.min(dataSet, d => d.value);
 
 

  console.log("Maximum x value "+maxX);
  console.log("Minimum x value "+ minX);
  console.log("Maximum y value "+ maxY);
  console.log("Minimum t value "+ minY);
  
 
  //x & y scales
  const xScale = d3.scaleTime()
  .domain([minX,maxX])
  .range([2*padding,w-2*padding])

  const yScale = d3.scaleLinear()
  .domain([minY,maxY])
  .range([h-2*padding,2*padding])
  
  
const svg = d3.select("#svg")
.append("svg")
.attr("id","svgElement")
.attr("max-date",maxX)
.attr("min-date",minX)
.attr("id","svg-graph")
// .attr("width",w)
// .attr("height",h)
.attr("class","svg")
.attr("preserveAspectRatio", "xMinYMin meet")
 .attr("viewBox", `0 0 ${w} ${h}`)

  
const tooltip = d3.select("#svg")
.append("div")
.attr("id","tooltip")
.attr("class","tooltip")

  
  const mouseover = ()=>{
    tooltip.style("opacity",1)
   d3.select(event.target).style("fill", "#46413F");
  }
  const mousemove = ()=>{
 
    var date = new Date(d3.select(event.target).attr('data-date'))
    tooltip
    .style("top", (event.pageY-10)+"px")
    .style("left",(event.pageX+10)+"px") 
    .html(`${date.toLocaleDateString()} ${date.toLocaleTimeString()} <br/>
Value: ${d3.select(event.target).attr("data-value")} `)
    .attr("data-date",d3.select(event.target).attr('data-date'))
 
  }
  
  const fillColor = (d)=>{
    if(d < threshold.min){
    return colorArr[0]
  }
  else if  (d >= threshold.min && d <= threshold.max){
    return colorArr[1]
  }
  else {
    return colorArr[2]
  }
  }
  
  const mouseleave = ()=>{
    tooltip.style("opacity",0)
   d3.select(event.target).style("fill", fillColor(d3.select(event.target).attr("data-value")));
    
  }
  
 

svg.selectAll("rect.bar")
.data(dataSet)
.enter()
.append("rect")
.attr("width",(w-2*padding)/dataSet.length)
.attr("height",d=> h- yScale(d.value)-2*padding)
.attr("x",(d)=> xScale(d.date))
.attr("y",d => yScale(d.value))
.attr("class","bar")
.style("fill",d=>fillColor(d.value))
.attr("data-date",d => d.date)
.attr("data-value",d => d.value)
.on("mouseover", mouseover)
.on("mousemove", mousemove)
.on("mouseleave", mouseleave)

  
  
  

  
  const xAxis = d3.axisBottom(xScale)


svg.append("g")
    .attr("id","x-axis")
   .attr("transform", "translate(0, " + (h - 2*padding) + ")")
   .call(xAxis)
  .style("font-size","16px")
  
  const yAxis = d3.axisLeft(yScale);
  svg.append("g")
    .attr("id","y-axis")
.attr("transform",`translate(${2*padding},0)`)
.call(yAxis)
.style("font-size","16px")
  
 //axes text
  //y-axis
 svg.append("text")
  .attr("transform","translate(" + padding/2 + "," + h/2 + ") rotate(270)")
  .style("text-anchor","middle")
  .style("font-size","22px")
  .style("font-weight","bolder")
  .text(titles.y)



 svg.append("text")
  .attr("transform", "translate("+(w/2)+", " + (h - padding) + ")")
  .style("text-anchor","middle")
  .style("font-size","22px")
  .style("font-weight","bolder")
  .text(titles.x)

  
  //legend part
  const colorScale = d3.scaleLinear()
.domain([threshold.min,threshold.max])
.range([2*padding,4*padding])
 
  
   const legendScale = d3.scaleOrdinal()
.domain([0,threshold.min,threshold.max])
.range([2*padding,3*padding,4*padding])

  //legend axis
  const legendAxis = d3.axisBottom(legendScale)

 svg.append("g")
  .attr("transform", "translate(0, " + (h-padding/2 ) + ")")
    .call(legendAxis)
  .style("font-size","14px")
  .attr("text-anchor","right")
  
  const legend = svg.append("g")
  .attr("id","legend")
  .selectAll("rect.legend")
  .data(colorArr)
  .enter()
  .append("rect")
  .attr("x",(d,i)=> i*padding+2*padding)
  .attr("y",h - padding)
  .style("fill",d=> d)
  .attr("width",padding)
  .attr("height",padding/2)

  
}

//call graph method
const req = new XMLHttpRequest();
req.open("GET",'https://automated-vegetation-system.piemaker1.repl.co/api/exportData/',true);
req.send();
req.onload = function(){
  const json = JSON.parse(req.responseText);
  const dataSet = json.map(x=> {return{value: x.value,date:new Date(Date.parse(x.date))}})
  console.table(dataSet);
  assingGraphData(dataSet)
  }


