	d3.json("data/stats-movies-clean.json",function(error,statsdata){
		d3.json("data/capitol-movies-clean.json",function(error,capitoldata){
		if(error){
			console.log("There was an error")
		} else{					

				svg.selectAll("circle")
				// 	.data(capitoldata)
				// 	.enter()					
					.on("mouseover", function(d) {
						//Update the tooltip position and value
						d3.select("#tooltip")
							.select("#Title")
							.text(d["Title"])
							.select("#IMDB_R")
							.text(d["IMDB_Rating"])
							.select("#RT_R")
							.text(d["Rotten_Tomatoes_Rating"])
							.select("#Source")
							.text(d["Source"])
							.data(capitoldata)
							.select("#US_Gross")
							.text(d["US_Gross"]);