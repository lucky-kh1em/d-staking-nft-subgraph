import { User, Civilian } from "../generated/schema";
import {
  Claim,
  Deposit,
  OwnershipTransferred,
  Paused,
  Unpaused,
  Withdraw,
} from "../generated/StakingNFT/StakingNFT";

export function handleClaim(event: Claim): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  // let entity = ExampleEntity.load(event.transaction.from.toHex());
  // // Entities only exist after they have been saved to the store;
  // // `null` checks allow to create entities on demand
  // if (!entity) {
  // 	entity = new ExampleEntity(event.transaction.from.toHex());
  // 	// Entity fields can be set using simple assignments
  // 	entity.count = BigInt.fromI32(0);
  // }
  // // BigInt and BigDecimal math are supported
  // entity.count = entity.count + BigInt.fromI32(1);
  // // Entity fields can be set based on event parameters
  // entity.owner = event.params.owner;
  // entity.tokenId = event.params.tokenId;
  // // Entities can be written to the store with `.save()`
  // entity.save();
  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.
  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // - contract.PRECISION(...)
  // - contract.amountOfRarity(...)
  // - contract.amountOfRating(...)
  // - contract.efficiencyWhenExhaust(...)
  // - contract.getPools(...)
  // - contract.getPoolsByRarity(...)
  // - contract.getStamina(...)
  // - contract.getTimeOutOfStamina(...)
  // - contract.maxStamina(...)
  // - contract.nfts(...)
  // - contract.onERC721Received(...)Number
  // - contract.owner(...)
  // - contract.paused(...)
  // - contract.pendingReward(...)
  // - contract.pools(...)
  // - contract.rewardToken(...)
  // - contract.staminaRecoveryPerSecond(...)
}

export function handleDeposit(event: Deposit): void {
  // let { owner, tokenId } = event.params;

  let user = User.load(event.params.owner.toHex());
  let civilian = Civilian.load(
    `${event.params.nftAddress.toHex()}-${event.params.tokenId.toHex()}`
  );

  if (!user) {
    user = new User(event.params.owner.toHex());
  }

  if (!civilian) {
    civilian = new Civilian(
      `${event.params.nftAddress.toHex()}-${event.params.tokenId.toHex()}`
    );
  }

  civilian.isWorking = true;
  civilian.tokenId = event.params.tokenId;
  civilian.owner = event.params.owner.toHex();
  civilian.address = event.params.nftAddress.toHex();
  civilian.poolRating = event.params.poolRating;
  civilian.poolRarity = event.params.poolRarity;

  user.save();
  civilian.save();
}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {}

export function handlePaused(event: Paused): void {}

export function handleUnpaused(event: Unpaused): void {}

export function handleWithdraw(event: Withdraw): void {
  let user = User.load(event.params.owner.toHex());
  let civilian = Civilian.load(
    `${event.params.nftAddress.toHex()}-${event.params.tokenId.toHex()}`
  );

  if (!user) {
    user = new User(event.params.owner.toHex());
  }

  if (!civilian) {
    civilian = new Civilian(
      `${event.params.nftAddress.toHex()}-${event.params.tokenId.toHex()}`
    );
  }

  civilian.isWorking = false;
  civilian.tokenId = event.params.tokenId;
  civilian.owner = event.params.owner.toHex();
  civilian.address = event.params.nftAddress.toHex();

  user.save();
  civilian.save();
}
