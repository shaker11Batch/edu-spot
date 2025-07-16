import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useState } from 'react';

const PaymentForm = () => {
    const [processing, setProcessing] = useState(false);
    const [error, setError]= useState(null)
const stripe = useStripe()
const elements = useElements()

const handleSubmit=async e =>{
    e.preventDefault()

if(!stripe || !elements){
    return
}

const card = elements.getElement(CardElement)
if(!card){
    return
}

const {error, paymentMethod} = await stripe.createPaymentMethod({
    type: 'card',
    card
})


if(error){
    console.log('error', error)
    setError(error.message)
} else{
    setError(null)
    console.log('payment method', paymentMethod)
}


}

    return (
    <div className='my-8'>
         <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
      <CardElement className="p-4 border rounded" />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button
        type="submit"
        disabled={!stripe || processing}
        className="btn btn-primary w-full"
      >
        {/* {processing ? "Processing..." : `Pay $${amount}`} */}
        Pay for Membership
      </button>
    </form>
    </div>
    );
};

export default PaymentForm;