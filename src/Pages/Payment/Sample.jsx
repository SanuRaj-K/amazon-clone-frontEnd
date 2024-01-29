import React, { useState } from 'react';
import './App.css';

const App = () => {
    const [paymentMethod, setPaymentMethod] = useState('cashOnDelivery');
    const [totalPrice, setTotalPrice] = useState(0);
    const [cardDetails, setCardDetails] = useState({});

    const handlePayment = async () => {
        if (paymentMethod === 'cashOnDelivery') {
            // Handle cash on delivery logic
            console.log('Processing Cash on Delivery');
        } else {
            // Handle card payment logic
            console.log('Processing Card Payment', cardDetails);

            // You can send the card details to the server for further processing
        }
    };

    const handleCardDetailsChange = (e) => {
        const { name, value } = e.target;
        setCardDetails({ ...cardDetails, [name]: value });
    };

    return (
        <div className="App">
            <h1>Payment Method</h1>
            <div>
                <input
                    type="radio"
                    id="cashOnDelivery"
                    name="paymentMethod"
                    value="cashOnDelivery"
                    checked={paymentMethod === 'cashOnDelivery'}
                    onChange={() => setPaymentMethod('cashOnDelivery')}
                />
                <label htmlFor="cashOnDelivery">Cash on Delivery</label>
            </div>
            <div>
                <input
                    type="radio"
                    id="cardPayment"
                    name="paymentMethod"
                    value="cardPayment"
                    checked={paymentMethod === 'cardPayment'}
                    onChange={() => setPaymentMethod('cardPayment')}
                />
                <label htmlFor="cardPayment">Card Payment</label>
            </div>

            {paymentMethod === 'cardPayment' && (
                <div>
                    <h2>Enter Card Details</h2>
                    <label>Card Number:</label>
                    <input
                        type="text"
                        name="cardNumber"
                        onChange={handleCardDetailsChange}
                    />
                    <label>Expiry Date:</label>
                    <input
                        type="text"
                        name="expiryDate"
                        onChange={handleCardDetailsChange}
                    />
                    <label>CVC:</label>
                    <input type="text" name="cvc" onChange={handleCardDetailsChange} />
                </div>
            )}

            <label>Total Price:</label>
            <input
                type="number"
                value={totalPrice}
                onChange={(e) => setTotalPrice(e.target.value)}
            />

            <button onClick={handlePayment}>Pay</button>
        </div>
    );
};

export default App;
