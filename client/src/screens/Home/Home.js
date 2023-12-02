import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSocketContext } from "../../contexts/SocketContext";
import './home.css'
import Box from "@mui/material/Box";
import Button from 'react-bootstrap/Button'
import TextField from "@mui/material/TextField";

import AddIcon from "@mui/icons-material/Add";
import NumbersIcon from "@mui/icons-material/Numbers";
import Divider from "@mui/material/Divider";
import Snackbar from "@mui/material/Snackbar";
import Slide from "@mui/material/Slide";
import Logo from "../../logo.png";
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import bgImage from '../../bg.jpg'
import logo from './logo.png'
import Card from 'react-bootstrap/Card'
import MainHeader from "../../components/MainHeader";
import Footer from "../../components/Footer";
import { FaStarOfLife } from "react-icons/fa";
import { AiOutlineEnter } from 'react-icons/ai'
import PickRoomNumberModal from "../../components/PickRoomNumberModal";
import AutohideToast from "../../components/AutoHideToast";
import { TypeAnimation } from 'react-type-animation'
const App = () => {
  const [roomID, setRoomId] = useState();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [showRoomModal, setShowRoomModal] = useState(false);
  const userSocket = useSocketContext();

  let navigate = useNavigate();

  function joinRoom(e, enteredRoomId) {
    e.preventDefault();
    if (roomID) {
      userSocket.emit("joinRoom", { roomID });
    } else {
      setOpenSnackbar(true);
    }
  }
  function createRoomAndJoin() {
    userSocket.emit("createRoom");
  }
  function handleClose() {
    setOpenSnackbar(false);
  }

  useEffect(() => {
    userSocket.on("user-joined-to-room", (msg) => {
      navigate(`/room/${msg.roomId}`);
    });
  }, [userSocket, navigate]);

  return (
    <>
      <div className="" style={{ position: "fixed", zIndex: 999999, width: "100%", bottom: 0, right: 0 }}>
        <AutohideToast show={openSnackbar} setShow={setOpenSnackbar} message={"شناسه اتاق را وارد کنید"} />
      </div>

      <MainHeader />


      <Container fluid className={'home_fluid_container'}>
        <Container>


          <div className="py-2"></div>
          <Row className="justify-content-md-center mb-5">
            <Col xs={12} md={5} >
              <div className="heading-box mt-5">

                <TypeAnimation
                  sequence={[
                    // Same String at the start will only be typed once, initially
                    'تماس تصویری',
                    700,
                    'اشتراک صفحه نمایش',
                    700,
                    'پخش ویدیو',
                    700,
                    'تخته وایت برد مجازی',
                    700,
                    'ارسال پیام',
                    700,

                  ]}
                  speed={50}
                  style={{ fontSize: '1.5em' }}
                  repeat={Infinity}
                />
                <div className="py-2"> </div>
                <Button variant="warning" className="my-3" onClick={createRoomAndJoin}>ساخت اتاق جدید<AddIcon /></Button>
                <Button variant="warning" className="my-3" onClick={() => setShowRoomModal(!showRoomModal)}> <span className="me-4">پیوستن به اتاق</span> <AiOutlineEnter /></Button>


              </div>
            </Col>
          </Row>
          <div className="py-1"></div>

          <Container className="how-to-box mt-5">

            <Row  >
              <Col xs={12}>
                <div >
                  <h5 className="text-dark ms-4">امکانات سایت</h5>

                </div>
              </Col>
            </Row>
            <Row className="first-how">
              <Col xs={12} md={8}>
                <div >
                  <ul>
                    <li>رابط کاربری ساده و روان</li>
                    <li>امکان برقراری ارتباط متنی با سایر کاربران</li>
                    <li>امکان برقراری ارتباط صوتی و تصویری با سایر کاربران</li>
                    <li>امکان اشتراک صفحه نمایش برای سایر کاربران</li>
                    <li>پخش همزمان ویدیو برای کاربران اتاق بصورت همزمان</li>
                    <li>امکان نوشتن بر روی تحته وایت برد مجازی</li>
                    <li>امکان جستجوی ویدیو </li>
                    <li>سرویس  پیشنهاد ویدیو بر اساس علاقه کاربر</li>
                    <li>نمایش اتاق های ساخته شده توسط کاربران</li>

                  </ul>
                </div>
              </Col>
              <Col xs={12} md={4}>
                <div className="text-start py-2 py-md-0">
                  <p> مناسب برای مراکز آموزشی رسمی و کاربردی، صنایع و کسب و کارها در ابعاد کوچک تا بزرگ، سازمان‌ها، مدرسین و متخصصین. اجرای آموزش‌های آکادمیک، آموزش کاربردی و مهارتی، مباحث توسعه فردی، آموزش‌های منابع انسانی (پیش از استخدام، آموزش‌های شروع کار، آموزش‌های ضمن کار و ...) در این سیستم قابل پیاده‌سازی است</p>

                </div>
              </Col>
            </Row>
            <Row >
              <Col md={4}>
                <div className="how-to-level">1-
                  <span>یک اتاق بسازید</span>
                </div>
              </Col>
              <Col md={4}>
                <div className="how-to-level">2-
                  <span>کد اتاق را به اشتراک بگذارید</span>
                </div>
              </Col>
              <Col md={4}>
                <div className="how-to-level">3-
                  <span>با یکدیگر ارتباط بگیرید  </span>
                </div>
              </Col>

            </Row>

            <Row className="my-3 ">
              <Col md={3} xs={12} className="mb-2">
                <Card
                  bg={"light"}
                  key={"light"}
                  text={"dark"}

                  className="mb-2  h-100"
                >

                  <Card.Body>

                    <Card.Text>
                      این سایت یکی از بهترین سایت ها برای برقراری تماس صوتی و تصویری است . من معمولا از این سایت برای برگزاری جلسات گروهی شرکت استفاده میکنم
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    <small className="text-muted">محمد</small>
                  </Card.Footer>
                </Card>
              </Col>
              <Col md={3} xs={12} className="mb-2">
                <Card
                  bg={"light"}
                  key={"light"}
                  text={"dark"}

                  className="mb-2  h-100"
                >

                  <Card.Body>

                    <Card.Text>


                      من معمولا با دوستان برای تماشای فیلم و سریال از این سایت استفاده میکنیم . به دلیل رابط کاربری مناسب  کارکردن با این سایت بسیار لذت بخش بود

                    </Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    <small className="text-muted">معین</small>
                  </Card.Footer>
                </Card>
              </Col>
              <Col md={3} xs={12} className="mb-2">
                <Card
                  bg={"light"}
                  key={"light"}
                  text={"dark"}

                  className="mb-2  h-100"
                >

                  <Card.Body>

                    <Card.Text>
                      برای برقراری تماس تصویری با دوستانم به مشکل خورده بودم اما بخش پشتیبانی این سایت کاملا مشکل من رو حل کرد . پاسخگویی بسیار سریعی داشتند
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    <small className="text-muted">محسن</small>
                  </Card.Footer>
                </Card>
              </Col>
              <Col md={3} xs={12} className="mb-2">
                <Card
                  bg={"light"}
                  key={"light"}
                  text={"dark"}

                  className="mb-2 h-100"
                >

                  <Card.Body>

                    <Card.Text>
                      تجربه تماشای همزمان ویدیو با دوستان و امکان گفتگو متنی و صوتی همزمان با آن ها تجربه جالبی بود. پروسه ایجاد اتاق و اشتراک آن بسیار ساده و راحت بود استفاده از این سایت را پیشنهاد میکنم
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    <small className="text-muted">سیاوش </small>
                  </Card.Footer>
                </Card>
              </Col>
            </Row>

            <Row >
              <Col xs={12}>
                <div className="bg-light border p-2 rounded text-dark">
                  <span className="me-1"><FaStarOfLife /></span>
                  این سامانه برای هر شخص حقیقی و حقوقی که بخواهد مجموعه‌ای از دوره‌های آموزشی را به صورت مجازی ارائه نماید، مناسب است. اساتید در حوزه‌های علمی و مهارتی می‌توانند از این نرم‌افزار به عنوان زیرساخت ارائه آموزش‌های خود در بستر وب استفاده کنند. همه سازمان‌ها و کسب و کارهایی که موضوع آموزش برای آنها دارای اهمیت است، می‌توانند برای آموزش منابع انسانی خود یا مشتریان، قشر مخاطبان و ذینفعان، این سامانه را به عنوان راه حل انتخاب نمایند.
                </div>
              </Col>
            </Row>

          </Container>


          {/* <form onSubmit={joinRoom}>
            <TextField
              value={roomID}
              onChange={(e) => setRoomId(e.target.value)}
              fullWidth
              margin="normal"
              id="outlined-basic"
              label="Room Id"
              variant="outlined"
              />
            <Button fullWidth variant="contained" type="submit">
              <NumbersIcon />
              Join Room
            </Button>
          </form>
          <Divider variant="middle" style={{ margin: "1rem 0" }} />

      
        <Snackbar
          open={openSnackbar}
          onClose={handleClose}
          TransitionComponent={Slide}
          message="Enter room id"
          key={Slide.name}
          anchorOrigin={{ horizontal: "center", vertical: "top" }}
          fullWidth
          /> */}


        </Container>

        <div className="py-5"></div>
        <div className="py-5"></div>




        <PickRoomNumberModal showRoomModal={showRoomModal} setShowRoomModal={setShowRoomModal} roomID={roomID} setRoomId={setRoomId} joinRoom={joinRoom} />
      </Container>
      <Footer />






    </>
  );
};

export default App;
