pragma solidity ^0.4.17;

contract Rental {

	// public array of size 16 of address objects
	// public variables have automatic getter methods
	address[16] public renters;

	// Adopting a pet
	function rent(uint equipmentId) public returns (uint) {
		// validate that parameter is within range
		// require function acts as conditional if type of statement, 
		//	use as gatekeeper of sorts (rest of function won't continue if this fails)
	  	require(equipmentId >= 0 && equipmentId <= 15);

	  	// the require statement passed, add the address of the smart contract at the index of the equipmentId in renters
	  	renters[equipmentId] = msg.sender;

	  	// equipmentId is returned as a confirmation that the function completed successfully
	  	return equipmentId;
	}

	// Getter function to get entire 'renters' array 
	// 	(public arrays include getters for single values but not whole array)
	// Retrieving the renters
	function getRenters() public view returns (address[16]) {
	  	return renters;
	}
}