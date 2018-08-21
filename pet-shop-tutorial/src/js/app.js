App = {
  web3Provider: null,
  contracts: {},

  init: function() {
    // Load pets.
    $.getJSON('../equipment.json', function(data) {
      var equipmentRow = $('#equipmentRow');
      var equipmentTemplate = $('#equipmentTemplate');

      for (i = 0; i < data.length; i ++) {
        equipmentTemplate.find('.panel-title').text(data[i].name);
        equipmentTemplate.find('img').attr('src', data[i].picture);
        equipmentTemplate.find('.equipment-price').text(data[i].price);
        equipmentTemplate.find('.equipment-type').text(data[i].typeDesc);
        equipmentTemplate.find('.equipment-location').text(data[i].location);
        equipmentTemplate.find('.btn-rent').attr('data-id', data[i].id);

        equipmentRow.append(equipmentTemplate.html());
      }
    });

    return App.initWeb3();
  },

  initWeb3: function() {
    // Is there an injected web3 instance? (ETH browsers like Mist or Chrome w/MetaMask create own web3 instances we'll use)
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider;
    } else {
      // If no injected web3 instance is detected, fall back to Ganache
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
    }
    web3 = new Web3(App.web3Provider);

    return App.initContract();
  },

  initContract: function() {
    $.getJSON('Rental.json', function(data) {
      // Get the necessary contract artifact file and instantiate it with truffle-contract in callback
      var RentalArtifact = data;
      App.contracts.Rental = TruffleContract(RentalArtifact);

      // Set the provider for our contract (set in initWeb3 function)
      App.contracts.Rental.setProvider(App.web3Provider);

      // Use our contract to retrieve and mark the rented equipment
      return App.markRented();
    });

    return App.bindEvents();
  },

  bindEvents: function() {
    $(document).on('click', '.btn-rent', App.handleRental);
  },

  markRented: function(renters, account) {
    var rentalInstance;

    App.contracts.Rental.deployed().then(function(instance) {
      rentalInstance = instance;
      // access deployed Rental contract and call getRenters
      // using call() allows for reading data from the blockchain without sending a full trnasaction, thereby saving gas
      return rentalInstance.getRenters.call();
    }).then(function(renters) {
      for (i = 0; i < renters.length; i++) {
        // renters array of addresses; when empty each address is an empty address
        if (renters[i] !== '0x0000000000000000000000000000000000000000') {
          // if equipment does not have empty address, it's been rented and mark it as such
          $('.panel-equipment').eq(i).find('button').text('Success').attr('disabled', true);
        }
      }
    }).catch(function(err) {
      console.log(err.message);
    });
  },

  handleRental: function(event) {
    event.preventDefault();

    var equipmentId = parseInt($(event.target).data('id'));

    var rentalInstance;

    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }
      // get first account address
      var account = accounts[0];

      App.contracts.Rental.deployed().then(function(instance) {
        rentalInstance = instance;

        // Execute rent as a transaction by sending account from above
        return rentalInstance.rent(equipmentId, {from: account});
      }).then(function(result) {
        // transaction successful, call markRented to update interface
        return App.markRented();
      }).catch(function(err) {
        console.log(err.message);
      });
    });
  }

};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
