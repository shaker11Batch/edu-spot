
import React from 'react';
import { useNavigate } from 'react-router';

const Membership = () => {
 const navigate = useNavigate()
    return (
        <div className="max-w-md mx-auto p-6 bg-white shadow rounded">
        <h2 className="text-xl font-semibold mb-4">Pay to Become a Member</h2>
     
        
          <button onClick={()=>navigate('/payments')} type="submit" className="btn btn-primary mt-4" >
            Pay $10
          </button>
       
        {/* {message && <p className="text-green-600 mt-3">{message}</p>} */}
      </div>
    );
};

export default Membership;