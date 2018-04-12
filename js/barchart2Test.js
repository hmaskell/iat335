function drawBarChart(){

	var w = 600;
	var h = 250;
				
	var margin = {top: 0, right: 0, bottom: 0, left: 0},
	    width = 1000 - margin.left - margin.right,
	    height = 1000 - margin.top - margin.bottom;
	    // width =+svg.attr("width") - margin.left - margin.right.
	    // width =+svg.attr("height") - margin.top - margin.bottom;

	var xScale = d3.scaleBand()
					.range([0,width])
					.padding(0.1);

	var yScale = d3.scaleLinear()
					.range([height,0]);
				
	//Create SVG element
	var svg2 = d3.select("#area2")
				.append("svg")
				.attr("width", width + margin.left + margin.right)
				.attr("height", height + margin.top + margin.bottom)
				.append("g")
				.attr("transform", "translate(" + margin.left + "," + margin.top +")");

	d3.json("data/stats-movies-clean.json",function(error,statsdata){
		d3.json("data/capitol-movies-clean.json",function(error,capitoldata){
		if(error){
			console.log("There was an error")
		} else{	

				capitoldata.forEach(function(d){
					d["US_Gross"] = +d["US_Gross"];
				});

				var combinedData = {};
					statsdata.forEach( function(element){
						var source = element.Source;
						if (!(source in combinedData)){
							var title_array = [];
							statsdata.forEach( function(source_element){
								if (source == source_element.Source){
									var title = source_element.Title;
									title_array.push(title);
								}
							});						

							var us_gross_avg;
							var us_gross_array = [];
							capitoldata.forEach(function(gross_element){
								if (title_array.includes(gross_element.Title)){
									us_gross_array.push(gross_element.US_Gross);
								}
							});
							us_gross_avg = d3.mean(us_gross_array);
							combinedData[source] = {
								title : title_array,
								us_gross : us_gross_avg
							}
						}
					})
					console.log(combinedData);	

				xScale.domain(statsdata.map(function(d){return d["Source"]}))
	 			yScale.domain([0, d3.max(capitoldata, function(d) { return d["US_Gross"]; })]);

	 			console.log( d3.keys(combinedData).map( key => combinedData[key]["us_gross"] ) )

				//Create bars
				svg2.selectAll(".bar")
				   .data(d3.keys(combinedData))
				   .enter()
				   .append("rect")
				   .attr("class", "bar")
				   .attr("x", function(d) {
				   		return xScale(d);
				   })
				   .attr("width", xScale.bandwidth())

				   .attr("y", function(d) {
				   		return yScale(combinedData[d]["us_gross"]);
				   })
				   .attr("height", function(d) {
				   		return height- yScale(combinedData[d]["us_gross"]);
				   });

				    // add the x Axis
					  svg2.append("g")
					      .attr("transform", "translate(0," + height + ")")
					      .call(d3.axisBottom(xScale));

					  // add the y Axis
					  svg2.append("g")
					      .call(d3.axisLeft(yScale));
								
				  

				//Create labels
				// svg2.selectAll("text")
				//    .data(statsdata)
				//    .enter()
				//    .append("text")
				//    .text(function(d) {
				//    		return "Source";
				//    })
				//    .attr("text-anchor", "middle")
				//    .attr("x", function(d, i) {
				//    		return xScale(i) + xScale.bandwidth() / 2;
				//    })
				//    .attr("y", function(d) {
				//    		return h - yScale(d) + 14;
				//    })
				//    .attr("font-family", "sans-serif")
				//    .attr("font-size", "11px")

				//    .attr("fill", "black");
				
		}
	})
	})
}
