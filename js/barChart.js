//REFERENCE USED: Interactive Design and Visualizations by Scott Murray

var svgWidth = 500;                                                                 //determines width size of new svg
var svgHeight = 100;
var barPad = 1;																//determines height size of new svg 	



d3.json("http://www.sfu.ca/~hmaskell/iat335/movies_IMDB.json",function(error,data){
	if(error){
		console.log("There was an error")
	} else{	

//create an empty svg element and add it to the DOM
		var svg = d3.select("body")
			.append("svg")
			.attr("wdith", svgWidth)
			.attr("height",svgHeight);

//crate rects add to the existing svg		
		svg.selectAll("rect")
				.data(data)															// finds the amount of values in a dataset
				.enter()															//returns a placeholder for each point that does not have a data point
				.append("rect")														//inserts a "rect" into DOM for each of the values in the dataset																	
				.attr("x", function(d,i){											//assign x,y, width and height attributes to the rect
					return i * (svgWidth / data.length);
				})
				.attr("y", function(d){
					return svgHeight - (d *5);
				})																	
				.attr("width", svgWidth / data.length * barPad)
				.attr("height", function(d){
					return d.IMDB_Rating * 5; 
				});
					
				


/*d3.select ("body").selectAll("div")
	.data(data)
	.enter()
	.append("div")
	.attr("class", "bar")
	.style("height", function(d){
		var barHeight = d.IMDB_Rating * 4	
		return barHeight + "px";
		});*/
	}
});