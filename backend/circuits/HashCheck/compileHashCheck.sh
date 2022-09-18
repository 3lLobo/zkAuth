
mkdir HashCheck

rm HashCheck/HashCheck.r1cs
rm HashCheck/HashCheck.sym
rm HashCheck/circuit_0000.zkey
rm HashCheck/HashCheck_js
rm HashCheck/witness.wtns
rm HashCheck/pot12_0000.ptau
rm HashCheck/pot12_0001.ptau
rm HashCheck/pot12_final.ptau

if [ -f ./powersOfTau28_hez_final_10.ptau ]; then
    echo "powersOfTau28_hez_final_10.ptau already exists. Skipping."
else
    echo 'Downloading powersOfTau28_hez_final_10.ptau'
    wget https://hermez.s3-eu-west-1.amazonaws.com/powersOfTau28_hez_final_10.ptau
fi

echo "Compiling HashCheck.circom..."

circom HashCheck.circom --r1cs --wasm --sym -o HashCheck
node HashCheck/HashCheck_js/generate_witness.js HashCheck/HashCheck_js/HashCheck.wasm HashCheck/input.json HashCheck/witness.wtns
# # cp HashCheck/witness.wtns ../witness.wtns

snarkjs r1cs info HashCheck/HashCheck.r1cs

# # phase 1 of ceremony
snarkjs powersoftau new bn128 12 HashCheck/pot12_0000.ptau -v
snarkjs powersoftau contribute HashCheck/pot12_0000.ptau HashCheck/pot12_0001.ptau --name="First contribution" -v

# # phase 2 of ceremony
snarkjs powersoftau prepare phase2 HashCheck/pot12_0001.ptau HashCheck/pot12_final.ptau -v
snarkjs groth16 setup HashCheck/HashCheck.r1cs powersOfTau28_hez_final_10.ptau HashCheck/circuit_0000.zkey
snarkjs zkey contribute HashCheck/circuit_0000.zkey HashCheck/circuit_final.zkey --name="1st Contribution Name" -v -e="random text"
snarkjs zkey export verificationkey HashCheck/circuit_final.zkey HashCheck/verification_key.json
snarkjs groth16 prove HashCheck/circuit_final.zkey HashCheck/witness.wtns HashCheck/proof.json HashCheck/public.json
snarkjs groth16 verify HashCheck/verification_key.json HashCheck/public.json HashCheck/proof.json



# snarkjs zkey export solidityverifier HashCheck/circuit_final.zkey HashCheck/HashCheckVerifier.sol
