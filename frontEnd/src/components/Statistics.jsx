import React from 'react';

const Statistics = ({ statistics }) => {
  return (
    <div className="grid grid-cols-3 gap-4 my-4">
      <div className="p-4 border">
        <h3>Total Sale Amount</h3>
        <p>{statistics.totalSaleAmount}</p>
      </div>
      <div className="p-4 border">
        <h3>Total Sold Items</h3>
        <p>{statistics.totalSoldItems}</p>
      </div>
      <div className="p-4 border">
        <h3>Total Not Sold Items</h3>
        <p>{statistics.totalNotSoldItems}</p>
      </div>
    </div>
  );
};

export default Statistics;
