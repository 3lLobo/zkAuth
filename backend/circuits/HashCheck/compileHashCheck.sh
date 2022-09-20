
mkdir build

rm build/circuit.r1cs
rm build/circuit.sym
rm build/circuit_0000.zkey
rm build/circuit_js
rm build/witness.wtns
rm build/pot12_0000.ptau
rm build/pot12_0001.ptau
rm build/pot12_final.ptau

if [ -f ./powersOfTau28_hez_final_12.ptau ]; then
    echo "powersOfTau28_hez_final_12.ptau already exists. Skipping."
else
    echo 'Downloading powersOfTau28_hez_final_12.ptau'
    wget https://hermez.s3-eu-west-1.amazonaws.com/powersOfTau28_hez_final_12.ptau
fi

echo "Compiling circuit.circom..."

circom circuit.circom --r1cs --wasm --sym -o build
node build/circuit_js/generate_witness.js build/circuit_js/circuit.wasm build/input.json build/witness.wtns
# # # cp circuit/witness.wtns ../witness.wtns

snarkjs r1cs info build/circuit.r1cs

# # # phase 1 of ceremony
snarkjs powersoftau new bn128 12 build/pot12_0000.ptau -v
snarkjs powersoftau contribute build/pot12_0000.ptau build/pot12_0001.ptau --name="First contribution" -v

# # # phase 2 of ceremony
snarkjs powersoftau prepare phase2 build/pot12_0001.ptau build/pot12_final.ptau -v
snarkjs groth16 setup build/circuit.r1cs powersOfTau28_hez_final_12.ptau build/circuit_0000.zkey
snarkjs zkey contribute build/circuit_0000.zkey build/circuit_final.zkey --name="1st Contribution Name" -v -e="random text"
snarkjs zkey export verificationkey build/circuit_final.zkey build/verification_key.json
snarkjs groth16 prove build/circuit_final.zkey build/witness.wtns build/proof.json build/public.json
snarkjs groth16 verify build/verification_key.json build/public.json build/proof.json



snarkjs zkey export solidityverifier build/circuit_final.zkey build/circuitVerifier.sol

