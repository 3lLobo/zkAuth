/* global BigInt */

import { generateWitness } from './generate_witness'
import { groth16 } from 'snarkjs'

export async function generateCalldata(input: Object, circuit_name: string) {
  let generateWitnessSuccess = true

  let witness = await generateWitness(input, circuit_name)
    .then()
    .catch((error) => {
      console.error(error)
      generateWitnessSuccess = false
    })

  //console.log(witness);

  if (!generateWitnessSuccess) {
    return
  }

  const { proof, publicSignals } = await groth16.prove(
    `${circuit_name}_circuit_final.zkey`,
    witness
  )

  const calldata = await groth16.exportSolidityCallData(proof, publicSignals)

  const argv = calldata
    .replace(/["[\]\s]/g, '')
    .split(',')
    .map((x: any) => BigInt(x).toString())

  //console.log(argv);

  const a = [argv[0], argv[1]]
  const b = [
    [argv[2], argv[3]],
    [argv[4], argv[5]],
  ]
  const c = [argv[6], argv[7]]
  const Input = argv.slice(8)

  return [a, b, c, Input]
}
