import React, { useState, useEffect } from 'react';
import TransactionTable from './components/TransactionTable';
import Statistics from './components/Statistics';
import BarChart from './components/BarChart';
import PieChart from './components/PieChart';
import axios from 'axios';

const App = () => {
  const [month, setMonth] = useState('March');
  const [transactions, setTransactions] = useState([]);
  const [statistics, setStatistics] = useState({});
  const [barChartData, setBarChartData] = useState({});
  const [pieChartData, setPieChartData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const transactionRes = await axios.get(`/api/transactions/list?month=${month}`);
      const statisticsRes = await axios.get(`/api/transactions/statistics?month=${month}`);
      const barChartRes = await axios.get(`/api/transactions/barchart?month=${month}`);
      const pieChartRes = await axios.get(`/api/transactions/piechart?month=${month}`);

      setTransactions(transactionRes.data.transactions);
      setStatistics(statisticsRes.data);
      setBarChartData(barChartRes.data);
      setPieChartData(pieChartRes.data);
    };

    fetchData();
  }, [month]);

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <label htmlFor="month" className="mr-2">Select Month:</label>
        <select
          id="month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
        >
          <option value="January">January</option>
          <option value="February">February</option>
          <option value="March">March</option>
          <option value="April">April</option>
          <option value="May">May</option>
          <option value="June">June</option>
          <option value="July">July</option>
          <option value="August">August</option>
          <option value="September">September</option>
          <option value="October">October</option>
          <option value="November">November</option>
          <option value="December">December</option>
        </select>
      </div>
      <TransactionTable transactions={transactions} />
      <Statistics statistics={statistics} />
      <BarChart data={barChartData} />
      <PieChart data={pieChartData} />
    </div>
  );
};

export default App;
