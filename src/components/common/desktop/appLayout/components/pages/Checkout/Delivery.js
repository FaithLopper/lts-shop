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
      customerName: "Nh?? ri??ng",
      phone: "0946220172",
      address:
        "1 ??. V?? V??n Ng??n, Linh Chi???u, Th??nh Ph??? Th??? ?????c, Th??nh ph??? H??? Ch?? Minh",
    },
    {
      customerName: "C?? quan",
      phone: "0946220172",
      address:
        "135 ??. Nam K??? Kh???i Ngh??a, Ph?????ng B???n Th??nh, Qu???n 1, Th??nh ph??? H??? Ch?? Minh",
    },
    {
      customerName: "Tr?????ng h???c",
      phone: "0946220172",
      address:
        "215/145 Nguy???n X??, Ph?????ng 13, Qu???n B??nh Th???nh, Th??nh ph??? H??? ch?? Minh",
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
            B???n mu???n nh???n ????n h??ng nh?? th??? n??o?
          </div>
          <Button className="big-button round-button-white">
            <i className="bx bx-package checkout__icon-big"></i>
            <span>Giao h??ng</span>
          </Button>
          <div className="checkout__redirect">
            <Link to="/register" className="round-button-white">
              Tr??? th??nh th??nh vi??n
            </Link>
            <Link to="/login" className="round-button-white">
              ????ng nh???p
            </Link>
          </div>
        </div>

        <div className="checkout__part-info">
          <div className="content__title">Nh???p t??n v?? ?????a ch???</div>
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
              placeholder="T??n ng?????i nh???n"
            />
          </Form.Item>

         

          <Form.Item name="note">
            <TextArea className="checkout__input input" placeholder="Ghi ch??" />
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
                placeholder="?????a ch??? c??? th???"
              />
          </Form.Item>

            <div className="location-field">
            <Row gutter={16}>
            <Col span={8}>
            <LocationField
                fieldName="provinceId"
                placeholder="T???nh"
                allowClear={true}
                options={province}
                onChange={(e)=> handleLocationChange(2,e)}
              />
           
             
            </Col>
            <Col span={8}>
            <LocationField
                fieldName="districtId"
                allowClear={true}
                placeholder="Huy???n"
                options={district}
                onChange={(e)=> handleLocationChange(3,e)}
              />
            </Col>
            <Col span={8}>
            <LocationField
                fieldName="wardId"
                placeholder="X??"
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
                  placeholder="M?? b??u ??i???n"
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
                  placeholder="T??n th??nh ph???"
                />
              </Form.Item>
            </Col>
          </Row> */}
          <Input
            value="Vi???t Nam"
            className="checkout__input input"
            suffix={<span className="checkout__dot"></span>}
          />
        </div>

        <div className="checkout__part-info">
          <div className="content__title">Th??ng tin li??n h???</div>
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
              placeholder="S??? ??i???n tho???i"
              maxLength={10}
            />
          </Form.Item>

          {/* <Form.Item name="keep-login">
            <div className="login__option">
              <input type="checkbox" className="checkout__checkbox" />
              <label>
                <div className="login__policy">
                  T??i ???? ?????c <Link to="#">Ch??nh s??ch b???o m???t</Link> v??{" "}
                  <Link to="#">??i???u kho???n s??? d???ng</Link> c???a c???a h??ng v?? ?????ng ??
                  ????? x??? l?? th??ng tin c???a t??i theo Cam k???t b???o m???t c???a c???a h??ng
                </div>
              </label>
            </div>
          </Form.Item> */}
        </div>

        <div className="checkout__part-info">
          <button className="round-button" type="submit">
            Ti???p t???c
          </button>
        </div>
      </div>
    </Form>
  );
};

export default Delivery;
