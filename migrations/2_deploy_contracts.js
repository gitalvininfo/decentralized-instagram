var DecentralizedInstagram = artifacts.require("./DecentralizedInstagram.sol");

module.exports = function(deployer) {
  deployer.deploy(DecentralizedInstagram);
};
