import React, { useState } from 'react'
import MainHeader from '../../components/MainHeader'
import Footer from '../../components/Footer'
import Alert from 'react-bootstrap/Alert'
import './about.css'
import bgimg from '../../bg.jpg'
function Contact() {
  const [fetchMessage, setFeetchMessage] = useState("")
  const handleForm = (e) => {
    e.preventDefault()
    fetch(`${process.env.REACT_APP_SERVER}/contact`, {
      method: 'POST',
      body: JSON.stringify({
        fname: e.target.elements.form_name.value,
        lname: e.target.elements.form_lastname.value,
        subject: e.target.elements.form_need.value,
        message: e.target.elements.form_message.value,
        email: e.target.elements.form_email.value

      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      }
    }).then(res => res.json()).then(data => {
      setFeetchMessage(data.msg)
    }).catch(e => {
      console.log(e)
    })
  }
  return (
    <>
      <div className='about_fluid_container'>

        <MainHeader />
        <div className="container  " >
          <div className=" text-center mt-5 ">
            <h1 className='text-white' >ارتباط با ما</h1>
          </div>
          <div className="row ">
            <div className="col-lg-7 mx-auto">
              {fetchMessage && (
                <Alert variant={"info"} className="" onClose={() => false} dismissible>
                  {fetchMessage}
                </Alert>
              )}
              <div className="card mt-2 mx-auto p-4 bg-light">
                <div className="card-body bg-light">
                  <div className="container">
                    <form id="contact-form" onSubmit={(e) => handleForm(e)} role="form">
                      <div className="controls">
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label for="form_name">نام</label>
                              <input id="form_name" type="text" name="name" className="form-control" placeholder="لطفا نام خود را وارد کنید " required="required" data-error="Firstname is required." />

                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label for="form_lastname">نام خانوادگی</label>
                              <input id="form_lastname" type="text" name="surname" className="form-control" placeholder="لطفا نام خانوادگی خود را وارد کنید" required="required" data-error="Lastname is required." />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label for="form_email">ایمیل</label>
                              <input id="form_email" type="email" name="email" className="form-control" style={{ textAlign: 'right' }} placeholder="لطفا ایمیل خود را وارد کنید " required="required" data-error="Valid email is required." />

                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label for="form_need">موضوع</label>
                              <select id="form_need" name="need" className="form-control" required="required" data-error="Please specify your need.">
                                <option value="" selected disabled>----انتخاب موضوع----</option>
                                <option >نحوه کار با سایت</option>
                                <option >پیشنهاد همکاری</option>
                                <option >تبلیغات</option>
                                <option >سایر</option>
                              </select>

                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-12">
                            <div className="form-group">
                              <label for="form_message">پیام</label>
                              <textarea id="form_message" name="message" className="form-control" placeholder="لطفا پیام خود وارد کنید" rows="4" required="required" data-error="Please, leave us a message."></textarea
                              >
                            </div>

                          </div>


                          <div className="col-md-12 text-center my-4">

                            <input type="submit" className="btn btn-success btn-send  pt-2 btn-block " value="ارسال" />

                          </div>

                        </div>


                      </div>
                    </form>
                  </div>
                </div>


              </div>


            </div>


          </div>
          <div className=" py-5"></div>
          <div className=" py-5"></div>
          <div className=" py-5"></div>
          <div className=" py-5"></div>
          <div className=" py-5"></div>
        </div>

        <Footer />
      </div>
    </>
  )
}

export default Contact 