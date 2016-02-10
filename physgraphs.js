/*ToDo:
 * -add function to point class to generate an array of points from
 * seperate arrays of x and y choords
 * -add equation class
 * -add user interativity for mouse [DONE]and touch [In progress...]
 * -fix scaling problems
 * 		-with resoloution
 * 		-with numbers and edging distances
 * -add a legend to the graph
 * -add other kinds of lines to draw the plot with
 * -simplify into a scale coords function. [DONE]
 * -trim out of bounds points and lines
 * */

//Declaration for a point object to be used when graphing.
function Point(x,y){
	//basic coordinate variables
	this.x = x;
	this.y = y;
}
//fixes the y choordinates to work with p5.js
Point.prototype.fixChoord = function(){
	if(this.y > 0){
		this.y = this.y*-1; //inverts the y axis so that positive is up not down
	}	
};
/*
 * input = takes in two point objects
 * output = returns a new point object 
 * whose x and y coords are the respective x and y distances.
 * (basically using the point object like a vector)*/
Point.getDist = function(p1,p2){
	var pFinal = new Point(0,0);
	pFinal.x = Math.abs(p1.x-p2.x); //gets the x distance between points
	pFinal.y = Math.abs(p1.y-p2.y); //gets the y distance between points
	return pFinal;
};
//a function object for graphing functions
function Equation(){
	//not implemented
}

/*Declaration of plot object which will be graphed 
 * on graph object 
 * */
function Plot(pointArray, red, green, blue, weight){
	this.data = pointArray; //plot data (an array of points)
	this.color = color(red, green, blue); //the color that the graph will be drawn in
	this.weight = weight; // a number for the stroke thickness of the graph
	
	this.user = false; // set true if you want the graph to get user input
	this.xfixed = false // this is set to true IFF it is a user graph and the x coords have been scaled already.
						// look at getUser() and userPlot() for more description
}
//regular plotting function
Plot.prototype.plot = function(){
	//drawMode("center"); <--need to check p5.js for proper syntax
	
	//set up the styles for what will be drawn
	fill(this.color);
	stroke(this.color);
	strokeWeight(this.weight);
	
	//draws the data points and the connecting lines
	for(var i = 0;i<this.data.length;i++){
		
		if(i<this.data.length-1){
			//draws the connecting lines, scaling the data so that it corresponds to our coordinate space
			line(this.data[i].x, this.data[i].y,
					this.data[i+1].x, this.data[i+1].y); 
		}
		//draws the data points, with scaling and offset.
		ellipse(this.data[i].x, this.data[i].y, 8, 8);
	}
};

//updates data to user input
Plot.prototype.getUser = function(){
	var d = new Point(0,0);
	var pmouse = new Point(mouseX,mouseY);
	var closest = 100000;
	var closestIndex = 0;
	for(var i=0;i<this.data.length;i++){
				
		d = Point.getDist(pmouse,this.data[i]);
		if(closest > d.x){
			closest = d.x;
			closestIndex = i; 
		}
	}
	this.data[closestIndex].y = mouseY;
};

//gets distance between two points of data
Plot.prototype.getPointDist = function(num1, num2){
	return dist(this.data[num1].x, this.data[num1].y, 
				this.data[num2].x, this.data[num2].y);
};
Plot.prototype.fixChoord = function(xoff, yoff, scalex, scaley){
	for(var i = 0;i<this.data.length;i++){
		this.data[i].fixChoord();
		this.data[i].x = this.data[i].x*scalex+xoff;
		this.data[i].y = this.data[i].y*scaley+yoff;
	}
}

