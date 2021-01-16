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
  else if  (d > threshold.min && d < threshold.max){
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
  .style("text-decoration","underline")
  .text(titles.y)



 svg.append("text")
  .attr("transform", "translate("+(w/2)+", " + (h - padding) + ")")
  .style("text-anchor","middle")
  .style("font-size","22px")
  .style("text-decoration","underline")
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
req.open("GET",'https://automated-vegetation-system.piemaker1.repl.co/api/exportData/temperature',true);
req.send();
req.onload = function(){
  const json = JSON.parse(req.responseText);
  const dataSet = json.map(x=> {return{value: x.value,date:new Date(Date.parse(x.date))}})
  console.table(dataSet);
  graph(dataSet,{min:15, max:60},{x:"Date",y:"Values"})

  }



//event handler for prev/next buttons
const handleClick = (event)=>{

  //todo know why rects order is reversed
  //get the last and firt dates inside rects to get whatever data is less than them
  const svg = d3.select("svg")
 const lastRectDate = svg.attr("max-date")
  const firstRectDate = svg.attr("min-date")
  console.log( "first rect value",firstRectDate,"last rect value",lastRectDate)
  let data = null;
  //check which button is clicked
  if(event.target.id == "previous-button"){
  //construct body of post
   data = {action : "previous" ,minDate : firstRectDate, maxDate : lastRectDate}
 }
  else if(event.target.id == "next-button"){
   data = {action : "next" ,minDate : firstRectDate, maxDate : lastRectDate}
    
  }
  else if(event.target.id == "last-button"){
   data = {action : "last" ,minDate : firstRectDate, maxDate : lastRectDate}
    
  }
  else if (event.target.id == "first-button"){
   data = {action : "first" ,minDate : firstRectDate, maxDate : lastRectDate}
    
  }

  
  //create request
fetch('https://automated-vegetation-system.piemaker1.repl.co/api/exportData/temperature', {
  method: 'POST', // or 'PUT'
  headers: {
    'Content-Type': 'application/json',
    
  },
  body: JSON.stringify(data),
})
.then(response => response.json())
.then(data => {
  console.log('Success:', data);
 //graph data if there still any
if(data.length != 0){
  unhideButtons()
  d3.select("svg").remove()
  const dataSet = data.map(x=> {return{value: x.value,date:new Date(Date.parse(x.date))}})
  
  //redraw graph
  graph(dataSet,{min:15, max:60},{x:"Date",y:"Values"})
  
  
  }
  else{
    hideButtons(event)
  }
 
})
.catch((error) => {
  console.error('Error:', error);
});
  
  
}

//create event handler for previous button
const previousButton = document.getElementById( "previous-button");
const nextButton = document.getElementById( "next-button");
const lastButton = document.getElementById( "last-button");
const firstButton = document.getElementById( "first-button");
previousButton.addEventListener('click',handleClick);
nextButton.addEventListener('click',handleClick);
lastButton.addEventListener('click',handleClick);
firstButton.addEventListener('click',handleClick);

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

