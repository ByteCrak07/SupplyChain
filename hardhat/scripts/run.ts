import { ethers } from "hardhat";

const main = async () => {
  const [owner, user2] = await ethers.getSigners();
  const supplyChainContractFactory = await ethers.getContractFactory(
    "SupplyChain"
  );
  const supplyChainContract = await supplyChainContractFactory.deploy();
  await supplyChainContract.deployed();

  await supplyChainContract.addUser("Athul", "manufacturer");

  await supplyChainContract.addProduct(
    "Toeethpast",
    "food",
    new Date().getTime(),
    20,
    10,
    "INR"
  );
  await supplyChainContract.addProduct(
    "Tthpast",
    "food",
    new Date().getTime(),
    20,
    10,
    "INR"
  );
  await supplyChainContract.addProduct(
    "Toothpast",
    "food",
    new Date().getTime(),
    20,
    10,
    "INR"
  );

  let user = await supplyChainContract.users(owner.address);
  let data = await supplyChainContract.productUIds(0);
  // let prod = await supplyChainContract.products(data.toString());
  let prods = await supplyChainContract.getAllProducts();
  await supplyChainContract.addDeparture(
    data,
    new Date().getTime(),
    user2.address
  );
  await supplyChainContract.addArrival(
    data,
    new Date().getTime()
    // user2.address
  );
  let transits = await supplyChainContract.getAllTransits(2);
  let transits2 = await supplyChainContract.getAllTransits(10);
  let Product = await supplyChainContract.getProduct(data);
  console.log(user);
  console.log(data.toString());
  // console.log(prod);
  console.log(prods);
  console.log("transitss");
  // console.log(transits, transits2);
  console.log(Product);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
