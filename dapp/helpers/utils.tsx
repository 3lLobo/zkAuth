/* global BigInt */

import { buildPoseidon } from "circomlibjs";
import totp from "totp-generator";
import crypto from 'crypto-browserify';
import base32 from 'hi-base32';
import QRCode from 'qrcode';

const urlPrefix = "otpauth://totp/Harmony devnet?secret=";
const urlSuffix = "&issuer=zkOTP";



export async function prepareMerkleTree() {
    const SECRET = prepareSecret();
    const uri = await prepareQRCode(SECRET);

    const startTime = Math.floor(Date.now() / 30000 - 1) * 30000;
    let poseidon = await buildPoseidon();
    let hashes = [];
    let tokens = {};

    for (let i = 0; i < 2 ** 7; i++) {
        let time = startTime + i * 30000;
        let token = totp(SECRET, { timestamp: time });
        tokens[time] = token;
        hashes.push(poseidon.F.toObject(poseidon([BigInt(time), BigInt(token)])));
    }
    //console.log(tokens);
    //console.log(hashes);

    // compute root
    let k = 0;

    for (let i = 2 ** 7; i < 2 ** 8 - 1; i++) {
        hashes.push(poseidon.F.toObject(poseidon([hashes[k * 2], hashes[k * 2 + 1]])));
        k++;
    }
    let root = hashes[2 ** 8 - 2];
    console.log("Merkle root:", root);

    localStorage.setItem("OTPhashes", hashes);
    return [uri, SECRET, root];
}

export async function generateInputForOtpVerification(otp: any) {

    let hashes = localStorage.getItem("OTPhashes").split(',').map(BigInt);

    console.log(hashes);

    let poseidon = await buildPoseidon();

    let currentTime = Math.floor(Date.now() / 30000) * 30000;

    let currentNode = poseidon.F.toObject(poseidon([BigInt(currentTime), BigInt(otp)]));
    //console.log(currentNode);

    if (hashes.indexOf(currentNode) < 0) {
        throw new Error("Invalid OTP.");
    }

    let pathElements = [];
    let pathIndex = [];

    for (var i = 0; i < 7; i++) {
        if (hashes.indexOf(currentNode) % 2 === 0) {
            pathIndex.push(0);
            let currentIndex = hashes.indexOf(currentNode) + 1;;
            //console.log(currentIndex);
            pathElements.push(hashes[currentIndex]);
            currentNode = poseidon.F.toObject(poseidon([hashes[currentIndex - 1], hashes[currentIndex]]));
        } else {
            pathIndex.push(1);
            let currentIndex = hashes.indexOf(currentNode) - 1;
            //console.log(currentIndex);
            pathElements.push(hashes[currentIndex]);
            currentNode = poseidon.F.toObject(poseidon([hashes[currentIndex], hashes[currentIndex + 1]]));
        }
    }

    return ({
        "time": currentTime,
        "otp": otp,
        "pathElements": pathElements,
        "pathIndex": pathIndex
    })
}



async function prepareQRCode(secret: any){
    return await QRCode.toDataURL(urlPrefix.concat(secret).concat(urlSuffix));
}

function prepareSecret(length=20){
    const randomBuffer = crypto.randomBytes(length);
    return base32.encode(randomBuffer).replace(/=/g, '');
}