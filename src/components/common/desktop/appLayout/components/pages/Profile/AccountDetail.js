import React, { useRef, useState } from 'react'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, message, Spin, Upload } from 'antd';
import { actions } from "../../../../../../../actions";
import { useDispatch } from "react-redux";
import { useEffect } from 'react';
import { showErrorMessage, showSucsessMessage } from '../../../../../../../services/notifyService';

const AccountDetail = () => {
  const dispatch = useDispatch()
  const formRef = useRef();
  const [data, setData]= useState({})
  const [loading, setLoading]= useState(false)
  const [save, setSave]= useState(false)

  useEffect(()=>{
    setLoading(true)
    getDetail()
  },[])

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  };
  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };

  const getDetail = () => {
    dispatch(
      actions.getProfile({
        params: { },
        onCompleted: (responseData) => {
          if (responseData.result === true) {
            if (responseData.data) {
              if (responseData.data) {
                setData({
                  ...responseData.data,
                  fullName:responseData.data.account.fullName,
                  username:responseData.data.account.username,
                  email:responseData.data.account.email,
                  birthday:responseData.data.birthday,
                });
                setLoading(false);
              }
            }
          }
        },
        onError: (error) => {
          showErrorMessage(error.message)
          setLoading(false);
        },
      })
    );
  };

  const handleSubmit = (formValues) => {
    setSave(true)
    dispatch(
      actions.updateProfile({
        params: {
          ...formValues,
        },
        onCompleted: (responseData) => {
          if (responseData.result === true) {
            showSucsessMessage("C???p nh???t th??ng tin t??i kho???n th??nh c??ng");
            setSave(false)
          }
          setSave(false)
        },
        onError: (error) => {
          setSave(false);
        },
      })
    );
  };

  return (
    <div className="profile__container">
           <div className="content__title">Chi ti???t t??i kho???n</div>
        <div className="profile__body">
        {loading ? (
            <Spin size="large" />
          ) : 
            <>
              {Object.keys(data) !== 0 ? <>
                <div className="profile__addresss">
                <Form
            ref={formRef}
            className="checkout checkout__delivery"
            onFinish={handleSubmit}
            id="profile__detail"
            initialValues={Object.keys(data).length !==0 ? data :{}}
          >
            
            <Form.Item
              name="fullName"
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
                placeholder="H??? t??n ng?????i d??ng"
              />
            </Form.Item>

           

            <Form.Item
              name="username"
              rules={[
                {
                  type: "text",
                  message: "The input is not valid first name!",
                },
                {
                  required: false,
                  message: "Please input your first name!",
                },
              ]}
            >
              <Input
                type="text"
                className="checkout__input input"
                placeholder="T??n t??i kho???n"
                disabled
              />
            </Form.Item>
            

            <Form.Item
              name="email"
              rules={[
                {
                  type: "text",
                  message: "The input is not valid first name!",
                },
                {
                  required: false,
                  message: "Please input your first name!",
                },
              ]}
            >
              <Input
                type="text"
                className="checkout__input input"
                placeholder="Email"
                disabled
              />
            </Form.Item>

            <Form.Item
              name="birthday"
              rules={[
                {
                  type: "text",
                  message: "The input is not valid first name!",
                },
                {
                  required: false,
                  message: "Please input your first name!",
                },
              ]}
            >
              <Input
                type="text"
                className="checkout__input input"
                placeholder="Ng??y sinh"
                disabled
              />
            </Form.Item>
            <Form.Item
              name="oldPassword"
              rules={[
                {
                  // type: "number",
                  message: "The input is not valid phone number!",
                },
                {
                  required: true,
                  message: "Please input your old password!",
                },
              ]}
            >
              <Input
                type="password"
                className="checkout__input input"
                placeholder="M???t kh???u c??"
                maxLength={20}
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                {
                  // type: "number",
                  message: "The input is not valid phone number!",
                },
                {
                  required: true,
                  message: "Please input your new password!",
                },
              ]}
            >
              <Input
                type="password"
                className="checkout__input input"
                placeholder="M???t kh???u m???i"
                maxLength={20}
              />
            </Form.Item>
          </Form>
          <div
                    style={{
                      display: "flex",
                      justifyContent: "right",
                    }}
                  >
                    <Button
                      className="round-button"
                      htmlType='submit'
                      form='profile__detail'
                      loading={save}
                    >
                      L??u
                    </Button>
                  </div>
                </div>
              </>:<></>}
            </>
          
          }
        
        </div>
      </div>
  )
}

export default AccountDetail