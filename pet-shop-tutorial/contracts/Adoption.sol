pragma solidity ^0.4.17;

contract Adoption {

	// public array of size 16 of address objects
	// public variables have automatic getter methods
	address[16] public adopters;

	// Adopting a pet
	function adopt(uint petId) public returns (uint) {
		// validate that parameter is within range
		// require function acts as conditional if type of statement, 
		//	use as gatekeeper of sorts (rest of function won't continue if this fails)
	  	require(petId >= 0 && petId <= 15);

	  	// the require statement passed, add the address of the smart contract at the index of the pet ID in adopters
	  	adopters[petId] = msg.sender;

	  	// petId is returned as a confirmation that the function completed successfully
	  	return petId;
	}

	// Getter function to get entire 'adopters' array 
	// 	(public arrays include getters for single values but not whole array)
	// Retrieving the adopters
	function getAdopters() public view returns (address[16]) {
	  	return adopters;
	}
}