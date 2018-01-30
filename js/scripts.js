var data=[0,3,8,2,60,1,2,2];
var arrayLength = data.length;

var max = maximum(data);



var min = minimum(data);
/*
var sum = sum(input, reference);
var count = count(input, reference);
var avg = avg(sum, count);
*/

console.log("The final maximum value is "+max);


console.log("The minimum value is "+min);
/*
console.log("The sum of <insert specific input> is "+sum);
console.log("The count of <insert specific input> is "+count);
console.log("The average value is "+avg);
*/

function maximum(data){
	var max = -1;
	for (var i=0; i<arrayLength; i++){
		if (data[i] >= max){
			max = data[i];
			console.log("The new maximum value is "+max);
		}
	}
	return max;
}

function minimum(data){
	var min = 10000;
	for (var i=0; i<arrayLength; i++){
		if (data[i] <= min){
			min = data[i];
			console.log("The new minimum value is "+min);
		}
	}
	return min;
}

/*


function sum(var input_dimension, var reference_dimension){
	var sum = 0;
	if (input_dimension == reference_dimension){
		sum += input_dimension;
	}
	return sum;
}

function avg(var sum, var count){
	var avg = sum/count;
	return avg;
}

function count(var input_dimension, var reference_dimension){
	var count = 0;
	if (input_dimension == reference_dimension){
		count++;
	}
	return count;
} 
*/