//Declaration for a point object to be used when graphing.
function Point(x,y){
	this.x = x;
	this.y = y;
}

/*Declaration of plot object which will be graphed 
 * on graph object 
 * */
function Plot(pointArray, red, green, blue){
	this.data = pointArray;
	this.color = color(red, green, blue);
}

Plot.prototype.plot = function(){
	
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
	this.res = resoloution;
	this.x_min = x_min;
	this.x_max = x_max;
	this.y_min = y_min;
	this.y_max = y_max;
	
	
	//styling variables
	this.xlabel = "X-Axis";
	this.ylabel = "Y-Axis";
	this.showLabels = true;
	this.showBorder = true;
	this.borderWidth = 2;
	
	
	//functional variables
	this.plots = [];
		
}
//redraw background and plots
Graph.prototype.update = function(){
	
};
//draw the axis, labels, etc... (the graph without the curves)
Graph.prototype.drawBg = function(){
	
};
//plots all plots on this graph
Graph.prototype.plotAll = function(){
	
};
