import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { RiSearchLine, RiFileDownloadLine } from 'react-icons/ri';
import { idb } from './idb';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import './form.css';
import './report.css';

function DetailsReport() {

    // Initial set up states 
    const [yearUserInput, setYearUserInput] = useState('');
    const [monthUserInput, setMonthUserInput] = useState('');
    const [data, setData] = useState([]);
    const [totalSum, setTotalSum] = useState(0);
    const [maxCategorySum, setMaxCategorySum] = useState(0);
    const [maxCategory, setMaxCategory] = useState();
    const [showData, setShowData] = useState([]);
    const pdfRef = useRef();

    // Get the data from indexedDB 
    async function getValuesFromDB() {
        try {
            const result = await idb.getAllItems();
            setData(result);
            setShowData(result);
        } catch (error) {
            console.error('Error get data from DB:', error);
            console.log(error.message);
        }
    }

    // Initialize database and retrieve the values from it
    useEffect(() => {
        async function initializeDB() {
            try {
                // Check if the database is not initialized or if it's not ready
                if (!idb.db) {
                    // Wait for the database to open
                    await new Promise((resolve) => {
                        idb.openCostsDB('costsdb', 1).then(() => {
                            resolve();
                        });
                    });
                }
                await getValuesFromDB();
            } catch (error) {
                console.error('Error initializing DB:', error);
            }
        }
        initializeDB();
    }, []);

    // what happened when clicked on search button
    const handleClick = (event, yearUserInput, monthUserInput) => {
        event.preventDefault();

        // Checking validation of the values
        if (!yearUserInput || !monthUserInput) {
            alert('Please fill in the required details.');
            return;
        }

        const selectedFilterData = showData.filter(
            (item) =>
                (item.startDate.split('-')[0] === yearUserInput) &&
                ((item.startDate.split('-')[1]).includes(monthUserInput)));

        // Checking if data from DB and input from user are correct
        if (selectedFilterData.length === 0 || monthUserInput === '0') {
            alert('No data found for these selected year and month.');
            setMaxCategorySum(0);
            setMaxCategory('');
            setData(showData);
        } else {
            // Set a flag to indicate whether data was found
            const dataFound = selectedFilterData.length > 0;

            // Use the flag to determine whether to display the message
            setData(dataFound ? selectedFilterData : data);
        }

        // Calculates and store the total prices for each category
        const categorySum = {};
        selectedFilterData.map((item) => {
            const category = item.category;
            const sum = parseFloat(item.sum);

            if (categorySum[category]) {
                categorySum[category] += sum;
            } else {
                categorySum[category] = sum;
            }
        });

        // Find the category with the highest price
        let maxSum = 0;
        let maxCategory = '';
        for (const category in categorySum) {
            if (categorySum[category] > maxSum) {
                maxSum = categorySum[category];
                maxCategory = category;
            }
        }

        setMaxCategorySum(maxSum);
        setMaxCategory(maxCategory);
    }

    useEffect(() => {
        // Calculate total price whenever the filtered data changes
        let total = 0;
        data.forEach((item) => {
            total += parseFloat(item.sum);
        });
        setTotalSum(total);
    }, [data]);

    const downloadPDF = (event) => {
        event.preventDefault();

        // Get a reference to the HTML element to convert to PDF
        const input = pdfRef.current;
        console.log(input);

        // capture the content of the HTML element as an image (canvas)
        html2canvas(input).then((canvas) => {
            // Convert the canvas image to a Data URL, which can be used as an image source in PDF
            const imgData = canvas.toDataURL('img/png');

            // Create a new jsPDF instance with configuration (page size, orientation, etc.)
            const pdf = new jsPDF('p', 'mm', 'a4', true);

            // Get the width and height of the PDF page
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();

            // Get the width and height of the captured canvas image
            const imgWidth = canvas.width;
            const imgHeight = canvas.height;

            // Calculate the scaling ratio to fit the image within the PDF page
            const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);

            // Calculate the X and Y positions to center the image on the PDF page
            const imgX = (pdfWidth - imgWidth * ratio) / 2;
            const imgY = 30;

            // Add the captured image to the PDF with specified format ('PNG')
            // The parameters are: Data URL, image format, X position, Y position, image width, image height
            pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);

            // Attempt to save the PDF
            try {
                pdf.save('myData.pdf');
            } catch (error) {
                console.error('Error saving PDF:', error);
            }
        });

    };

    return (
        <section id='report-table' className='py'>
            <div className='container' ref={pdfRef}>
                <div className='search-and-category'>
                    <form id='report-form'>
                        <h2 className='l-heading'><span className='text-primary'>Search</span> By Time</h2>
                        <div className='form-group'>
                            <label>Enter Year <input name='years' id={'years'} type={'text'}
                                value={yearUserInput} onChange={(e) => setYearUserInput(e.target.value)} /></label>
                        </div>
                        <div className='form-group'>
                            <label>Enter Month <input name='months' id={'months'} type={'text'}
                                value={monthUserInput} onChange={(e) => setMonthUserInput(e.target.value)} /></label>
                        </div>
                        <button className='add-btn'
                            onClick={(event) => handleClick(event, yearUserInput, monthUserInput)}> <RiSearchLine /> </button>
                        {/* <button className='download-report' title='Download PDF'
                            onClick={(event) => downloadPDF(event)}> <RiFileDownloadLine /> </button> */}
                        <button className='download-report' title='Download PDF'
                            onClick={(event) => downloadPDF(event)}> <RiFileDownloadLine /> </button>
                    </form>
                    <div className='max-category-sum'>
                        Most Expend Category: <span>{maxCategory}</span>
                        | With total max Sum of: <span>{maxCategorySum.toLocaleString('en-US')}</span>
                    </div>
                </div>
                <table className='value-of-table' id='value-of-table'>
                    <thead>
                        <tr>
                            <th>Category</th>
                            <th>Sum</th>
                            <th>Description</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.length > 0 ? (
                            data.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.category}</td>
                                    <td>{item.sum}</td>
                                    <td>{item.description}</td>
                                    <td>{item.startDate}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan='4'>No data to display</td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <table className='total-sum'>
                    <thead>
                        <tr>
                            <th>
                                TOTAL SUM: {totalSum.toLocaleString('en-US')}
                            </th>
                        </tr>
                    </thead>
                </table>
            </div>
        </section >
    );
}

export default DetailsReport;