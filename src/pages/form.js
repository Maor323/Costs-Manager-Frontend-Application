import React from 'react';
import { useState } from 'react';
import { idb } from './idb';
import { nanoid } from 'nanoid';
import '../components/buttonstyle.css';
import './form.css';

function Form() {

    // Initial set up state for an "expense"
    const [expense, setExpense] = useState({
        id: '',
        category: 'Food',
        startDate: '',
        sum: '',
        description: '',
    });

    // Destructuring- extracts the properties 
    const { category, startDate, sum, description } = expense;

    async function handleClickForm(event) {

        event.preventDefault();

        // Generates a unique ID
        let ID = expense.id = nanoid();

        // Update state object with new values
        setExpense({
            id: ID,
            category: category,
            startDate: startDate,
            sum: sum,
            description: description
        });

        // Checking validation of the values
        if (!sum || !startDate || !description) {
            alert('Please fill in the required details.');
            return;
        }

        // Open indexedDB and adding item to the database asynchronous 
        try {
            const db = await idb.openCostsDB('costsdb', 1);
            const costData = { ...expense, date: new Date() };
            await db.addCost(costData);
            alert('The Item Was Added Successfully');

            // Resets the expense state to empty values after successfully adding the data to the Database
            setExpense({
                id: '',
                category: 'Food',
                startDate: '',
                sum: '',
                description: '',
            });

        } catch (error) {
            console.error('Error adding data to IndexedDB:', error);
            alert('Error adding data to the Database:', error);
        }
    }

    return (
        <section id='contact-form' className='py'>
            <div className='container'>
                <h2 className='l-heading'><span className='text-primary'>Management</span> Your Costs</h2>
                <p>
                    Add your cost item, fill the form down below:
                </p>
                <form id='my-form'>
                    <div className='form-group'>
                        <label>Category
                            <select name='category' id='category' value={category}
                                onChange={(e) => setExpense({ ...expense, category: e.target.value })}>
                                <option value='Food'>Food</option>
                                <option value='Health'>Health</option>
                                <option value='Education'>Education</option>
                                <option value='Travel'>Travel</option>
                                <option value='Housing'>Housing</option>
                                <option value='Other'>Other</option>
                            </select>
                        </label>
                    </div>
                    <div className='form-group'>
                        <label>Sum <input name='Sum' id='Sum' type='number' pattern='[0-9]*'
                            value={sum} onChange={(e) => setExpense({ ...expense, sum: e.target.value })} required={true} /></label>
                    </div>
                    <div className='form-group'>
                        <label>Date <input type='date' name='date' id={'date'}
                            value={startDate} onChange={(e) => setExpense({ ...expense, startDate: e.target.value })} required={true} /></label>
                    </div>
                    <div className='form-group'>
                        <label>Description
                            <input name='Description' id='Description' type='text' value={description}
                                onChange={(e) => setExpense({ ...expense, description: e.target.value })} required={true} /></label>
                    </div>
                    <button className='add-btn' onClick={handleClickForm}>Add</button>
                </form>
            </div>
        </section>
    );
}

export default Form;