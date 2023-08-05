import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  FormControlLabel,
  Switch,
} from "@mui/material";

const config = require("../config");
const environment = process.env.NODE_ENV || "development";
const baseURL = config[environment].baseURL;

const HomePage = () => {
  const [name, setName] = useState("");
  const [balance, setBalance] = useState("");
  const [walletId, setWalletId] = useState("");
  const [transactionAmount, setTransactionAmount] = useState("");
  const [isCredit, setIsCredit] = useState(true);

  const handleTransaction = async () => {
    try {
      const response = await axios.post(`${baseURL}/transact/${walletId}`, {
        amount: isCredit
          ? parseFloat(transactionAmount)
          : -parseFloat(transactionAmount),
        description: isCredit ? "Credit" : "Debit",
      });
      setBalance(response.data.balance);
      setTransactionAmount("");
    } catch (error) {
      console.error("Error performing transaction:", error);
    }
  };

  useEffect(() => {
    const savedWalletId = localStorage.getItem("walletId");
    if (savedWalletId) {
      setWalletId(savedWalletId);
      fetchWalletDetails(savedWalletId);
    }
  }, []);

  const fetchWalletDetails = async (id) => {
    try {
      const response = await axios.get(`${baseURL}/wallet/${id}`);
      setBalance(response.data.balance);
      setName(response.data.name);
    } catch (error) {
      console.error("Error fetching wallet details:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${baseURL}/setup`, {
        balance: parseFloat(balance),
        name,
      });
      const newWalletId = response.data.id;
      setWalletId(newWalletId);
      localStorage.setItem("walletId", newWalletId);
    } catch (error) {
      console.error("Error setting up wallet:", error);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h3" component="h1" align="center" gutterBottom>
        Wallet System
      </Typography>
      {walletId ? (
        <>
          <Typography variant="h5" align="center" gutterBottom>
            Welcome, {name}
          </Typography>
          <Typography variant="body1" align="center" gutterBottom>
            Balance: {balance}
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Link to="/transactions" style={{ textDecoration: "none" }}>
              <Button variant="contained" color="primary">
                View Transactions
              </Button>
            </Link>
          </Box>

          <Box sx={{ mt: 4 }}>
            <Typography variant="h6">Perform Transaction</Typography>
            <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
              <TextField
                type="number"
                step="0.0001"
                label="Transaction Amount"
                variant="outlined"
                value={transactionAmount}
                onChange={(e) => setTransactionAmount(e.target.value)}
                sx={{ mr: 2 }}
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={isCredit}
                    onChange={() => setIsCredit((prev) => !prev)}
                    name="transactionType"
                    color="primary"
                  />
                }
                label={isCredit ? "Credit" : "Debit"}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleTransaction}
              >
                Submit Transaction
              </Button>
            </Box>
          </Box>
        </>
      ) : (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" align="center" gutterBottom>
            Setup Wallet
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <form onSubmit={handleSubmit}>
              <TextField
                label="Name"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
                sx={{ mr: 2 }}
              />
              <TextField
                type="number"
                step="0.0001"
                label="Initial Balance"
                variant="outlined"
                value={balance}
                onChange={(e) => setBalance(e.target.value)}
                sx={{ mr: 2 }}
              />
              <Button variant="contained" color="primary" type="submit">
                Submit
              </Button>
            </form>
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default HomePage;
