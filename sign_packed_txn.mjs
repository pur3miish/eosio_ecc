// @ts-check

import sign_tnx from "./sign_txn.mjs";

/**
 * Generate an Antelope/EOSIO signature for a packed transaction object.
 * @kind function
 * @name sign_packed_txn
 * @param {object} PackedTxn Packed transaction object.
 * @param {String} PackedTxn.chain_id ID specifiying what chain.
 * @param {String} PackedTxn.transaction_header Serialised transaction header.
 * @param {String} PackedTxn.transaction_body Serialised transaction body.
 * @param {String} PackedTxn.wif_private_key Private key (wallet import format).
 * @returns {Promise<String>} Signature
 * @example <caption>Usage `sign_packed_txn`.</caption>
 * ```js
 * import sign_packed_txn from 'eosio-ecc/sign_packed_txn.mjs'
 *
 * sign_packed_txn(
 *  {
 *    chain_id: '2a02a0053…',
 *    transaction_header: 'fa123232…',
 *    transaction_body: 'fa45ffa2…',
 *    wif_private_key: '5f…'
 *  }
 *)
 * ```
 * The logged output was SIG_K1_….
 */
export default async function sign_packed_txn({
  chain_id,
  transaction_header,
  transaction_body,
  wif_private_key,
}) {
  return sign_tnx({
    hex: chain_id + transaction_header + transaction_body,
    wif_private_key,
  });
}
