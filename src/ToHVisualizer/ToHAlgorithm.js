// Algorithm referenced from https://www.digitalocean.com/community/tutorials/tower-of-hanoi
export function towerOfHanoi(disk, fromRod, toRod, auxRod) {
	const animations = [];
	tohRun(disk, fromRod, toRod, auxRod, animations);
	return animations;
}

function tohRun(disk, fromRod, toRod, auxRod, animations) {
	if(disk === 0) return;

	tohRun(disk - 1, fromRod, auxRod, toRod, animations);
	
	const animation = {disk, fromRod, toRod};
	animations.push(animation);

	tohRun(disk - 1, auxRod, toRod, fromRod, animations);
}