function Graph(w, h, x_min, x_max, y_min, y_max, resoloution){
	
	// initial variables
	this.width = w;
	this.height = h;
	this.resoloution = resoloution;
	this.x_min = x_min;
	this.x_max = x_max;
	this.y_min = y_min;
	this.y_max = y_max;
	
	
	//styling variables
	this.title = "Title"
	this.xlabel = "X-Axis";
	this.ylabel = "Y-Axis";
	this.showLabels = true;
	this.showTitle = true;
	this.showBorder = true;
	this.borderWidth = 2;
	
	this.x_offset = 0;
	this.y_offset = 0;
	
	//functional variables
	this.plots = [];
	this.xpix = dist(this.x_offset+this.width*0.1, this.y_offset+this.height*0.9, 
					this.x_offset+this.width*0.95, this.y_offset+this.height*0.9)/this.resoloution; //xScale
	this.ypix = dist(this.x_offset+this.width*0.1, this.y_offset+this.height*0.9, 
					this.x_offset+this.width*0.1, this.y_offset+this.height*0.05)/this.resoloution; //yScale
					
	this.xunit = dist(this.x_offset+this.width*0.1, this.y_offset+this.height*0.9, 
					this.x_offset+this.width*0.95, this.y_offset+this.height*0.9)/(this.x_max-this.x_min); //xUnitScale
	this.yunit = dist(this.x_offset+this.width*0.1, this.y_offset+this.height*0.9, 
					this.x_offset+this.width*0.1, this.y_offset+this.height*0.05)/(this.y_max-this.y_min); //yUnitScale
					
	
		
}
//redraw background and plots
Graph.prototype.update = function(){
	
};
//draw the axis, labels, etc... (the graph without the curves)
Graph.prototype.drawBg = function(){
		
	//border
	if(this.showBorder == false){
		noStroke();
	}else{
		stroke(0);
		strokeWeight(this.borderWidth);
	}
	
	//set background color of graph
	fill(255);
	
	//draw base layer of graph
	rect(this.x_offset, this.y_offset, this.width, this.height);
	
	strokeWeight(1);
	
	//draw axis
	stroke(0);
	line(this.x_offset+this.width*0.1, this.y_offset+this.height*0.9, 
			this.x_offset+this.width*0.95, this.y_offset+this.height*0.9) //x border
	line(this.x_offset+this.width*0.1, this.y_offset+this.height*0.9, 
			this.x_offset+this.width*0.1, this.y_offset+this.height*0.05) //y border
	
	//compute resoloution values
	var xdiff = (this.x_max - this.x_min)/this.resoloution;
	var ydiff = (this.y_max - this.y_min)/this.resoloution;
	
	//compute pixel resoloution
	var xpix = this.xpix
	var ypix = this.ypix
	
	//draw x values and vertical lines
	fill(0);
	stroke(180);
	var count = this.x_min; //for counting intermediary values
	var pixCount = 0;
		//draw zero	
		text(this.x_min, this.x_offset+this.width*0.1, this.y_offset+this.height*0.9+20);
	for(var i = 0; i < this.resoloution; i++){
		count += xdiff;
		pixCount += xpix;
		line(this.x_offset+this.width*0.1 + pixCount, this.y_offset+this.height*0.9+5, 
				this.x_offset+this.width*0.1 + pixCount, this.y_offset+this.height*0.05);
		text(Math.round(count).toString(), this.x_offset+this.width*0.1 + pixCount, this.y_offset+this.height*0.9+20);		
	}
	
	//draw x values and vertical lines
	var count = this.y_min; //for counting intermediary values
	var pixCount = 0;
		//draw zero	
		text(this.y_min, this.x_offset+this.width*0.1 - 20, this.y_offset+this.height*0.9);
	for(var i = 0; i < this.resoloution; i++){
		count += ydiff;
		pixCount += ypix;
		line(this.x_offset+this.width*0.1 - 5, this.y_offset+this.height*0.9-pixCount, 
				this.x_offset+this.width*0.95, this.y_offset+this.height*0.9-pixCount);
		text(Math.round(count).toString(), this.x_offset+this.width*0.1 - 20, this.y_offset+this.height*0.9-pixCount);		
	}
	
};
//plots all plots on this graph
Graph.prototype.plotAll = function(){
	for(var i = 0; i<this.plots.length;i++){		
		this.plots[i].plot();		
	}
};
//add a new plot to the graph.
Graph.prototype.addPlot = function(aplot){
	aplot.fixChoord(this.x_offset+this.width*0.1, this.y_offset+this.height*0.9, this.xunit, this.yunit);
	this.plots.push(aplot);
};

//this might make more sense to put as part of the Plot object
Graph.makeData = function(xarray, yarray){
	var finalArray = [];
	if(xarray.length == yarray.length){
		for(var i = 0; i<xarray.length;i++){
			var p = new Point(xarray[i],yarray[i]);
			finalArray.push(p);
		}
	}
	else{
		console.log("xarray and yarray lengths differ.");
	}	
	return finalArray;
};

//this might make more sense to put as part of the Plot object
Graph.makeUserPlot = function(resoloution){
	var finalArray = [];
	//var templot = new Plot();
	//for(var i = 0;i<)	
	return templot;
};
