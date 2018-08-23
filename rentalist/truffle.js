module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // for more about customizing your Truffle configuration!
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: 1 // Match any network id
    },
    live: {
   	  host: "127.0.0.1",
      port: 7546,
      network_id: 2 // Match any network id
    }
  }
};
