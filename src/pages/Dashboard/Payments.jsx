import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import PaymentForm from './PaymentForm';

const Payments = () => {
    const stripePromise = loadStripe('pk_test_51Ree3F06zSvJuPUjzDZYohwvQyrn97uZL31HDiskh1Vcvu4m19N3GpIgaiUnVjqLqWnZhoxPgIiiI3OafXBHKZjF00o8yX9O5x')

    return (
        <Elements stripe={stripePromise}>
            <PaymentForm></PaymentForm>
        </Elements>
       
    );
};

export default Payments;