/*ToDo:
 * -add function to point class to generate an array of points from
 * seperate arrays of x and y choords
 * -add equation class
 * -add user interativity for mouse and touch
 * -fix scaling problems
 * 		-with resoloution
 * 		-with numbers and edging distances
 * -add a legend to the graph
 * -add other kinds of lines to draw the plot with
 * -add 
 * */

//Declaration for a point object to be used when graphing.
function Point(x,y){
	this.x = x;
	this.y = y;
}
//fixes the y choordinates to work with p5.js
Point.prototype.fixChoord = function(){
	if(this.y > 0){
		this.y = this.y*-1;
	}	
};
//this might make more sense to put as part of the Plot object
Point.makeData = function(xarray, yarray){
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


//a function object for graphing functions
function Equation(){

}

/*Declaration of plot object which will be graphed 
 * on graph object 
 * */
function Plot(pointArray, red, green, blue, weight){
	this.data = pointArray;
	this.color = color(red, green, blue);
	this.weight = weight;
}

Plot.prototype.plot = function(xoff, yoff, scalex, scaley){
	//drawMode("center");
	fill(this.color);
	stroke(this.color);
	strokeWeight(this.weight);
	for(var i = 0;i<this.data.length;i++){
		this.data[i].fixChoord();
		if(i<this.data.length-1){
			line(this.data[i].x*scalex+xoff, this.data[i].y*scaley+yoff,
					this.data[i+1].x*scalex+xoff, this.data[i+1].y*scaley+yoff);
		}
		ellipse(this.data[i].x*scalex+xoff, this.data[i].y*scaley+yoff, 8, 8);
	}
};

//updates data to user input
Plot.prototype.getUser = function(){
	
};

//gets distance between two points of data
Plot.prototype.getPointDist = function(num1, num2){
	return dist(this.data[num1].x, this.data[num1].y, 
				this.data[num2].x, this.data[num2].y);
};

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
		//line(this.x_offset, this.y_offset, this.width, this.y_offset);
		//line(this.x_offset, this.y_offset, this.x_offset, this.height);
		//line(this.x_offset, this.height, this.width, this.height);
		//line(this.width, this.y_offset, this.width, this.height);
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
		this.plots[i].plot(this.x_offset+this.width*0.1, this.y_offset+this.height*0.9, this.xunit, this.yunit);
	}
};
//add a new plot to the graph.
Graph.prototype.addPlot = function(aplot){
	this.plots.push(aplot);
};
