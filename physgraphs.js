/*ToDo:
 * -add equation class
 * -add user interativity for mouse [DONE]and touch [In progress...]
 * -fix scaling problems
 * 		-with resoloution
 * 		-with numbers and edging distances
 * -add a legend to the graph
 * -add other kinds of lines to draw the plot with
 * -trim out of bounds points and lines
 * */

//Declaration for a point object to be used when graphing.
function Point(x,y){
	//basic coordinate variables
	this.x = x;
	this.y = y;
}
Point.prototype.add = function(x,y){
	this.x += x;
	this.y += y;
};
//fixes the y choordinates to work with p5.js
Point.prototype.fixChoord = function(){
	if(this.y > 0){
		this.y = this.y*-1; //inverts the y axis so that positive is up not down
	}	
};
//inverts both choordinates
Point.prototype.invert = function(){
	this.y *= -1;
	this.x *= -1;
};
//convert choord to pixel position
Point.prototype.makePix = function(xoff, yoff, scalex, scaley){
	
	this.fixChoord();
	this.x = this.x*scalex+xoff;
	this.y = this.y*scaley+yoff;
	
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
Point.getPoint = function(p){
	var point = new Point(p.x,p.y);
	return point;
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
}
//regular plotting function
Plot.prototype.plot = function(graph){
	//drawMode("center"); <--need to check p5.js for proper syntax
	
	//set up the styles for what will be drawn
	fill(this.color);
	stroke(this.color);
	strokeWeight(this.weight);
	
	//draws the data points and the connecting lines
	for(var i = 0;i<this.data.length;i++){
		
		//if(i<this.data.length-1 && this.data[i+1].x <= graph.width && this.data[i+1].y <= graph.height){
			//draws the connecting lines, scaling the data so that it corresponds to our coordinate space
			line(this.data[i].x, this.data[i].y,
					this.data[i+1].x, this.data[i+1].y); 
		//}
		//draws the data points, with scaling and offset.
		//if(this.data[i].x <= graph.width && this.data[i+1].y <= graph.height){
			ellipse(this.data[i].x, this.data[i].y, 8, 8);	
		//}
		
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
Plot.prototype.fixChoord = function(xoff, yoff, scalex, scaley, origin){
	var p = Point.getPoint(origin);
	for(var i = 0;i<this.data.length;i++){
		this.data[i].fixChoord();
		p.add(this.data[i].x*scalex, this.data[i].y*scaley);
		this.data[i].x = p.x;
		this.data[i].y = p.y;
		p = Point.getPoint(origin);
	}
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
	
	/* bl = bottom left.
	 * this is used for determining correct positioning of graph coordinates.
	 * */				
	this.bl_pix = new Point(this.x_offset+this.width*0.1,
								this.y_offset+this.height*0.9);
	this.bl_val = new Point(this.x_min, this.y_min);
	this.bl_val.invert();
	
	
	this.xpix = dist(this.bl_pix.x, this.bl_pix.y, 
					this.x_offset+this.width*0.95, this.bl_pix.y)/this.resoloution; //xScale in pixels
	this.ypix = dist(this.bl_pix.x, this.bl_pix.y, 
					this.bl_pix.x, this.y_offset+this.height*0.05)/this.resoloution; //yScale in pixels
					
	this.xunit = dist(this.bl_pix.x, this.bl_pix.y, 
					this.x_offset+this.width*0.95, this.bl_pix.y)/(this.x_max-this.x_min); //xUnitScale 
	this.yunit = dist(this.bl_pix.x, this.bl_pix.y, 
					this.bl_pix.x, this.y_offset+this.height*0.05)/(this.y_max-this.y_min); //yUnitScale
	
	this.origin = Point.getPoint(this.bl_pix);
	this.origin.add(this.bl_val.x*this.xunit, this.bl_val.y*this.yunit);
	console.log(this.origin.x, this.origin.y);
	
		
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
	line(this.bl_pix.x, this.bl_pix.y, 
			this.x_offset+this.width*0.95, this.bl_pix.y) //x border
	line(this.bl_pix.x, this.bl_pix.y, 
			this.bl_pix.x, this.y_offset+this.height*0.05) //y border
	
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
		text(this.x_min, this.bl_pix.x, this.bl_pix.y+20);
	for(var i = 0; i < this.resoloution; i++){
		count += xdiff;
		pixCount += xpix;
		line(this.bl_pix.x + pixCount, this.bl_pix.y+5, 
				this.bl_pix.x + pixCount, this.y_offset+this.height*0.05);
		text((Math.round(10*count)/10).toString(), this.bl_pix.x + pixCount, this.bl_pix.y+20);		
	}
	
	//draw y values and vertical lines
	var count = this.y_min; //for counting intermediary values
	var pixCount = 0;
		//draw zero	
		text(this.y_min, this.bl_pix.x - 20, this.bl_pix.y);
	for(var i = 0; i < this.resoloution; i++){
		count += ydiff;
		pixCount += ypix;
		line(this.bl_pix.x - 5, this.bl_pix.y-pixCount, 
				this.x_offset+this.width*0.95, this.bl_pix.y-pixCount);
		text((Math.round(10*count)/10).toString(), this.bl_pix.x - 20, this.bl_pix.y-pixCount);		
	}
	
};
//plots all plots on this graph
Graph.prototype.plotAll = function(){
	for(var i = 0; i<this.plots.length;i++){		
		this.plots[i].plot(this);		
	}
};
//add a new plot to the graph.
Graph.prototype.addPlot = function(aplot){
	//var temp = this.getZeroes();
	aplot.fixChoord(this.bl_pix.x, 
						this.bl_pix.y, 
						this.xunit, 
						this.yunit,
						this.origin);
	this.plots.push(aplot);
};
//get the x and y zero.
Graph.prototype.getZeroes = function(){
	
};
//get pixel x and y values for a point in the graph.
Graph.prototype.getChoord = function(x, y){
	
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
Graph.makeUserPlot = function(x1, x2, resoloution){
	var finalArray = [];
	var templot = new Plot();
	var scale = (x2-x1)/resoloution;
	for(var i = 0;i<resoloution;i++){
		
	}
		
	return templot;
};
