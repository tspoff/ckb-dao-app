import BigNumber from "bignumber.js";
import { basename } from "path";

export function shortenAddress(address, digits = 4) {
  return `${address.substring(0, digits + 2)}...${address.substring(
    46 - digits
  )}`;
}

export function shortenTransactionHash(hash, digits = 4) {
  return `${hash.substring(0, digits + 2)}...${hash.substring(66 - digits)}`;
}

export function scaledCKB(value) {
  return new BigNumber(value).div(10 ** 8).toString();
}

export function scale(input: BigNumber, decimalPlaces: number): BigNumber {
  const scalePow = new BigNumber(decimalPlaces.toString());
  const scaleMul = new BigNumber(10).pow(scalePow);
  return input.times(scaleMul);
}

export const formatBalance = (
  balance: string,
  decimals: number = 8,
  precision: number = 4
): string => {
  const bn = new BigNumber(balance);

  if (bn.eq(0)) {
    return new BigNumber(0).toFixed(1);
  }

  const result = scale(bn, -decimals)
    .decimalPlaces(precision, BigNumber.ROUND_DOWN)
    .toString();

  return padToDecimalPlaces(result, 1);
};

export const padToDecimalPlaces = (
  value: string,
  minDecimals: number
): string => {
  const split = value.split(".");
  const zerosToPad = split[1] ? minDecimals - split[1].length : minDecimals;

  if (zerosToPad > 0) {
    let pad = "";

    // Add decimal point if no decimal portion in original number
    if (zerosToPad === minDecimals) {
      pad += ".";
    }
    for (let i = 0; i < zerosToPad; i++) {
      pad += "0";
    }
    return value + pad;
  }
  return value;
};
