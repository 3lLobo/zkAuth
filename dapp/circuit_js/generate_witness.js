import wc from "./witness_calculator";

export async function generateWitness (input, circuit_name) {
	const response = await fetch(`${circuit_name}_circuit.wasm`);
	const buffer = await response.arrayBuffer();
	//console.log(buffer);
	let buff;

	await wc(buffer).then(async witnessCalculator => {
		buff = await witnessCalculator.calculateWTNSBin(input, 0);
	});
	return buff;
}
