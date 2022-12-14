import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { actions } from "../../../../../../../actions";
import { useDispatch } from "react-redux";
import { Button, Checkbox, Col, Form, Input, Modal, Row, Spin } from "antd";
import { useRef } from "react";
import {
  showErrorMessage,
  showSucsessMessage,
} from "../../../../../../../services/notifyService";
import { createRef } from "react";
import DeliveryAddressForm from "./DeliveryAddressForm";
const DeliveryAddress = () => {
  const dispatch = useDispatch();
  const [listLoading, setListLoading] = useState(true);
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [province, setProvince] = useState([]);
  const [district, setDistrict] = useState([]);
  const [ward, setWard] = useState([]);
  const [isEdit, setEdit] = useState(false);
  const [dataDetail, setDetail]= useState({})

  const formRef = useRef();
  // const formRef = createRef()
  useEffect(() => {
    setListLoading(true);
    getList();
  }, []);

  const getList = () => {
    const { id } = actions.getUserData();
    dispatch(
      actions.getAddressList({
        params: { customerId: id },
        onCompleted: (responseData) => {
          if (responseData.result === true) {
            if (responseData.data) {
              if (responseData.data.data.length !== 0) {
                setData(responseData.data.data);
                setListLoading(false);
              }
            }
          }
        },
        onError: (error) => {
          setListLoading(false);
        },
      })
    );
  };

  const showModal = () => {
    getLocation({
      params: {
        kind: 1,
        size: 100,
      },
      onCompleted: (data) => handleLocationData(data),
      onError: () => {},
    });
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    formRef.current.setFieldsValue({});
    setEdit(false)
    setIsModalOpen(false);
  };

  const getLocation = (payload) => {
    dispatch(actions.getLocation(payload));
  };

  const handleLocationChange = (type, key) => {
    if (key !== undefined) {
      if (type === 2) {
        setDistrict([]);

        getLocation({
          params: {
            kind: type,
            size: 100,
            parentId: key,
          },
          onCompleted: (data) => {
            formRef.current.setFieldsValue({ ["districtId"]: undefined });
            formRef.current.setFieldsValue({ ["wardId"]: undefined });
            handleLocationData(data);
          },
          onError: () => {},
        });
      }
      if (type === 3) {
        setWard([]);
        getLocation({
          params: {
            kind: type,
            size: 100,
            parentId: key,
          },
          onCompleted: (data) => {
            formRef.current.setFieldsValue({ ["wardId"]: undefined });
            handleLocationData(data);
          },
          onError: () => {},
        });
      }
    }
  };

  const handleLocationData = (responseData) => {
    if (responseData.result) {
      if (responseData.data) {
        if (responseData.data.data.length !== 0) {
          const { data } = responseData.data;
          if (responseData.data.data[0].kind === 1) {
            setProvince([
              ...data.map((item) => {
                return {
                  value: item.name,
                  key: item.id,
                };
              }),
            ]);
          }

          if (responseData.data.data[0].kind === 2) {
            setDistrict([
              ...data.map((item) => {
                return {
                  value: item.name,
                  key: item.id,
                };
              }),
            ]);
          }

          if (responseData.data.data[0].kind === 3) {
            setWard([
              ...data.map((item) => {
                return {
                  value: item.name,
                  key: item.id,
                };
              }),
            ]);
          }
        }
      } else {
        console.log(responseData);
      }
    }
  };

  const handleSubmit = (formValues) => {
    dispatch(
      actions.createAddress({
        params: {
          ...formValues,
          isDefault: formValues.isDefault ? formValues.isDefault : false,
        },
        onCompleted: (responseData) => {
          if (responseData.result === true) {
            showSucsessMessage("Thêm địa chỉ thành công");
          }
        },
        onError: (error) => {
          setListLoading(false);
        },
      })
    );
  };

  const handleEdit = (id) => {
    dispatch(
      actions.getAddressById({
        params: {
          id,
        },
        onCompleted: (responseData) => {
          if (responseData.result === true) {
            setDetail(responseData.data)
            setEdit(true)
            showModal();
            // formRef.current.setFieldsValue({ ...responseData.data });
          }
        },
        onError: (error) => {
          showErrorMessage(error.message);
        },
      })
    );
  };
  return (
    <>
      <div className="profile__container">
        <div className="content__title">Địa chỉ giao hàng đã lưu</div>
        <Modal
          title={isEdit?"Chỉnh sửa địa chỉ" :"Thêm địa chỉ" }
          open={isModalOpen}
          onOk={handleOk}
          className="address__modal "
          onCancel={handleCancel}
          okButtonProps={{
            htmlType: "submit",
            form: "profile__address",
          }}
          width={600}
        >
          <DeliveryAddressForm
            formRef={formRef}
            handleSubmit={handleSubmit}
            handleLocationChange={handleLocationChange}
            province={province}
            district={district}
            ward={ward}
            dataDetail={dataDetail}
            isEdit={isEdit}
          />
        </Modal>
        <div className="profile__body">
          {listLoading ? (
            <Spin size="large" />
          ) : (
            <>
              {data.length !== 0 ? (
                <div className="profile__addresss">
                  {data.map((item) => {
                    return (
                      <div className="profile__address-item grid">
                        <div>
                          <div>{item.receiverFullName}</div>
                          <div>{item.addressDetails}</div>
                          <div>
                            {item.ward +
                              ", " +
                              item.district +
                              ", " +
                              item.province}
                          </div>
                          <div>{item.phone}</div>
                        </div>
                        <div
                          style={{
                            color: "black",
                            textDecoration: "underline",
                            fontSize: "0.8rem",
                            cursor: "pointer",
                          }}
                          onClick={() => handleEdit(item.id)}
                        >
                          Sửa
                        </div>
                      </div>
                    );
                  })}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "right",
                    }}
                  >
                    <Button
                      className="round-button"
                      onClick={() => showModal()}
                    >
                      Thêm địa chỉ
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="profile__addresss add__option">
                  <div style={{ fontSize: "1rem" }}>
                    Bạn hiện không có bất kỳ địa chỉ giao hàng đã lưu nào. Hãy
                    thêm một địa chỉ vào đây để được điền trước để thanh toán
                    nhanh hơn.
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "right",
                    }}
                  >
                    <Button
                      className="round-button"
                      onClick={() => showModal()}
                    >
                      Thêm địa chỉ
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default DeliveryAddress;
