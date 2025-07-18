
import React from 'react';
import { useNavigate, useParams } from 'react-router';
import useUserRole from '../../hooks/useUserRole';

const Membership = () => {
  const [role] = useUserRole()
  const navigate = useNavigate()
  return (
    <div>

 <div className=''>
 {
        role == "user"  ?
          <div className="max-w-md mx-auto p-6 bg-white shadow rounded my-26">
            <h2 className="text-xl font-semibold mb-4">Pay to Become a Member</h2>
            <button onClick={() => navigate(`/payments`)} type="submit" className="btn btn-primary mt-4" >
              Pay $10
            </button>
          </div>
          :
          <div className="max-w-md mx-auto p-6 bg-white shadow rounded my-26">
            <h2 className="text-xl font-semibold mb-4">Already Paid for Membership</h2>
            <button disabled onClick={() => navigate(`/payments`)} type="submit" className="btn btn-primary mt-4" >
              Pay $10
            </button>
            <h2 className="text-xl font-semibold mb-4">Already your have Membership</h2>
          </div>
      }
 </div>
  
    </div>
  );
};

export default Membership;