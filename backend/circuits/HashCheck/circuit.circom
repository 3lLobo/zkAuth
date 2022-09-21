pragma circom 2.0.0;

include "../../node_modules/circomlib/circuits/poseidon.circom";

template Main() {
  signal input pass;
  signal input addr;
  signal input hash;

  signal output out;

  component h = Poseidon(2);

  h.inputs[0] <== addr;
  h.inputs[1] <== pass;

  out <== h.out;
 
  out === hash;
}

component main = Main();