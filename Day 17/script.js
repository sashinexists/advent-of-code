function init(input){
	var spinlock = [0];
	var position = 1;
	for (var i = 1; i<50000000; i++) {
		spinlock = insert(i, spinlock, position);
		position = (position+input+1) % spinlock.length;
	}
	return spinlock[spinlock.indexOf(0)+1];
}


function insert(val, list, position) {
	return list.slice(0, position).concat(val).concat(list.slice(position, list.length));
}