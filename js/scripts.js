d3.json("http://www.sfu.ca/~hmaskell/iat335/top-rated-movies-01.json",function(error,data){
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
				if (d.originalTitle == "The Shawshank Redemption"){
					return d.originalTitle+" "+d.imdbRating;
				}
				else if (d.originalTitle != ""){
					return d.originalTitle+" "+d.imdbRating;
				}
				else{
					return d.title+" "+d.imdbRating;
				}
			}
		);
		callMethods(data);
	}
});

function callMethods(dataset){
	var arrayLength = dataset.length;
	var max = findmaximum(dataset);
	var min = findminimum(dataset);
	var sum = findsum(dataset);
	var avg = findavg(sum, dataset.length);
	var count = findcount(dataset, "8.3");

	console.log("The final maximum rating is "+max);
	console.log("The minimum rating is "+min);
	console.log("The sum of all IMDB ratings is "+sum);
	console.log("The count of '8.3' ratings is "+count);
	console.log("The average rating is "+avg);
}

function findmaximum(data){
	var max = -1;
	for (var i=0; i<data.length; i++){
		if (data[i].imdbRating >= max){
			max = data[i].imdbRating;
			//console.log("The new maximum value is "+max);
		}
	}
	return max;
}

function findminimum(data){
	var min = 10000;
	for (var i=0; i<data.length; i++){
		if (data[i].imdbRating <= min){
			min = data[i].imdbRating;
			//console.log("The new minimum value is "+min);
		}
	}
	return min;
}


function findsum(data){
	var sum = 0;
	for (var i=0; i<data.length; i++){
		sum += data[i].imdbRating;
	}
	return sum;
}



function findavg(sum, length){
	var avg = sum/length;
	return avg;
}

function findcount(data, value){
	var count = 0;
	for (var i=0; i<data.length; i++){
		if (data[i].imdbRating == value){
			count++;
		}
	}
	return count;
} 
