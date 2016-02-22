function setup(){
	createCanvas(800,500);
	test = new Graph(20,20, 400,400,-2,2,-2,2,2);
	test.showBorder = true;
	test.x_offset = 30;
	test.y_offset = 30;
	
	var x = [-1,1,2,3,4,5,6,7,8,9,10,12,15,16,17,18];
	var y = [0,2,4,6,8,10,8,6,4,3,2,2,2,2,4,5];
	
	pArray = Graph.makeData(x,y);
	
	
	
	plot1 = new Plot(pArray,167,203,237,3);
	
	p1 = new Point(-2,-2);
	p2 = new Point(-1,0);
	p3 = new Point(1,1);
	p4 = new Point(2,2);
	
	pArray = [p1,p2,p3,p4];
	
	plot2 = new Plot(pArray,255,0,0,2);
	
	//test.addPlot(plot1);
	test.addPlot(plot2);
}
function draw(){
	//test code
	background(100);	
	test.drawBg();
	test.plotAll();
	
	 ellipse(test.origin.x,test.origin.y,20,20);
}
function mouseDragged(){
	//test.plots[0].getUser();
}
