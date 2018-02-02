d3.json("http://www.sfu.ca/~hmaskell/iat335/movies_IMDB.json",function(error,data){
	if(error){
		console.log(error);	
	}
	else{
		console.log(data);
		d3.select("body").selectAll("p")
			.data(data)
			.enter()
			.append("p")
			.text(function(d){
				if (d.Title != ""){
					return d.Title+" $"+d.US_Gross;
				}
				else{
					return d.Title+" $"+d.US_Gross;
				}
			}
		);
		callMethods(data);
	}
});

function callMethods(dataset){
	var arrayLength = dataset.length;
	var max = findmaximum(dataset, "Production_Budget");
	var min = findminimum(dataset, "IMDB_Rating");
	var sum = findsum(dataset, "Worldwide_Gross");
	var avg = findavg(findsum(dataset, "IMDB_Rating"), dataset.length);
	var count = findcount(dataset, "MPAA_Rating", "R");

	console.log("The maximum Production Budget is $"+max);
	console.log("The minimum IMDB rating is "+min);
	console.log("The sum of Worldwide Gross Income for all movies in the dataset is $"+sum);
	console.log("The count of all R rated movies in the dataset is "+count);
	console.log("The average IMDB rating is "+avg);
}

function findmaximum(data, dimension){
	var max = -1;
	for (var i=0; i<data.length; i++){
		if ((data[i][dimension] != null) && (data[i][dimension] >= max)){
			max = data[i][dimension];
			//console.log("The new maximum value is "+max);
		}
	}
	return max;
}

function findminimum(data, dimension){
	var min = 10000;
	for (var i=0; i<data.length; i++){
		if ((data[i][dimension] != null) && (data[i][dimension] < min)){
			min = data[i][dimension];
			console.log("The new minimum value is "+min);
		}
	}
	return min;
}


function findsum(data, dimension){
	var sum = 0;
	for (var i=0; i<data.length; i++){
		if (data[i][dimension] != null){
			sum += data[i][dimension];
		}
	}
	return sum;
}



function findavg(sum, length){
	var avg = "not yet calculated";
	if ((sum != null) && (length != null)){
		var avg = sum/length;
		avg = Math.round( avg * 10 ) / 10;
		/*reference: https://stackoverflow.com/questions/7342957/how-do-you-round-to-1-decimal-place-in-javascript*/
	}
	return avg;
}

function findcount(data, dimension, value){
	var count = 0;
	for (var i=0; i<data.length; i++){
		if (data[i][dimension] == value){
			count++;
		}
	}
	return count;
} 
