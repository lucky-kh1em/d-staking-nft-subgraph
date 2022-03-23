import { User } from '../generated/schema';
import {
	Claim,
	Deposit,
	OwnershipTransferred,
	Paused,
	Unpaused,
	Withdraw,
} from '../generated/StakingNFT/StakingNFT';

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

	let user = User.load(event.params.owner.toString());

	if (!user) {
		user = new User(event.params.owner.toString());
	}

	const index = user.civiliansWorking?.findIndex(
		(civilianId) => civilianId === parseInt(event.params.tokenId.toString())
	);

	if (index === -1) {
		user.civiliansWorking?.push(parseInt(event.params.tokenId.toString()));
	}

	user.save();
}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {}

export function handlePaused(event: Paused): void {}

export function handleUnpaused(event: Unpaused): void {}

export function handleWithdraw(event: Withdraw): void {
	// const { owner, tokenId } = event.params;
	// let user = User.load(owner.toString());
	// if (user) {
	// 	const index = user.civiliansWorking?.findIndex(
	// 		(civilianId) => civilianId === parseInt(tokenId.toString())
	// 	);
	// 	if (index && index !== -1) {
	// 		user.civiliansWorking?.splice(index, 1);
	// 	}
	// 	user.save();
	// }
}
