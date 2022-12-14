import { Form, Input, Row, Col, Button, AutoComplete } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Option } from "antd/lib/mentions";
import TextArea from "antd/lib/input/TextArea";
import LocationField from "../../../../../entryForm/LocationField";
import { useEffect } from "react";

const Delivery = ({ formRef, onNext, setFormData, scrollTop,getLocation }) => {

  const [province,setProvince]= useState([])
  const [district,setDistrict]= useState([])
  const [ward,setWard]= useState([])

  useEffect(()=>{
    getLocation({
      params:{
        kind:1,
        size:100
      },
      onCompleted:(data)=>handleLocationData(data),
      onError:()=>{}
    })
  },[])
  
  const handleLocationChange =(type,key)=>{
    if(key !== undefined){
      if(type === 2){
        setDistrict([])

        getLocation({
          params:{
            kind:type,
            size:100,
            parentId:key
          },
          onCompleted:(data)=>{
              formRef.current.setFieldsValue({["districtId"]: undefined})
              formRef.current.setFieldsValue({["wardId"]: undefined})  
            handleLocationData(data)
          },
          onError:()=>{}
        })
      }   
      if(type === 3){
        setWard([])
        getLocation({
          params:{
            kind:type,
            size:100,
            parentId:key
          },
          onCompleted:(data)=>{
              formRef.current.setFieldsValue({["wardId"]: undefined})
            handleLocationData(data)
          },
          onError:()=>{}
        })
      }  
    }
  }

  const  handleLocationData =(responseData)=>{ 
    if(responseData.result){
      
        if(responseData.data){
          if(responseData.data.data.length !== 0){
            const {data}= responseData.data
            if(responseData.data.data[0].kind === 1){
              setProvince([...data.map(item =>{
                return {
                    value:item.name,
                    key:item.id
                }
              })])
            }

            if(responseData.data.data[0].kind === 2){
              setDistrict([...data.map(item =>{
                return {
                    value:item.name,
                    key:item.id
                }
              })])
            }

            if(responseData.data.data[0].kind === 3){
              setWard([...data.map(item =>{
                return {
                    value:item.name,
                    key:item.id
                }
              })])
            }
          }
        }else{
          console.log(responseData)
        }
    }
  }


  const address = [
    {
      customerName: "Nhà riêng",
      phone: "0946220172",
      address:
        "1 Đ. Võ Văn Ngân, Linh Chiểu, Thành Phố Thủ Đức, Thành phố Hồ Chí Minh",
    },
    {
      customerName: "Cơ quan",
      phone: "0946220172",
      address:
        "135 Đ. Nam Kỳ Khởi Nghĩa, Phường Bến Thành, Quận 1, Thành phố Hồ Chí Minh",
    },
    {
      customerName: "Trường học",
      phone: "0946220172",
      address:
        "215/145 Nguyễn Xí, Phường 13, Quận Bình Thạnh, Thành phố Hồ chí Minh",
    },
  ];
  const options = address.map(({ customerName, phone, address }) => ({
    value: address,
    label: (
      <div className="delivery__address">
        <div className="delivery__addresss-address">{address}</div>
        <div className="delivery__addresss-info">
          {customerName} | {phone}
        </div>
      </div>
    ),
  }));
  const handleSubmit = (formValue) => {
    setFormData(formValue, 0);
    onNext(0);
    scrollTop();
  };
  return (
    <Form onFinish={handleSubmit} ref={formRef}>
      <div className="checkout__delivery">
        <div className="checkout__part-info">
          <div className="content__title">
            Bạn muốn nhận đơn hàng như thế nào?
          </div>
          <Button className="big-button round-button-white">
            <i className="bx bx-package checkout__icon-big"></i>
            <span>Giao hàng</span>
          </Button>
          <div className="checkout__redirect">
            <Link to="/register" className="round-button-white">
              Trở thành thành viên
            </Link>
            <Link to="/login" className="round-button-white">
              Đăng nhập
            </Link>
          </div>
        </div>

        <div className="checkout__part-info">
          <div className="content__title">Nhập tên và địa chỉ</div>
          <Form.Item
            name="receiverName"
            rules={[
              {
                type: "text",
                message: "The input is not valid first name!",
              },
              {
                required: true,
                message: "Please input your first name!",
              },
            ]}
          >
            <Input
              type="text"
              className="checkout__input input"
              placeholder="Tên người nhận"
            />
          </Form.Item>

         

          <Form.Item name="note">
            <TextArea className="checkout__input input" placeholder="Ghi chú" />
          </Form.Item>
          <Form.Item
            name="addressDetails"
            rules={[
              {
                type: "text",
                message: "The input is not select address!",
              },
              {
                required: true,
                message: "Please input select address!",
              },
            ]}
          >
              <Input
                type="text"
                className="checkout__input input"
                placeholder="Địa chỉ cụ thể"
              />
          </Form.Item>

            <div className="location-field">
            <Row gutter={16}>
            <Col span={8}>
            <LocationField
                fieldName="provinceId"
                placeholder="Tỉnh"
                allowClear={true}
                options={province}
                onChange={(e)=> handleLocationChange(2,e)}
              />
           
             
            </Col>
            <Col span={8}>
            <LocationField
                fieldName="districtId"
                allowClear={true}
                placeholder="Huyện"
                options={district}
                onChange={(e)=> handleLocationChange(3,e)}
              />
            </Col>
            <Col span={8}>
            <LocationField
                fieldName="wardId"
                placeholder="Xã"
                allowClear={true}
                options={ward}
              />
            </Col>
          </Row>
            </div>
          
          {/* 
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="postalCode"
                rules={[
                  {
                    type: "number",
                    message: "The input is not valid postal code!",
                  },
                  {
                    required: false,
                    message: "Please input your postal code!",
                  },
                ]}
              >
                <Input
                  type="number"
                  maxLength={6}
                  className="checkout__input input"
                  placeholder="Mã bưu điện"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="cityName"
                rules={[
                  {
                    type: "text",
                    message: "The input is not valid city name!",
                  },
                  {
                    required: true,
                    message: "Please input your city name!",
                  },
                ]}
              >
                <Input
                  type="text"
                  className="checkout__input input"
                  placeholder="Tên thành phố"
                />
              </Form.Item>
            </Col>
          </Row> */}
          <Input
            value="Việt Nam"
            className="checkout__input input"
            suffix={<span className="checkout__dot"></span>}
          />
        </div>

        <div className="checkout__part-info">
          <div className="content__title">Thông tin liên hệ</div>
          <Form.Item
            name="email"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
          >
            <Input
              type="email"
              className="checkout__input input"
              placeholder="Email"
            />
          </Form.Item>

          <Form.Item
            name="receiverPhone"
            rules={[
              {
                // type: "number",
                message: "The input is not valid phone number!",
              },
              {
                required: true,
                message: "Please input your phone number!",
              },
            ]}
          >
            <Input
              type="number"
              className="checkout__input input"
              placeholder="Số điện thoại"
              maxLength={10}
            />
          </Form.Item>

          {/* <Form.Item name="keep-login">
            <div className="login__option">
              <input type="checkbox" className="checkout__checkbox" />
              <label>
                <div className="login__policy">
                  Tôi đã đọc <Link to="#">Chính sách bảo mật</Link> và{" "}
                  <Link to="#">Điều khoản sử dụng</Link> của cửa hàng và đồng ý
                  để xử lý thông tin của tôi theo Cam kết bảo mật của cửa hàng
                </div>
              </label>
            </div>
          </Form.Item> */}
        </div>

        <div className="checkout__part-info">
          <button className="round-button" type="submit">
            Tiếp tục
          </button>
        </div>
      </div>
    </Form>
  );
};

export default Delivery;
