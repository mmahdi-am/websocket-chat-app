import React, { useEffect, useState } from 'react'
import Footer from '../../components/Footer'
import MainHeader from '../../components/MainHeader'
import { BiIdCard, BiUserCircle, BiTime } from "react-icons/bi";
import { Link } from 'react-router-dom';
function Rooms() {
    const [rooms, setRooms] = useState([])

    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER}/rooms`)
            .then(res => res.json())
            .then(data => {
                console.log(data)

                setRooms(data)
            })
            .catch(e => console.log(e))

    }, [])
    return (
        <>
            <MainHeader />
            <div className='about_fluid_container'>
                <div className='py-5'></div>
                <div className='py-5'></div>

                <div className='container'>
                    <div className="row">

                        {Object.keys(rooms).filter(Number).length > 0 ? Object.keys(rooms).filter(Number).map((key, index) => {
                            return (
                                <div className="col-sm-4">
                                    <div className="card mb-3" key={index}>
                                        <div className="card-body">

                                            <div className='d-flex my-2'>
                                                <span className='me-2'> <BiIdCard /> </span><p className="card-text">شناسه اتاق : {key}</p>
                                            </div>
                                            <div className='d-flex my-2'>
                                                <span className='me-2'> <BiUserCircle /> </span>
                                                <p className="card-text">تعداد افراد حاضر در اتاق : {rooms[key]["length"]}</p>
                                            </div>

                                            <Link to={`/room/${key}`} className="btn btn-primary w-100">ورود به اتاق</Link>
                                        </div>
                                    </div>
                                </div>
                            )
                        }) :   <h3 className='text-white border p-5 mx-auto w-50 text-center'>اتاقی جهت نمایش وجود ندارد!</h3>}


                    </div>

                </div>


                <div className='py-5'></div>
                <div className='py-5'></div>
                <div className='py-5'></div>
                <div className='py-5'></div>
            </div>
            <Footer />
        </>



    )
}

export default Rooms