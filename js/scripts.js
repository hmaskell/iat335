var dataset;
d3.json("http://www.sfu.ca/~hmaskell/iat335/top-rated-movies-01.json",function(error,data){
	if(error){
		console.log(error);	
	}
	else{
		console.log(data);
		dataset= data;
		d3.select("body").selectAll("p")
			.data(dataset)
			.enter()
			.append("p")
			.text(function(d){
				if (d.originalTitle != ""){
					return d.originalTitle+" "+d.imdbRating;
				}
				else{
					return d.title+" "+d.imdbRating;
				}
			}
		);
	}

	var arrayLength = data.length;
	var max = maximum(data);
	var min = minimum(data);
	var sum = sum(data);
	var avg = avg(sum, data.length);
	var count = count(data, "2");

	console.log("The maximum rating is "+max);
	console.log("The minimum rating is "+min);
	console.log("The sum of all IMDB ratings is "+sum);
	console.log("The count of '8.8' ratings is "+count);
	console.log("The average rating is "+avg);


	function maximum(data){
		var max = -1;
		for (var i=0; i<data.length; i++){
			if (data[i] >= max){
				max = data[i];
				//console.log("The new maximum value is "+max);
			}
		}
		return max;
	}

	function minimum(data){
		var min = 10000;
		for (var i=0; i<data.length; i++){
			if (data[i] <= min){
				min = data[i];
				//console.log("The new minimum value is "+min);
			}
		}
		return min;
	}


	function sum(data){
		var sum = 0;
		for (var i=0; i<data.length; i++){
			sum += data[i];
		}
		return sum;
	}



	function avg(sum, length){
		var avg = sum/length;
		return avg;
	}

	function count(data, value){
		var count = 0;
		for (var i=0; i<data.length; i++){
			if (data[i] == value){
				count++;
			}
		}
		return count;
	} 

});
