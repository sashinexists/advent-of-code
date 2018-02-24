function init(particles) {
	var distances = [];
	for (var i = 0; i<10000; i++) {
		for(var j = 0; j<particles.length; j++) {
			particles[j] = increment(particles[j]);
			if(i===9999) {
				distances[j] = absoluteDistance(particles[j]);
			}
		}
	}
	return findLowestIndexInArray(distances);
}

function findLowestIndexInArray(arr){
	var lowest = arr[0];
	var lowestIndex = 0;
	for(var i = 1; i<arr.length; i++) {
		if(arr[i]<lowest) {
			lowest = arr[i];
			lowestIndex = i;
		}
	}
	return lowestIndex;
}

function absoluteDistance(particle){
	return Math.abs(particle.p[0]) + Math.abs(particle.p[1]) + Math.abs(particle.p[2]);
}

function increment(particle) {
	for(var i = 0; i<3; i++) {
		particle.v[i] += particle.a[i];
		particle.p[i] += particle.v[i];
	}
	return particle;
}