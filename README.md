# PhysGraphs
A basic plotting and graphing object.

## Dependencies
This requires the Processing.js library (p5.js) which can be found here http://p5js.org/download/

A CDN for p5.js is https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.4.21/p5.js

##Overview
This library works by declaring a graphing object. Then you can create plot objects and plot them on the graph.

## Declaring a Graph object
To declare a graph, type 
```javascript
var *name* = new Graph(width, height, x_min, x_max, y_min, y_max, resoloution);
```   

**Declaration Attributes**
+ width = the width of the graphing frame.
+ height = the height of the graphing frame.
+ x_min/x_max = the x range on the graph. (numbers that will show up in the graph when plotted)
+ y_min/y_max = the y range on the graph. (numbers that will show up in the graph when plotted)
+ resoloution = how many subdivisions there will be in each of the ranges. As of now the x and y ranges will have the same resoloution.


## Creating a plot
A plot is a collection of point objects. There are two ways to declare a plot. The first way is to manually create an array of point objects and then adding them to a plot object in its declaration statement.   

**An example of a plot of x^2:**  
```javascript
var p1 = new Point(0,0);  
var p2 = new Point(1,1); 
var p3 = new Point(2,4);
var p4 = new Point(3,9);  
var point_array = [p1,p2,p3,p4];  
var plot1 = new Plot(point_array, 255, 0, 0, 2);
```  
This will create a plot of x^2 that is red and has a stroke weight of 2.

The Second way to declare a plot is to use the function 
```javascript  
Graph.makeData(x_array, y_array);
```
. Which returns an array of points from two arrays of x and y coordinates.

**An example of a plot of x^2:**  
```javascript
var xarray = [0,1,2,3];  
var yarray = [0,1,4,9];
var point_array = Graph.makeData(xarray, yarray);  
var plot1 = new Plot(point_array, 255, 0, 0, 2);
```   
This will create the same plot as in the previous example.

## Drawing the plot on the graph

To make the plot show up in the view window you have to add the plot to the graph and then use the graphs plotting commands.

**For Example:**  
```javascript
var graph1 = new Graph(500,500,0,10,0,10,5);  
graph1.addPlot(plot1); //plot1 is the plot created in the previous example
```  

Then in the draw function use the following:  
```javascript  
graph1.drawBg();  
graph1.plotAll();
```
This will plot the following:  
![alt text](download.png "graph1")

**note** - the graph.drawBg() function can take the following parameters graph.drawBg(bgfill, border) which are both p5.js color(r,g,b) objects. By default the background will be white and the border will be black.

## Additional Types of Plots
There are two additional types of behavior that you can have your graph do; user input controlled and a timeplot.

### A User Graph
To declare a user plot you can either use an existing plot or auto generate a straight plot of zero values with the Graph.makeUserPlot() function:

**Example:**
```javascript
plot3 = Graph.makeUserPlot(0,100,100,color(0,0,0),1,3);
```
The function Graph.makeUserPlot(xstart, xfinish, resoloution, color, weight, psize) has the following arguments
+ xstart: the position on the x-axis where you would like the generated plot to start from.
+ xfinish: the position on the x-axis where you would like the generated plot to finish.
+ resoloution: how many subdivisions there should be between the values of xstart and xfinish.
+ color: a color(r,g,b) object from the p5.js library. This is the color that the generated plot will be.
+ weight: the thickness of the lines used for the generated plot. (0 means there will be no lines drawn just points).
+ psize:  the size of the data points drawn. (0 means that there will be no points drawn).

Either way, once you have the desired points on your plot that you want to manipulate the you must call getUser() in the mouseDragged() function.

**Example:**

```javascript
plot5 = Graph.makeUserPlot(0,100,100,200,200,0,1,3);
graph1.addPlot(plot5);

function mouseDragged(){
	graph1.plots[0].getUser();	
}
```

Again, don't forget to call graph1.drawBg() & graph1.plotAll() in the draw() function to see your graph.

### Timeplots
A timeplot captures data from a variable in your code and plots its value over time. To make a time plot just create a plot the usual way. Note-for the point array just use [] for the argument (see example). If you use other data it will just be overriden by the recorded data so there is not point. It will still run properly just starting with what ever values that you used. Then during the draw() function you can call the graph.tpRecord(variable, graph); to record the variable vs. time.
**Example:**

```javascript
//first declare your plot. Remember to leave the first argument as [].
plot4 = new Plot([],0,0,255,1);
graph1.addPlot(plot4);

//now during the draw function call these three functions
graph1.drawBg();
graph1.plotAll();
graph1.plots[0].tpRecord(*variable*,graph1); // This will capture the variable. 
											 //Use the index of your plot instead of 0 
											 //if it is not the first plot on the graph.
```
#### Adjusting the framerate of a timeplot. 

It is not possible to have a different framerate for each graph at the current moment. However to adjust the framerate you must do as follows:

```javascript
FR = ?; //desired framerate. FR is the global framerate constant.
frameRate(FR); //p5.js framerate adjustment function.
```

