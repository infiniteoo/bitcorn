"use client";

import React, { useState, useEffect, useCallback } from "react";
import * as bitcoin from "bitcoinjs-lib";
import { mnemonicToSeedSync, generateMnemonic } from "@scure/bip39";
import { HDKey } from "@scure/bip32";
import { wordlist } from "@scure/bip39/wordlists/english";

interface Transaction {
  tx_hash: string;
  value: number;
  confirmed?: string;
  received: string;
  confirmations: number;
}

const Wallet: React.FC = () => {
  const [mnemonic, setMnemonic] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [balance, setBalance] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [txLoading, setTxLoading] = useState<boolean>(false);

  const generateWallet = useCallback((mn: string) => {
    try {
      const seed = mnemonicToSeedSync(mn);
      const hdkey = HDKey.fromMasterSeed(seed);
      const child = hdkey.derive("m/84'/1'/0'/0/0");
      const { address } = bitcoin.payments.p2wpkh({
        pubkey: Buffer.from(child.publicKey!),
        network: bitcoin.networks.testnet,
      });
      setAddress(address || "");
      if (address) {
        fetchBalance(address);
      }
    } catch (error) {
      console.error("Error generating wallet:", error);
    }
  }, []);

  useEffect(() => {
    const savedMnemonic = localStorage.getItem("bitcoinMnemonic");
    if (savedMnemonic) {
      setMnemonic(savedMnemonic);
      generateWallet(savedMnemonic);
    }
  }, [generateWallet]);

  const createNewWallet = () => {
    try {
      const mn = generateMnemonic(wordlist);
      setMnemonic(mn);
      localStorage.setItem("bitcoinMnemonic", mn);
      generateWallet(mn);
    } catch (error) {
      console.error("Error creating wallet:", error);
    }
  };

  const fetchBalance = async (addr: string) => {
    if (!addr) return;
    setLoading(true);
    setTxLoading(true);
    try {
      const response = await fetch(
        `https://api.blockcypher.com/v1/btc/test3/addrs/${addr}`
      );
      const data = await response.json();
      setBalance(data.balance / 100000000);
      setTransactions(data.txrefs || []);
    } catch (error) {
      console.error("Error fetching balance:", error);
    } finally {
      setLoading(false);
      setTxLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-6 text-white">
      <h2 className="text-xl font-semibold mb-4">Bitcoin Wallet</h2>
      {!mnemonic ? (
        <button
          onClick={createNewWallet}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Create New Wallet
        </button>
      ) : (
        <div>
          <p className="mb-2">
            <strong>Mnemonic:</strong> {mnemonic}
          </p>
          <p className="mb-2">
            <strong>Address:</strong> {address}
          </p>
          <p className="mb-2">
            <strong>Balance:</strong>{" "}
            {loading ? "Loading..." : `${balance} BTC`}
          </p>
          <button
            onClick={() => fetchBalance(address)}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 mr-2"
          >
            Refresh Balance
          </button>
        </div>
      )}

      {address && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Transaction History</h3>
          {txLoading ? (
            <p>Loading transactions...</p>
          ) : transactions.length > 0 ? (
            <div className="space-y-2">
              {transactions.slice(0, 10).map((tx, index) => (
                <div
                  key={index}
                  className="bg-gray-700 p-3 rounded border border-gray-600"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-mono">
                        {tx.tx_hash?.substring(0, 20)}...
                      </p>
                      <p className="text-xs text-gray-400">
                        {new Date(tx.confirmed || tx.received).toLocaleString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p
                        className={`text-sm font-semibold ${
                          tx.value > 0 ? "text-green-400" : "text-red-400"
                        }`}
                      >
                        {tx.value > 0 ? "+" : ""}
                        {(tx.value / 100000000).toFixed(8)} BTC
                      </p>
                      <p
                        className={`text-xs ${
                          tx.confirmations > 0
                            ? "text-green-400"
                            : "text-yellow-400"
                        }`}
                      >
                        {tx.confirmations > 0
                          ? `${tx.confirmations} confirmations`
                          : "Unconfirmed"}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">No transactions yet</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Wallet;
