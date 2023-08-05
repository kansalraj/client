import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CSVLink } from 'react-csv';
import {
  Container,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Box,
  FormControl,
  Select,
  MenuItem,
  IconButton,
} from '@mui/material';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const config = require('../config');
const environment = process.env.NODE_ENV || 'development';
const baseURL = config[environment].baseURL;

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sortOrder, setSortOrder] = useState('desc');

  useEffect(() => {
    fetchTransactions();
  }, [pageNumber, pageSize, sortOrder]);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get(
        `${baseURL}/transactions?walletId=${localStorage.getItem('walletId')}&skip=${(pageNumber - 1) * pageSize}&limit=${pageSize}&sortOrder=${sortOrder}`
      );
      setTransactions(response.data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const handleExportCSV = () => {
    const csvData = transactions.map((transaction) => ({
      ...transaction,
      date: new Date(transaction.date).toLocaleString(),
    }));
    return csvData;
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <Button variant="contained" color="primary">
          Back
        </Button>
      </Link>
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Wallet Transactions
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Balance</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Type</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction._id}>
                <TableCell>{transaction._id}</TableCell>
                <TableCell>{transaction.amount}</TableCell>
                <TableCell>{transaction.balance}</TableCell>
                <TableCell>{transaction.description}</TableCell>
                <TableCell>{new Date(transaction.date).toLocaleString()}</TableCell>
                <TableCell>{transaction.type}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton
            onClick={() => setPageNumber((prev) => Math.max(prev - 1, 1))}
            disabled={pageNumber === 1}
          >
            <KeyboardArrowLeft />
          </IconButton>
          <IconButton onClick={() => setPageNumber((prev) => prev + 1)}>
            <KeyboardArrowRight />
          </IconButton>
        </Box>
        <FormControl>
          <Select value={pageSize} onChange={(e) => setPageSize(e.target.value)}>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={25}>25</MenuItem>
            <MenuItem value={50}>50</MenuItem>
          </Select>
        </FormControl>
        <FormControl>
          <Select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
            <MenuItem value="desc">Descending</MenuItem>
            <MenuItem value="asc">Ascending</MenuItem>
          </Select>
        </FormControl>
        <CSVLink data={handleExportCSV()} filename={'transactions.csv'}>
          <Button variant="contained" color="primary">
            Export CSV
          </Button>
        </CSVLink>
      </Box>
    </Container>
  );
};

export default TransactionsPage;
