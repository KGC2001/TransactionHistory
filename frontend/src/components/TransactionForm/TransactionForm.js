
import React, { useState } from 'react';

import './TransactionForm.css'
import { IoSaveSharp } from "react-icons/io5";
import { ImCancelCircle } from "react-icons/im";


const TransactionForm = ({ onSave }) => {
    const getCurrentDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      };
    
      const [formData, setFormData] = useState({ 
        date: getCurrentDate(), 
        description: '', 
        amount: '', 
        type: 'credit' 
      });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    setFormData({ date: '', description: '', amount: '', type: 'credit' });
  };

  const handlingCancel=()=>{
    onSave(false)
  }

  return (

    <form className='transaction-form'  onSubmit={handleSubmit}>
        <div className='date-type'>
            <label className='labels'>Date:</label>
            <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            />
        </div>
        <div className='transaction-type'>
            <label className='labels'>Transaction Type</label>
            <select className='select-type' name="type" value={formData.type} onChange={handleChange} required>
                <option value="">Select Type</option>
                <option  value="Credit">Credit</option>
                <option  value="Debit">Debit</option>
            </select>
        </div>

        <div className='Amountsec'> 
            <label className='labels' for="Amount" >Amount</label>
            <input
                className='Amount-type'
                name="amount"
                type="number"
                value={formData.amount}
                onChange={handleChange}
                placeholder="Amount"
                id="Amount"
                required
            />
        </div>
        <div className='description'>
            <label className='labels'>Description</label>
            <textarea
                type="text"
                name="description"
                className='description-text'
                value={formData.description}
                onChange={handleChange}
                placeholder="Description"
                required
                
            />
        </div>
        <div className='btns'>
            <button className='savebtn' type="submit"><IoSaveSharp /><span className='savespan'>Save</span></button>
            <button className='cancelbtn' onClick={handlingCancel}><ImCancelCircle /><span className='cancelspan'>Cancel</span></button>
        </div>
        
    </form>

  );
};

export default TransactionForm;


