function setup(){
	createCanvas(800,500);
	test = new Graph(400,400,0,20,0,20,10);
	test.showBorder = true;
	test.x_offset = 20;
	test.y_offset = 20;
}
function draw(){
	//test code
	background(100);	
	test.drawBg();
}
