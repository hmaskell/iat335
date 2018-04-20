function drawBarChart(){

	var totalHeight = 800;
	var totalWidth = 1200;
				
	var margin = {top: 0, right: 0, bottom: 120, left: 160},
	    width = totalWidth - margin.left - margin.right,
	    height = totalHeight - margin.top - margin.bottom;
	    // width =+svg.attr("width") - margin.left - margin.right.
	    // width =+svg.attr("height") - margin.top - margin.bottom;

	var yScale = d3.scaleBand()
					.rangeRound([0,height])
					.padding(.6);

	var xScale = d3.scaleLinear()
					.rangeRound([0,width]);
				
	//Create SVG element
	var svg2 = d3.select("#area2")
				.append("svg")
				.attr("width", totalWidth)
				.attr("height", totalHeight)
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

				var sources = {
					"Original Screenplay": "screenplay",
					"Based on Book/Short Story": "book",
					"Based on Play": "play",
					"Based on Real Life Events": "life",
					"Based on Short Film": "short",
					"Based on Comic/Graphic Novel": "comic",
					"Remake": "remake",
					"Traditional/Legend/Fairytale": 'traditional',
					"Based on TV": "tv",
					"Compilation": "compilation",
					"Based on Musical/Opera": "musical",
					"Based on Game": "game",
					"Spin-Off": "spin-off",
					"Based on Factual Book/Article": "fact-book",
					"Based on Magazine Article": "magazine",
					"Disney Ride": "ride"
				};

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

				var dataArray = [];
				// [
				// 	{
				// 		source: "original",
				// 		us_gross: 12
				// 	}
				// ]
				d3.keys(combinedData).forEach( function(element){ //for each source
					dataArray.push(
					{
						source: element,
						us_gross: combinedData[element]["us_gross"]
					}
					);
				});
				console.log(dataArray);

				yScale.domain(statsdata.map(function(d){return d["Source"]}))
	 			xScale.domain([0, d3.max(dataArray, function(d) { return d["us_gross"]; })]);

				//Create bars
				svg2.selectAll(".bar")
				   .data(dataArray)
				   .enter()
				   .append("rect")
				   .attr("class", function(d){
				   	return "bar "+sources[d["source"]];
				   })
				   .attr("x", 0)
				   .attr("width", function(d){
					   	return xScale(d["us_gross"])
				   })

				   .attr("y", function(d) {
				   		return yScale(d["source"]);
				   })
				   .attr("height", yScale.bandwidth());
				   
				   var xAxis = d3.axisBottom(xScale).ticks(20, "s");
								
				  //create labels
				  svg2.append("g")
				  	  .attr("transform", "translate(0,"+height+")")
				  	  .call(xAxis);

				  var yAxis = d3.axisLeft(yScale);

				  //repositions y axis labels
				  svg2.append("g")
					  .attr("class", "yAxis")
				      .call(yAxis)
				  	  .selectAll("text")
				  	  .style("text-anchor", "end")
				  	  .attr("transform", "translate(-10,-8) rotate(-45)");

				     //creates an x axis label
				  svg2.append("text")
					.attr("transform", "translate(" + (width/2) + " ," +
														(height + margin.top+60) + ")")
					.style("text-anchor", "middle")
					.style("font-family", "Quicksand, sans-serif")
					.text("Average US Gross Income in USD");
				

				     //creates a y axis label
				  svg2.append("text")
					.attr("transform", "rotate(-90)")
					.attr("y", 0 - margin.left)
					.attr("x", 0 - (height/2))
					.attr("dy", "1em")
					.style("text-anchor", "middle")
					.style("font-family", "Quicksand, sans-serif")
					.text("Original Source of Inspiration");

				function sortBars(boop){
					var newSortedArray = dataArray.sort(boop);
					yScale.domain(newSortedArray.map(function(d){return d["source"]}))

				    svg2.selectAll(".bar")
				    .transition()
				  	.duration(500)
				  	.ease(d3.easeCubicOut)
			  	   
				    .attr("y", function(d) {
				   		return yScale(d["source"]);
				    }) 
				    console.log(svg2.select(".yAxis"))
				  	yAxis.scale(yScale);
				  	svg2.select(".yAxis")
				  	  .transition()
				  	  .duration(500)
				  	  .ease(d3.easeCubicOut)
				      .call(yAxis);
			    }

			    //buttons to sort barchart

				d3.select("#AZ_Toggle").on("click", function(){
					sortBars(function (a,b){
						return d3.ascending(a["source"],b["source"]);
					});
				})
				d3.select("#ZA_Toggle").on("click", function(){
					sortBars(function (a,b){
						return d3.descending(a["source"],b["source"]);
					});
				})
				d3.select("#Asc_Toggle").on("click", function(){
					sortBars(function (a,b){
						return d3.ascending(a["us_gross"],b["us_gross"]);
					});
				})
				d3.select("#Des_Toggle").on("click", function(){
					sortBars(function (a,b){
						return d3.descending(a["us_gross"],b["us_gross"]);
					});
				})

				//linking by class
				var screenplay_bool = true;
				var book_bool = true;
				var play_bool = true;
				var life_bool = true;
				var short_bool = true;
				var comic_bool = true;
				var remake_bool = true;
				var traditional_bool = true;
				var tv_bool = true;
				var compilation_bool = true;
				var musical_bool = true;
				var game_bool = true;
				var spinoff_bool = true;
				var factbook_bool = true;
				var magazine_bool = true;
				var ride_bool = true;

				d3.selectAll(".screenplay").on("click", function(){
					if (screenplay_bool == true) {
						screenplay_bool = false;
						return d3.selectAll(".screenplay").style("opacity", .2);
					}
					else{
						screenplay_bool = true;
						return d3.selectAll(".screenplay").style("opacity", 1);
					}
				})

				d3.selectAll(".book").on("click", function(){
					if (book_bool == true) {
						book_bool = false;
						return d3.selectAll(".book").style("opacity", .2);
					}
					else{
						book_bool = true;
						return d3.selectAll(".book").style("opacity", 1);
					}
				})

				d3.selectAll(".play").on("click", function(){
					if (play_bool == true) {
						play_bool = false;
						return d3.selectAll(".play").style("opacity", .2);
					}
					else{
						play_bool = true;
						return d3.selectAll(".play").style("opacity", 1);
					}
				})

				d3.selectAll(".life").on("click", function(){
					if (life_bool == true) {
						life_bool = false;
						return d3.selectAll(".life").style("opacity", .2);
					}
					else{
						life_bool = true;
						return d3.selectAll(".life").style("opacity", 1);
					}
				})

				d3.selectAll(".short").on("click", function(){
					if (short_bool == true) {
						short_bool = false;
						return d3.selectAll(".short").style("opacity", .2);
					}
					else{
						short_bool = true;
						return d3.selectAll(".short").style("opacity", 1);
					}
				})

				d3.selectAll(".comic").on("click", function(){
					if (comic_bool == true) {
						comic_bool = false;
						return d3.selectAll(".comic").style("opacity", .2);
					}
					else{
						comic_bool = true;
						return d3.selectAll(".comic").style("opacity", 1);
					}
				})

				d3.selectAll(".remake").on("click", function(){
					if (remake_bool == true) {
						remake_bool = false;
						return d3.selectAll(".remake").style("opacity", .2);
					}
					else{
						remake_bool = true;
						return d3.selectAll(".remake").style("opacity", 1);
					}
				})
				d3.selectAll(".traditional").on("click", function(){
					if (traditional_bool == true) {
						traditional_bool = false;
						return d3.selectAll(".traditional").style("opacity", .2);
					}
					else{
						traditional_bool = true;
						return d3.selectAll(".traditional").style("opacity", 1);
					}
				})

				d3.selectAll(".tv").on("click", function(){
					if (tv_bool == true) {
						tv_bool = false;
						return d3.selectAll(".tv").style("opacity", .2);
					}
					else{
						tv_bool = true;
						return d3.selectAll(".tv").style("opacity", 1);
					}
				})

				d3.selectAll(".compilation").on("click", function(){
					if (compilation_bool == true) {
						compilation_bool = false;
						return d3.selectAll(".compilation").style("opacity", .2);
					}
					else{
						compilation_bool = true;
						return d3.selectAll(".compilation").style("opacity", 1);
					}
				})

				d3.selectAll(".musical").on("click", function(){
					if (musical_bool == true) {
						musical_bool = false;
						return d3.selectAll(".musical").style("opacity", .2);
					}
					else{
						musical_bool = true;
						return d3.selectAll(".musical").style("opacity", 1);
					}
				})

				d3.selectAll(".game").on("click", function(){
					if (game_bool == true) {
						game_bool = false;
						return d3.selectAll(".game").style("opacity", .2);
					}
					else{
						game_bool = true;
						return d3.selectAll(".game").style("opacity", 1);
					}
				})

				d3.selectAll(".spin-off").on("click", function(){
					if (spinoff_bool == true) {
						spinoff_bool = false;
						return d3.selectAll(".spin-off").style("opacity", .2);
					}
					else{
						spinoff_bool = true;
						return d3.selectAll(".spin-off").style("opacity", 1);
					}
				})

				d3.selectAll(".fact-book").on("click", function(){
					if (factbook_bool == true) {
						factbook_bool = false;
						return d3.selectAll(".fact-book").style("opacity", .2);
					}
					else{
						factbook_bool = true;
						return d3.selectAll(".fact-book").style("opacity", 1);
					}
				})

				d3.selectAll(".magazine").on("click", function(){
					if (magazine_bool == true) {
						magazine_bool = false;
						return d3.selectAll(".magazine").style("opacity", .2);
					}
					else{
						magazine_bool = true;
						return d3.selectAll(".magazine").style("opacity", 1);
					}
				})

				d3.selectAll(".ride").on("click", function(){
					if (ride_bool == true) {
						ride_bool = false;
						return d3.selectAll(".ride").style("opacity", .2);
					}
					else{
						ride_bool = true;
						return d3.selectAll(".ride").style("opacity", 1);
					}
				})

				d3.selectAll(".All_Toggle").on("click", function(){
					screenplay_bool = true;
					book_bool = true;
					play_bool = true;
					life_bool = true;
					short_bool = true;
					comic_bool = true;
					remake_bool = true;
					traditional_bool = true;
					tv_bool = true;
					compilation_bool = true;
					musical_bool = true;
					game_bool = true;
					spinoff_bool = true;
					factbook_bool = true;
					magazine_bool = true;
					ride_bool = true;
						return d3.selectAll(".screenplay,.book,.play,.life,.short,.comic,.remake,.traditional,.tv,.compilation,.musical,.game,.spin-off,.fact-book,.magazine,.ride").style("opacity", 1);
				})

				d3.selectAll(".None_Toggle").on("click", function(){
					screenplay_bool = false;
					book_bool = false;
					play_bool = false;
					life_bool = false;
					short_bool = false;
					comic_bool = false;
					remake_bool = false;
					traditional_bool = false;
					tv_bool = false;
					compilation_bool = false;
					musical_bool = false;
					game_bool = false;
					spinoff_bool = false;
					factbook_bool = false;
					magazine_bool = false;
					ride_bool = false;
						return d3.selectAll(".screenplay,.book,.play,.life,.short,.comic,.remake,.traditional,.tv,.compilation,.musical,.game,.spin-off,.fact-book,.magazine,.ride").style("opacity", .2);
				})


		}
	})
	})
}
