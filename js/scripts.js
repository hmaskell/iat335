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
		if (data[i].dimension >= max){
			max = data[i].dimension;
			//console.log("The new maximum value is "+max);
		}
	}
	return max;
}

function findminimum(data, dimension){
	var min = 10000;
	for (var i=0; i<data.length; i++){
		if (data[i].dimension <= min){
			min = data[i].dimension;
			//console.log("The new minimum value is "+min);
		}
	}
	return min;
}


function findsum(data, dimension){
	var sum = 0;
	for (var i=0; i<data.length; i++){
		sum += data[i].dimension;
	}
	return sum;
}



function findavg(sum, length){
	var avg = sum/length;
	return avg;
}

function findcount(data, dimension, value){
	var count = 0;
	for (var i=0; i<data.length; i++){
		if (data[i].dimension == value){
			count++;
		}
	}
	return count;
} 
