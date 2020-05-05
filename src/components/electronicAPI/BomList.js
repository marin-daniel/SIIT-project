import React, { useEffect, useState} from 'react';
import jsPDF from 'jspdf'
import 'jspdf-autotable'

function BomList({ partsList, partID, deletePart, clearList }) {

    const [items, setItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState([]);

    useEffect(() => {
        const newItems = [];
        const newTotalPrice = [];

        for (const part of partsList) {
            for (const id in partID) {
                if (id === part.id) {
                    newItems.push(
                        <tr key={id}>
                            <td>{part.translatedManufacturerPartNumber}</td>
                            <td>{partID[id]}</td>
                            <td>{part.prices[0].cost}</td>
                            <td>{(partID[id] * part.prices[0].cost).toFixed(2)}</td>
                            <td>{<button className='delete-from-BOM' onClick={(e) => deletePart(id)}>
                                <img src='./images/delete_icon.png' alt='delet-icon'></img>
                            </button>}
                            </td>
                        </tr>)

                    newTotalPrice.push(partID[id] * part.prices[0].cost);
                }

            }
        }
        setItems(newItems);
        setTotalPrice(newTotalPrice.reduce((totalValue, currentValue) => totalValue + currentValue, 0).toFixed(2));

    }, [partID]);



    function handleSave(e) {
        const doc = new jsPDF()
        doc.autoTable({ html: '#bomList' })
        doc.save('table.pdf')
    }

    return (

        <section className='bomSection'>
            <div className='side-container'>
                <h3 className='text-align-center'> Create BOM list</h3>
                {(items.length ?
                    <table id='bomList' className='BOM-list-table'>
                        <thead  className='table-heading'>
                            <tr>
                                <th scope="col">Part No</th>
                                <th scope="col">Qty</th>
                                <th scope="col">Price/PC</th>
                                <th scope="col">Total</th>
                            </tr>
                        </thead>
                        <tbody >

                            {items}

                        </tbody>
                        <tfoot >
                            <tr>
                            <td colSpan={5}><h4>Total fara TVA: {totalPrice} RON</h4></td>
                            </tr>
                            <tr>
                            <td colSpan={5}><h4>TVA: {(totalPrice * 0.19).toFixed(2)} RON</h4></td>
                            </tr>
                            <tr>
                            <td colSpan={5}><h3>Total: {(totalPrice * 1.19).toFixed(2)} RON</h3></td>
                            </tr>
                        </tfoot>
                    </table> : <p className='text-align-center'>BOM list empty!</p>)}
                {/* <div className='price-container'>
                    <p>Total fara TVA: {totalPrice} RON</p>
                    <p>TVA: {(totalPrice * 0.19).toFixed(2)} RON</p>
                    <h4>Total: {(totalPrice * 1.19).toFixed(2)} RON</h4>
                </div> */}
                <div className='justify-space-around flex-container'>
                    <button onClick={(e) => clearList()} className='submitButton'>Clear List</button>
                    <button onClick={handleSave} className='submitButton'>Save List</button>
                </div>
            </div>
        </section>
    )
}

export default BomList;