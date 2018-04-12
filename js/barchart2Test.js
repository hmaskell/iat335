var w = 600;
var h = 250;
			
	var dataset = [11, 15, 20, 18, 17, 16, 18, 25, 10, 13, 19, 21, 25, 22, 18, 5, 13, ];




var margin = {top: 0, right: 0, bottom: 0, left: 0},
    width = 600 - margin.left - margin.right,
    height = 1000 - margin.top - margin.bottom;


			var xScale = d3.scaleBand()
							.range([0,width])
							.padding(0.1);

			var yScale = d3.scaleLinear()
							.range([height,0]);
			
			//Create SVG element
			var svg = d3.select("#area2")
						.append("svg")
						.append("width",width + margin.left + margin.right)
						.attr("height", height + margin.top + margin.bottom)
						.append("g")
						.attr("transform", "translate(" + margin.left + "," + margin.top +")");

d3.json("http://www.sfu.ca/~hmaskell/iat335/stats-movies-clean",function(error,statsdata){
	d3.json("http://www.sfu.ca/~hmaskell/iat335/capitol-movies-clean",function(error,capitoldata){
	if(error){
		console.log("There was an error")
	} else{	

			capitoldata.forEach(function(d){
				d["US_Gross"] = +d["US_Gross"];
			});

			xScale.domain(statsdata.map(function(d){return d["Source"]}))
 			yScale.domain([0, d3.max(capitoldata, function(d) { return d["US_Gross"]; })]);

			//Create bars
			svg.selectAll(".bar")
			   .data(statsdata)
			   .enter()
			   .append("rect")
			   .attr("class", "bar")
			   .attr("xScale", function(d) {
			   		return xScale(d["Source"]);
			   })
			   .attr("width", xScale.bandwidth())
			   .data(capitoldata)
			   .attr("y", function(d) {
			   		return yScale(d["US_Gross"]);
			   })
			   .attr("height", function(d) {
			   		return height- yScale(d["US_Gross"]);
			   });

			    // add the x Axis
  svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(xScale));

  // add the y Axis
  svg.append("g")
      .call(d3.axisLeft(yScale));
			
			  

			//Create labels
			/*svg.selectAll("text")
			   .data(dataset)
			   .enter()
			   .append("text")
			   .text(function(d) {
			   		return "Source";
			   })
			   .attr("text-anchor", "middle")
			   .attr("xScale", function(d, i) {
			   		return xScale(i) + xScale.bandwidth() / 2;
			   })
			   .attr("y", function(d) {
			   		return h - yScale(d) + 14;
			   })
			   .attr("font-family", "sans-serif")
			   .attr("font-size", "11px")

			   .attr("fill", "black");*/
			
	}
})
})

