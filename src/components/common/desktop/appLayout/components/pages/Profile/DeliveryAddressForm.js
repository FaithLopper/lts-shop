import { Checkbox, Col, Form, Input, Row } from 'antd'
import { TextArea } from 'antd-mobile'
import React from 'react'
import LocationField from '../../../../../entryForm/LocationField'

const DeliveryAddressForm = ({dataDetail,isEdit,formRef,handleSubmit,province,handleLocationChange,district,ward}) => {
  return (
    <Form
            ref={formRef}
            className="checkout checkout__delivery"
            onFinish={handleSubmit}
            id="profile__address"
            initialValues={isEdit? dataDetail :{}}
          >
            <Form.Item
              name="receiverFullName"
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

            <Form.Item
              name="phone"
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
                    onChange={(e) => handleLocationChange(2, e)}
                  />
                </Col>
                <Col span={8}>
                  <LocationField
                    fieldName="districtId"
                    allowClear={true}
                    placeholder="Huyện"
                    options={district}
                    onChange={(e) => handleLocationChange(3, e)}
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

            <Form.Item name="note">
              <TextArea
                className="checkout__input input"
                placeholder="Ghi chú"
              />
            </Form.Item>

            <Form.Item name="isDefault" valuePropName="checked">
              <Checkbox defaultChecked={false}>
                Đặt làm địa chỉ mặc định
              </Checkbox>
            </Form.Item>
          </Form>
  )
}

export default DeliveryAddressForm