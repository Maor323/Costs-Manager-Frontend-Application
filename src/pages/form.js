
import React from 'react'
import { useState } from 'react';
import { nanoid } from "nanoid";



function Form() {

    // all the information we want to be saved each render
    const [Category, setCategory] = useState("Food");
    const [startDate, setStartDate] = useState();
    const [Price, setPrice] = useState("");
    const [Description, setDescription] = useState("");

    // add button was pressed
    function handleClicks() {
        let ID = nanoid();
        const costData = {
            ID: ID,
            category: Category,
            price: Price,
            date: startDate,
            description: Description
        }
        //check valid
        if (!costData.price || !costData.date) {
            alert("Please fill in all the required fields.");
            return;
        }
        // insert the data

    }
    return (
        <section id='contact-form' className='py'>
            <div className='container'>
                <h2 className='l-heading'><span className="text-primary">Management</span> Your Costs</h2>
                <p>
                    Add your cost item, fill the form down below to .
                </p>
                <form id='my-form'>
                    <div className='form-group'>
                        <label>Category
                            <select name="Category" id="Category" value={Category} onChange={(e) => setCategory(e.target.value)}>
                                <option value="Food">Food</option>
                                <option value="Health">Health</option>
                                <option value="Housing">Housing</option>
                                <option value="Sport">Sport</option>
                                <option value="Education">Education</option>
                                <option value="Transportations">Transportations</option>
                            </select>
                        </label>
                    </div>
                    <div className='form-group'>
                        <label>Price <input name="Price" id="Price" type="number" pattern="[0-9]*" value={Price} onChange={(e) => setPrice(e.target.value)} required={true} /></label>
                    </div>
                    <div className='form-group'>
                        <label>Date <input type="date" name="date" id={"date"} value={startDate} onChange={(e) => setStartDate(e.target.value)} required={true} /></label>
                    </div>
                    <div className='form-group'>
                        <label>Description
                            <input name="Description" id="Description" value={Description} onChange={(e) => setDescription(e.target.value)} /></label>
                    </div>
                    <button className="addButton" onClick={handleClicks}> Add </button>
                </form>

            </div>



        </section>

    )
}
export default Form;