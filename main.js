function setup(){
	createCanvas(800,500);
	test = new Graph(400,400,0,10,0,10,10);
	test.showBorder = true;
	test.x_offset = 20;
	test.y_offset = 20;
	
	var x = [0,1,2,3,4,5,6,7,8,9,10];
	var y = [0,2,4,6,8,10,8,6,4,3,2];
	
	pArray = Point.makeData(x,y);
	
	
	
	plot1 = new Plot(pArray,167,203,237,3);
	
	p1 = new Point(0,0);
	p2 = new Point(1,1);
	p3 = new Point(2,4);
	p4 = new Point(3,9);
	
	pArray = [p1,p2,p3,p4];
	
	plot2 = new Plot(pArray,56,139,0,2);
	test.addPlot(plot1);
	test.addPlot(plot2);
}
function draw(){
	//test code
	background(100);	
	test.drawBg();
	test.plotAll();
}
