//buttonset
	$('#buttons').buttonset()

//Call on click
	$('#buttons').on('change', function() {
	
// Get value of radio
		var year = $('input[name="buttons"]:checked').attr('id')
	
// Execute the buttons
	settings.xVar = 'mig_' + year
	settings.yVar = 'hom_' + year
	draw()
})

//Width and height settings
	var settings = {
		width:1200,
		height:500,
		radius:8,
		padding:60,
		xVar: "mig_2012",
		yVar: "hom_2012",
}

//Filter data
	console.log(data.length)
	var filterFunction = function(d) {
	console.log(d.hom_2012, d.hom_2012!==null)
	return d.hom_2012 !== null
}

	var data = data.filter(filterFunction)
	console.log(data.length)

//Scale-setting function
	var setScales=function() {

//Get min/max values for x
	xValues=data.map(function(d) {return Number(d[settings.xVar])})
	xMin=d3.min(xValues)
	xMax=d3.max(xValues)

// Using a function for y
	yMin = d3.min(data, function(d ){return Number(d[settings.yVar])})
	yMax = d3.max(data, function(d ){return Number(d[settings.yVar])})
  
// Define the xScale
	xScale = d3.scale.linear().domain([xMin, xMax]).range([settings.radius, settings.width - settings.radius])
	
// Define the yScale
	yScale = d3.scale.linear().domain([yMin, yMax]).range([settings.height - 2*settings.radius,2*settings.radius])
	
// Define the middleScale
	middleScale = d3.scale.linear().domain([yMin, yMax]).range([settings.height - 2*settings.radius,2*settings.radius])
	
// Define the xAxis
	xAxisFunction = d3.svg.axis()
	  .scale(xScale)
	  .orient('bottom')
	  .ticks(15);
	  
// Define the yAxis
	yAxisFunction = d3.svg.axis()
	  .scale(yScale)
	  .orient('left')
	  .ticks(15);
	  
// Define the middleAxis
	middleAxisFunction = d3.svg.axis()
	  .scale(yScale)
	  .orient('right')
	  .ticks(0);
	  
// Color scale
	colorScale = d3.scale.category10();
}  

// Function to build chart, appends axes, then calls the draw function for the circle elements
	var build = function() {
		// Set scales
			setScales();
	
// Append xAxis
	xAxis = d3.select('#scatter-svg').append('g').attr('class', 'axis axisTicks')
	  .attr('transform', 'translate(' + settings.padding + ','+ (settings.height + settings.padding) + ')')
	  .call(xAxisFunction);
	  
// Append yAxis
	yAxis = d3.select('#scatter-svg').append('g').attr('class', 'axis axisTicks')
	  .attr('transform', 'translate(' + (settings.padding + settings.radius) + ',' + (settings.padding + 2.3*settings.radius)+')')
	  .call(yAxisFunction);

// Append middleAxis
	middleAxis = d3.select('#scatter-svg').append('g').attr('class', 'axis')
	// .attr('transform', 'translate(' + (settings.padding + 47.5*settings.radius) + ',' + (settings.padding + 2.3*settings.radius)+')')
	  .attr('transform', 'translate(' + (xScale(0) + settings.padding) + ',' + (settings.padding + 2.3*settings.radius)+')')
	  .call(middleAxisFunction);
	  
// Append G in which to draw the plot
	plotG = d3.select('#scatter-svg').append('g').attr('transform', 'translate(' + (settings.padding) + ',' + (settings.padding)+ ')');
	
// Draw legend
	drawLegend();
	
// Draw axis labels
	drawAxisLabels();
	
//Create text that can move.  Because "<br>" does not work, each text block represents a separate line
	
	zeroText = d3.select('#scatter-svg').append("text")
	  .attr('transform', 'translate(' + (xScale(0)) + ',' + (1.3*settings.padding + 2.3*settings.radius)+')')
	  .attr("class", "legendWhite")
	  .text("Zero-Migration Axis")
	  
	sendingText = d3.select('#scatter-svg').append("text")
	  .attr('transform', 'translate(' + (xScale(-13)) + ',' + (2*settings.padding + 2.3*settings.radius)+')')
	  .attr("class", "netSending")
	  .text("Migrant-Sending Nations")

	negaText = d3.select('#scatter-svg').append("text")
	  .attr('transform', 'translate(' + (xScale(-13)) + ',' + (2.5*settings.padding + 2.3*settings.radius)+')')
	  .attr("class", "legendWhite")
	  .text("Negative number means")

	negbText = d3.select('#scatter-svg').append("text")
	  .attr('transform', 'translate(' + (xScale(-13)) + ',' + (2.5*settings.padding + 2.3*settings.radius)+')')
	  .attr("class", "legendWhite")
	  .text("human flow out.")	  

	receiveText = d3.select('#scatter-svg').append("text")
	  .attr('transform', 'translate(' + (xScale(10)) + ',' + (2*settings.padding + 2.3*settings.radius)+')')
	  .attr("class", "netReceiving")
	  .text("Migrant-Receiving Nations")

	posaText = d3.select('#scatter-svg').append("text")
	  .attr('transform', 'translate(' + (xScale(10)) + ',' + (2.5*settings.padding + 2.3*settings.radius)+')')
	  .attr("class", "legendWhite")
	  .text("Positive number means")
	  
	posbText = d3.select('#scatter-svg').append("text")
	  .attr('transform', 'translate(' + (xScale(10)) + ',' + (3*settings.padding + 2.3*settings.radius)+')')
	  .attr("class", "legendWhite")
	  .text("human flow in.")
	  
// Draw circles and axes
	draw();
}

