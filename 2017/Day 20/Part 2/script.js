function init(particles) {
	var distances = [];
	for (var i = 0; i<10000; i++) {
		for(var j = 0; j<particles.length; j++) {
			particles[j] = increment(particles[j]);
			particles = removeCollisions(particles)
		}
	}
	return particles.length;
}

function removeCollisions(particles){
	for (var i = 0; i<particles.length; i++) {
		for (var j = 0; j<particles.length; j++) {
			if(i!==j && hasCollided(particles[i], particles[j])) {
				collided = particles[i];
				particles.splice(i,1);
				particles.splice(particles.indexOf());
			}
		}
	}
	return particles;
}

function hasCollided(a, b) {
	return a.p[0]===b.p[0]&&a.p[1]===b.p[1]&&a.p[2]===b.p[2];
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