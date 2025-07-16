
import React from 'react';
import { useNavigate, useParams } from 'react-router';

const Membership = () => {
  // const {email} = useParams()
  // console.log('parems email',email)
 const navigate = useNavigate()
    return (
        <div className="max-w-md mx-auto p-6 bg-white shadow rounded my-26">
        <h2 className="text-xl font-semibold mb-4">Pay to Become a Member</h2>    
          <button onClick={()=>navigate(`/payments`)} type="submit" className="btn btn-primary mt-4" >
            Pay $10
          </button>
      </div>
    );
};

export default Membership;