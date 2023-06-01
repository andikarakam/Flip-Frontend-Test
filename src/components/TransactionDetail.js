import React, { useState, useEffect } from 'react';
import Button from './common/Button';
import '../styles/variables.css';
import '../styles/global.css';

const TransactionDetail = (props) => {
    const [transaction, setTransaction] = useState(null);

    useEffect(() => {
        const transactionId = props.match.params.id;
        fetch(`https://recruitment-test.flip.id/frontend-test/${transactionId}`)
            .then(response => response.json())
            .then(data => {
                setTransaction(data);
            })
            .catch(error => {
                console.error('Error fetching transaction detail:', error);
            });
    }, [props.match.params.id]);

    const handleGoBack = () => {
        props.history.goBack();
    };

    return (
        <div className="container">
            {transaction ? (
                <div>
                    <h2>Transaction Detail</h2>
                    <Button onClick={handleGoBack}>Back</Button>
                    <p>ID: {transaction.id}</p>
                    <p>Name: {transaction.name}</p>
                    <p>Amount: {transaction.amount}</p>
                    <p>Sender Bank: {transaction.sender_bank}</p>
                    <p>Beneficiary Bank: {transaction.beneficiary_bank}</p>
                    {/* Display other transaction details */}
                </div>
            ) : (
                <p>Loading transaction detail...</p>
            )}
        </div>
    );
};

export default TransactionDetail;
