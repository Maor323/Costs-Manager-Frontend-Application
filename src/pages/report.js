import React from 'react'
import { useState, useEffect } from 'react';
import { indexedDBStorage } from './indexedDB'
import './form.css'
import './report.css'
import { RiSearchLine, RiDeleteBin2Line } from 'react-icons/ri';

function DetailsReport() {

    const [filterByYear, setFilterByYear] = useState();
    const [filterByMonth, setFilterByMonth] = useState();
    const [resultState, setResultState] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    // get data from local_storage asynchronously
    useEffect(() => {
        async function getValuesFromDB() {
            try {
                const result = await indexedDBStorage.getAllItems("CostDatabase", "costs");
                setResultState(result);
            } catch (e) { }
        }
        getValuesFromDB().catch((error) => {
            throw new error("Error fetching items from IndexedDB" + error)
        })
    }, []);

    const result = Object.values(resultState);
    const handleClick = (filterByYear, filterByMonth) => {
        const tableData = Object.values(resultState);
        if (!filterByYear || !filterByMonth) {
            alert("Please fill in all the required fields.");
            return;
        }
        // const filteredData = tableData.filter((item) => {
        //     const [itemYear, itemMonth] = item.date.split('-');
        //     return itemYear === filterByYear && itemMonth === filterByMonth;
        // });
        // // setResultState(filteredData);
        // // filteredData.forEach((item) => {
        // //     setTotalPrice(totalPrice => totalPrice + parseFloat(item.price));
        // // });
        // const totalPrice = filteredData.reduce((acc, item) => acc + parseFloat(item.price), 0);
        // setTotalPrice(totalPrice);
        // setResultState(filteredData);
        const filteredData = tableData.filter((item) => (item.date.split("-")[0] === filterByYear) && ((item.date.split("-")[1]).includes(filterByMonth)));
        setResultState(filteredData);
        filteredData.forEach((item) => {
            setTotalPrice(totalPrice => totalPrice + parseFloat(item.price));
        });
    }
    return (
        <section id='report-table' className='py'>
            <div className='container'>
                <form id='report-form'>
                    <div className='form-group'>
                        <label>Enter Year <input name="years" id={"years"} type={"text"} value={filterByYear} onChange={(e) => setFilterByYear(e.target.value)} /></label>
                    </div>
                    <div className='form-group'>
                        <label>Enter Month <input name="months" id={"months"} type={"text"} value={filterByMonth} onChange={(e) => setFilterByMonth(e.target.value)} /></label>
                    </div>
                    <button className="add-btn" onClick={() => handleClick(filterByYear, filterByMonth)}> <RiSearchLine /> </button>

                </form>
                <table className="value-of-table">
                    <thead>
                        <tr>
                            <th>Category</th>
                            <th>Date</th>
                            <th>Price</th>
                            <th>Description</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {result.map((item, index) => (
                            <tr key={index}>
                                <td>{item.category}</td>
                                <td>{item.date}</td>
                                <td>{item.price}</td>
                                <td>{item.description}</td>
                                <td>
                                    <button >
                                        <RiDeleteBin2Line />
                                    </button>
                                </td>
                            </tr>
                        ))} */}
                        {result.length > 0 ? (
                            result.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.category}</td>
                                    <td>{item.date}</td>
                                    <td>{item.price}</td>
                                    <td>{item.description}</td>
                                    <td>
                                        <button>
                                            <RiDeleteBin2Line />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5">No data to display</td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <table className='total-price'>
                    <thead>
                        <tr>
                            <th>
                                TOTAL PRICE: {totalPrice}

                            </th>
                        </tr>
                    </thead>

                </table>
            </div>
        </section>

    );
}

export default DetailsReport;