// Transition text by taking zeroText and changing the x attribute to be set as the value of the xScale at 0 plus your padding 
	var drawMovingText = function() { 
		zeroText 
			.transition().duration(500) 
			.attr('transform', 'translate(' + (xScale(0)) + ',' + (1.3*settings.padding + 2.3*settings.radius)+')') 
				//.call(zeroText); 

		sendingText 
			.transition().duration(500) 
			.attr('transform', 'translate(' + (xScale(-13)) + ',' + (2*settings.padding + 2.3*settings.radius)+')') 
				//.call(sendingText); 

		negaText 
			.transition().duration(500) 
			.attr('transform', 'translate(' + (xScale(-13)) + ',' + (2.5*settings.padding + 2.3*settings.radius)+')') 
				//.call(negText);

		negbText 
			.transition().duration(500) 
			.attr('transform', 'translate(' + (xScale(-13)) + ',' + (3*settings.padding + 2.3*settings.radius)+')') 
				//.call(negText);

		receiveText 
			.transition().duration(500) 
			.attr('transform', 'translate(' + (xScale(10)) + ',' + (2*settings.padding + 2.3*settings.radius)+')') 
				//.call(receiveText); 

		posaText 
			.transition().duration(500) 
			.attr('transform', 'translate(' + (xScale(10)) + ',' + (2.5*settings.padding + 2.3*settings.radius)+')') 
				//.call(posText); 				
				
		posbText 
			.transition().duration(500) 
			.attr('transform', 'translate(' + (xScale(10)) + ',' + (3*settings.padding + 2.3*settings.radius)+')') 
				//.call(posText);
 } 


// Circle positioning function
	var circleFunc = function(circ) {
		circ
		.attr('cx', function(d) {return xScale(d[settings.xVar])})
		.attr('cy', function(d) {return yScale(d[settings.yVar])})
		.attr('r', settings.radius)
		.attr('fill', function(d) {
			console.log(d)
			if(d[settings.xVar] <=0) {
			return '#FF3366'
		}
			else {
			return '#A9F5F2'
		}
})
	.style('opacity', '.8')
} 

//Note to self: After experimenting, other nice colors include #A9F5F2 #FF0066 #FF7F50

// Draw function
	var draw = function() {
		// Set the scales
		setScales()
	
// Bind data
	var circles = plotG.selectAll('circle').data(data)
	
// Enter new elements
	circles.enter().append('circle').call(circleFunc)
	
// Exit elements that may have left
	circles.exit().remove()
	
// Transition all circles to new data
	plotG.selectAll('circle').transition().duration(500).call(circleFunc)
	
// Axes, including language to transition middle axis
	xAxis.call(xAxisFunction)
	yAxis.call(yAxisFunction)
	middleAxis
		.transition().duration(500)
		.attr('transform', 'translate(' + (xScale(0) + settings.padding) + ',' + (settings.padding + 2.3*settings.radius)+')')
		.call(middleAxisFunction);
		
	drawMovingText()
}	

