pragma solidity ^0.4.17;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Rental.sol";

contract TestRental {
	// get address of smart contract we're testing
  	Rental rental = Rental(DeployedAddresses.Rental());

	// Testing the rent() function
	function testUserCanRentEquipt() public {
		uint returnedId = rental.rent(8);
		// adopt function returns the id that was passed in
		uint expected = 8;

		Assert.equal(returnedId, expected, "Rental of equipt ID 8 should be recorded.");
	}

	// Testing retrieval of a single pet's owner
	function testGetRenterAddressByEquiptId() public {
		// Expected owner is this contract
		address expected = this;

		address renter = rental.renters(8);

		Assert.equal(renter, expected, "Renter of equipt ID 8 should be recorded.");
	}

	// Testing retrieval of all pet owners
	function testGetRenterAddressByEquiptIdInArray() public {
		// Expected owner is this contract
		address expected = this;

		// Store adopters in memory rather than contract's storage
		address[16] memory renters = rental.getRenters();

		Assert.equal(renters[8], expected, "Renter of equipt ID 8 should be recorded.");
	}

}