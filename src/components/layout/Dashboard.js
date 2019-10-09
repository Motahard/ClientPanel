import React from 'react';
import Clients from '../clients/Clients';
import Sidebar from '../layout/Sidebar';

const Dashboard = () => {
  return (
    <div className='row'>
      <div className='col-lg-10'>
        <Clients />
      </div>
      <div className='col-lg-2'>
        <Sidebar />
      </div>
    </div>
  );
};

export default Dashboard;
