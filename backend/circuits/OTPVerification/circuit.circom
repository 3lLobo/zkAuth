pragma circom 2.0.0;

include "../../node_modules/circomlib/circuits/poseidon.circom";
include "../../node_modules/circomlib/circuits/mux1.circom";

template hashLeaves(){
    signal input leftLeaf;
    signal input rightLeaf;

    signal output out;

    component h = Poseidon(2);
    h.inputs[0] <== leftLeaf;
    h.inputs[1] <== rightLeaf;

    out <== h.out;
}

template MerkleTreeInclusionVerification(n) {
    signal input time;
    signal input otp;
    signal input pathElements[n];
    signal input pathIndex[n];

    signal output root;

    signal leaf;

    component hl = hashLeaves();
    hl.leftLeaf <== time;
    hl.rightLeaf <== otp;

    leaf <== hl.out;

    component h[n];
    signal levelHashes[n+1];

    levelHashes[0] <== leaf;

    component mux[n];

    for(var i=0; i<n; i++){

        (pathIndex[i])*(1 - pathIndex[i]) === 0;

        h[i] = hashLeaves();
        mux[i] = MultiMux1(2);

        mux[i].c[0][0] <== levelHashes[i];
        mux[i].c[0][1] <== pathElements[i];

        mux[i].c[1][0] <== pathElements[i];
        mux[i].c[1][1] <== levelHashes[i];

        mux[i].s <== pathIndex[i];

        h[i].leftLeaf <== mux[i].out[0];
        h[i].rightLeaf <== mux[i].out[1];

        levelHashes[i+1] <== h[i].out;
    }

    root <== levelHashes[n];
}

component main { public [time] } = MerkleTreeInclusionVerification(7);