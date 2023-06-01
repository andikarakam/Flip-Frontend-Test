import React, { useState, useEffect } from 'react';
import Button from './common/Button';
import '../styles/variables.css';
import '../styles/global.css';

const TransactionList = () => {
    const [transactions, setTransactions] = useState([]);
    const [filteredTransactions, setFilteredTransactions] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [filterText, setFilterText] = useState('');
    const [sortType, setSortType] = useState('');

    useEffect(() => {
        fetch('https://recruitment-test.flip.id/frontend-test')
            .then(response => response.json())
            .then(data => {
                setTransactions(data);
                setFilteredTransactions(data);
                calculateTotalAmount(data);
            })
            .catch(error => {
                console.error('Error fetching transaction data:', error);
            });
    }, []);

    const calculateTotalAmount = (data) => {
        const total = data.reduce((accumulator, transaction) => {
            return accumulator + transaction.amount;
        }, 0);
        setTotalAmount(total);
    };

    const handleFilterChange = (event) => {
        const searchText = event.target.value.toLowerCase();
        setFilterText(searchText);

        const filtered = transactions.filter(transaction => {
            return (
                transaction.name.toLowerCase().includes(searchText) ||
                transaction.sender_bank.toLowerCase().includes(searchText) ||
                transaction.beneficiary_bank.toLowerCase().includes(searchText)
            );
        });

        setFilteredTransactions(filtered);
        calculateTotalAmount(filtered);
    };

    const handleSortChange = (event) => {
        const sortValue = event.target.value;
        setSortType(sortValue);

        let sorted = [...filteredTransactions];
        switch (sortValue) {
            case 'name-asc':
                sorted.sort((a, b) => a.beneficiary_name.localeCompare(b.beneficiary_name));
                break;
            case 'name-desc':
                sorted.sort((a, b) => b.beneficiary_name.localeCompare(a.beneficiary_name));
                break;
            case 'date-newest':
                sorted.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                break;
            case 'date-oldest':
                sorted.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
                break;
            default:
                break;
        }

        setFilteredTransactions(sorted);
    };

    return (
        <div className="container">
            <h1>Transaction List</h1>
            <div className="filter">
                <label htmlFor="filter">Filter:</label>
                <input type="text" id="filter" value={filterText} onChange={handleFilterChange} />
            </div>
            <div className="sort">
                <label htmlFor="sort">Sort by:</label>
                <select id="sort" value={sortType} onChange={handleSortChange}>
                    <option value="">-- Select --</option>
                    <option value="name-asc">Name A-Z</option>
                    <option value="name-desc">Name Z-A</option>
                    <option value="date-newest">Sort date newest</option>
                    <option value="date-oldest">Sort date oldest</option>
                </select>
            </div>
            <p className="total-amount">Total Amount: {totalAmount}</p>
            <ul className="transaction-list">
                {filteredTransactions.map(transaction => (
                    <li key={transaction.id}>
                        <a href={`/transaction/${transaction.id}`}>{transaction.name}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TransactionList;
