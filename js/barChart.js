var w = 600;
var h = 250;
			
	//var dataset = [11, 15, 20, 18, 17, 16, 18, 25, 10, 13, 19, 21, 25, 22, 18, 5, 13, ];

d3.json("http://www.sfu.ca/~hmaskell/iat335/stats-movies-clean",function(error,statsdata){
	d3.json("http://www.sfu.ca/~hmaskell/iat335/capitol-movies-clean",function(error,capitoldata){
	if(error){
		console.log("There was an error")
	} else{	

			var xScale = d3.scaleBand()
							.domain(d3.range(dataset.length))
							.rangeRound([0, w])
							.paddingInner(0.05);

			var yScale = d3.scaleLinear()
							.domain([0, d3.max(dataset)])
							.range([0, h]);
			
			//Create SVG element
			var svg = d3.select("#area2")
						.append("svg")
						.attr("width", w)
						.attr("height", h);

			//Create bars
			svg.selectAll("rect")
			   .data(dataset)
			   .enter()
			   .append("rect")
			   .attr("x", function(d, i) {
			   		return xScale(i);
			   })
			   .attr("y", function(d) {
			   		return h - yScale(d);
			   })
			   .attr("width", xScale.bandwidth())
			   .attr("height", function(d) {
			   		return yScale(d);
			   })
			   .attr("fill", function(d) {
					return "rgb(0, 0, " + Math.round(d * 10) + ")";
			   })
			  
			//Create labels
			svg.selectAll("text")
			   .data(dataset)
			   .enter()
			   .append("text")
			   .text(function(d) {
			   		return "Source";
			   })
			   .attr("text-anchor", "middle")
			   .attr("x", function(d, i) {
			   		return xScale(i) + xScale.bandwidth() / 2;
			   })
			   .attr("y", function(d) {
			   		return h - yScale(d) + 14;
			   })
			   .attr("font-family", "sans-serif")
			   .attr("font-size", "11px")

			   .attr("fill", "black");
			
	}
})
})

