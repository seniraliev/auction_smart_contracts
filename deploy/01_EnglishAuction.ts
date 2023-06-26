import { DeployFunction } from "hardhat-deploy/types";
import { EnglishAuction__factory, TestERC20__factory } from "../types";
import { Ship } from "../utils";
import { parseUnits } from "ethers/lib/utils";

const func: DeployFunction = async (hre) => {
  const { deploy, connect, accounts } = await Ship.init(hre);

  const testToken = await connect(TestERC20__factory);

  await deploy(EnglishAuction__factory, {
    args: [
      1, // ETH: 0, ERC20: 1, ERC721: 2, ERC1155: 3
      testToken.address, // asset address
      parseUnits("1"), // asset amount
      testToken.address // bid token address
    ]
  });
};

export default func;
func.tags = ["english-auction"]
func.dependencies = ["mocks"];