// Draw axis labels
var drawAxisLabels = function() {
	// xAxisLabel
	xAxisLabel = d3.select('#scatter-svg').append('text').attr('class', 'axisText').attr('transform', 'translate(' + settings.width/5 + ',' + (settings.height + settings.padding*1.8) + ')').text('Net Migration, in 100,000 Increments (Immigrants - Emigrants)/100,000')
	
	// yAxisLabel
	yAxisLabel = d3.select('#scatter-svg').append('text').attr('class', 'axisText').attr('transform', 'translate(' + settings.padding/2.5 + ',' + (settings.height*1/1) + ') rotate(270)').text('Homicide Rate Per 100,000 of the Population')

	// title
	title = d3.select('#scatter-svg').append('text').attr('class', 'titleText').attr('transform', 'translate(' + settings.width/15 + ',' + (30) + ')').text('Evaluating the Association Between Violence and Net Migration')
}
// Legend function
	var drawLegend = function() {
		var xVar = []
		data.map(function(d) {
			if(xVar.indexOf(d.xVar) <= 0) xVar.push(d.xVar)
		})
	
// Append a legend G
	legendG = d3.select('#scatter-svg').append('g').attr('id', 'legendG').attr('transform', 'translate(' + (settings.width + 0.5*settings.padding) + ',' + settings.padding + ')')
	legendG.selectAll('text')
		.data(status)
		.enter().append('text')
		.text(function(d) {return d})
		.attr('transform', function(d,i) {return 'translate(0, ' + i*20 + ')'})
		.style('fill', function(d) {return colorScale(d)})
}

	  
// Call the draw function to make the visualization
	build()

// Create SVG element
	var svg = d3.select("#scatter-svg")

//Draw legend
	var legend = svg.append("g")
	  .attr("height", 800)
	  .attr("width", 800)
      .attr('transform', 'translate(600,10)')      

	legend.append("text")
      .attr("x", 630)
      .attr("y", 495)
	  .attr("width", 300)
	  .attr("height", 100)
	  .attr("class", "legendUSA")
	  .text("USA")
	  
// Append text at different coordinates of the screen.   
	legend.append("text")
      .attr("x", -450)
      .attr("y", 650)
	  .attr("width", 800)
	  .attr("height", 400)
	  .attr("class", "attribText")
	  .text("Data are estimates for five-year intervals.  Migration data is from the United Nations Population Division, World Population Prospects.")

// Append text at different coordinates of the screen.  
	legend.append("text")
      .attr("x", -450)
      .attr("y", 680)
	  .attr("width", 800)
	  .attr("height", 400)
	  .attr("class", "attribText")
	  .text("Homicide data is from the United Nations Office on Drugs and Crime's International Homicide Statistics database.")

// Append text at different coordinates of the screen.    
	legend.append("text")
      .attr("x", -450)
      .attr("y", 710)
	  .attr("width", 800)
	  .attr("height", 400)
	  .attr("class", "attribText")
	  .text("Homicide data includes killings by individuals, gangs and small armed groups.  Killings in armed conflict are not included.")

// Append text at different coordinates of the screen.      
	legend.append("text")
      .attr("x", 350)
      .attr("y", 8)
	  .attr("width", 800)
	  .attr("height", 400)
	  .attr("class", "rectText")
	  .text("Click on a button to choose a five-year interval.")
	  
// Append text at different coordinates of the screen.      
	legend.append("text")
      .attr("x", 350)
      .attr("y", 25)
	  .attr("width", 800)
	  .attr("height", 400)
	  .attr("class", "rectText")
	  .text("Hover on circle to see country name and data.")
	 
//Format numbers to three sig figs and use K for thousands, M for millions
	var formatter = d3.format('.3s')

//Hover
$('#scatter-svg circle').poshytip({
	alignTo: 'cursor', // Align to cursor
	followCursor: true, // follow cursor when it moves
	showTimeout: 0, // No fade in
	hideTimeout: 0,  // No fade out
	alignX: 'center', // X alignment
	alignY: 'inner-bottom', // Y alignment
	className: 'tip-twitter', // Class for styling
	offsetY: 10, // Offset vertically
	slide: false, // No slide animation
	content: function(d){
		var name = this.__data__.Country
		var homValue = (this.__data__[settings.yVar])
		var migValue = (this.__data__[settings.xVar])
		var text = name + '<br/>' + '  Net migration: ' + formatter(100000*migValue) + ' people ' + '<br/>' + '  Homicide rate: ' + homValue + ' per 100,000'
		return text
		
	}
})


	  
	  
	