const { ethers, waffle } = require("hardhat");

module.exports.awaitInvoiceAddress = async receipt => {
  if (!receipt || !receipt.logs) return "";
  const abi = new ethers.utils.Interface([
    "event LogNewWrappedInvoice(uint256 indexed id, address invoice)",
  ]);
  const eventFragment = abi.events[Object.keys(abi.events)[0]];
  const eventTopic = abi.getEventTopic(eventFragment);
  const event = receipt.logs.find(e => e.topics[0] === eventTopic);
  if (event) {
    const decodedLog = abi.decodeEventLog(
      eventFragment,
      event.data,
      event.topics,
    );
    return decodedLog.invoice;
  }
  return "";
};

module.exports.currentTimestamp = async () => {
  const block = await waffle.provider.getBlock();
  return +block.timestamp;
};
