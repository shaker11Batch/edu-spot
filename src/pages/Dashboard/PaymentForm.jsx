import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { use, useState } from 'react';

import { AuthContext } from '../../shared/Context/AuthContext';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

const PaymentForm = () => {
    const axiosSecure = useAxiosSecure()
    const { user } = use(AuthContext)
    const navigate = useNavigate()
    const [error, setError] = useState(null)
    const stripe = useStripe()
    const elements = useElements()

    const amount = 10;
    const amountInCents = amount * 100

    const handleSubmit = async e => {
        e.preventDefault()

        if (!stripe || !elements) return;

        const card = elements.getElement(CardElement);
        if (!card) return;

        // step-1: validate the card 
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
            console.log("error", error)
            setError(error.message)
        }
        else {
            setError(null)
            console.log('payment method', paymentMethod)
            //Step-3 create payment intent

            // api backend 
            const res = await axiosSecure.post('/create-payment-intent', {
                amountInCents

            })
            console.log('res from intert', res)

            const clientSecret = res.data.clientSecret


            // step-3 confirm payment         // // Step-4 
            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                    billing_details: {
                        name: user?.displayName,
                        email: user?.email,

                    }
                }
            });
            if (result.error) {
                setError(result.error.message)
            } else {
                setError(null)
                if (result.paymentIntent.status === 'succeeded') {
                    console.log('payment succeeded')
                    console.log(result)

                    const paymentData = {
                        name: user?.displayName,
                        email: user?.email,
                        amount,
                        transactionId: result.paymentIntent.id,
                        paymentMethod: result.paymentIntent.payment_method_types
                    }
                    const paymentRes = await axiosSecure.post(`/payments/${user?.email}`, paymentData)
                    if (paymentRes) {
                        navigate('/')
                        toast('Congratulations ✅ Membership Done')
                    }

                }
            }
        }
    }

    return (
        <div className='my-8'>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
                <CardElement className="p-4 border rounded" />
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <button
                    type="submit"
                    className="btn btn-primary w-full"
                >
                    Pay for Membership
                </button>
            </form>
        </div>
    );
};

export default PaymentForm;