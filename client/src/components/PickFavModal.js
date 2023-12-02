import { useState ,useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React from 'react';
import Form from 'react-bootstrap/Form'
function PickFavModal({show,onHide,setPickedFav,PickedFav,setShowPickFav}) {

    const [categories, setCategories] = useState([]);
    const [pickedFavInside,setPickedFavInside] = useState({name: 'مالی و اقتصادی', catId: '28'})
    console.log(pickedFavInside)
    const formFavHandler = (e) =>{
        e.preventDefault()
        setPickedFav(pickedFavInside)
        setShowPickFav((p)=>!p)
    }

 

    useEffect(() => {
      setPickedFav(pickedFavInside)
      fetch(`${process.env.REACT_APP_SERVER}/getallcategories`)
        .then((res) => res.json())
        .then((data) => {
          setCategories(data.categories);
  
          console.log(data);
        });

    }, []);


  return (
    <Modal  
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header >
        <Modal.Title id="contained-modal-title-vcenter" className='text-center'>
          نوع علاقه مندی خود را انتخاب کنید
          
          
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Form onSubmit={formFavHandler}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <div className=' row' name="" id="" value={PickedFav} onChange={(e)=>{setPickedFavInside(JSON.parse(e.target.value));}}>

      {categories && 
            categories.map((category) => (
              <>  
              <div className='col-6' >
                    <input className='mx-1' name='selection' type="radio" value={JSON.stringify({name:category.name,catId:category.id})} id={category.name} />
                    <label className='mx-1' htmlFor={category.name}>{category.name}</label>
                    <img  className='mx-1 d-none d-md-auto' src={category.imgSrc}  alt="" style={{width:60,height:60}} />
              </div>
                 
            
              </>
             
            ))}
            </div>
      </Form.Group>
      <Button variant="primary" type="submit" onClick={()=>setPickedFav(PickedFav)}>
        تایید
      </Button>
    </Form>
      </Modal.Body>
    </Modal>
  );
}

export default PickFavModal