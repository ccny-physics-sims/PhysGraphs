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
	this.resoloution = resoloution;
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
	
	this.x_offset = 0;
	this.y_offset = 0;
	
	//functional variables
	this.plots = [];
		
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
	}
	
	//set background color of graph
	fill(255);
	
	//draw base layer of graph
	rect(this.x_offset, this.y_offset, this.width, this.height);
	
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
	var xpix = dist(this.x_offset+this.width*0.1, this.y_offset+this.height*0.9, 
					this.x_offset+this.width*0.95, this.y_offset+this.height*0.9)/this.resoloution;
	var ypix = dist(this.x_offset+this.width*0.1, this.y_offset+this.height*0.9, 
					this.x_offset+this.width*0.1, this.y_offset+this.height*0.05)/this.resoloution;
	
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
	
};
