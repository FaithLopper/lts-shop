import { Spin, Tabs } from "antd";
import React, { useState } from "react";
import { Avatar, List } from "antd";
import { actions } from "../../../../../../../actions";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import moment from "moment";
import OrderDetail from "./OrderDetail";
const tabLabelContent = [
  { name: "Tất cả", key: 0 },
  { name: "Đang giao", key: 1 },
  { name: "Đã giao", key: 2 },
];

const tabLabel = [
  { name: "Chi tiết tài khoản", key: 0 },
  { name: "Địa chỉ đã lưu", key: 1 },
  { name: "Quản lý đơn hàng", key: 2 },
];

const { TabPane } = Tabs;
const OrderMangement = (props) => {
  const { current } = props;
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [state, setState] = useState(false);
  const [detail, setDetail] = useState({});
  const [listLoading, setListLoading] = useState(false);
  const [detailLoading, setDetailLoading] = useState(false);
  useEffect(() => {
    setListLoading(true);
    getList()
  }, []);

  const getList =()=>{
    dispatch(
      actions.getOrderList({
        params: {},
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
  }

  useEffect(() => {
    if (current !== 2) setState(false);
  }, [current]);

  // console.log(reset,state)
  // console.log(current)

  const handleGoBack =()=>{
    getList()
    if(listLoading === false)
      setState(false)
  }

  const detailHandle = (id) => {
    dispatch(
      actions.getOrderDetail({
        params: {
          id,
        },
        onCompleted: (responseData) => {
          if (responseData.result === true) {
            if (responseData.data) {
              setDetail(responseData.data);
              setState(true);
            }
          }
        },
        onError: (error) => {},
      })
    );
  };
  return (
    <div className="profile__container">
      {
        state?   <div className="profile__breadcrumb" onClick={()=>handleGoBack()}>
        <i class="uil uil-arrow-circle-left"></i> Quay lại
      </div>:<></>
      }
    

      <div className="content__title">Quản lí đơn hàng </div>

      {listLoading ? (
        <Spin size="large" />
      ) : state === false ? (
        <Tabs
          tabPosition="top"
          tabBarStyle={{ width: "800px" }}
          defaultActiveKey={0}
          tabBarGutter={200}
          style={{
            minHeight: 900,
          }}
        >
          {tabLabelContent.map((item) => (
            <TabPane tab={item.name} key={item.key}>
              <List
                itemLayout="horizontal"
                bordered
                size="large"
                dataSource={data}
                renderItem={(item) => {
                  let check = moment(item.createdDate, "DD-MM-YYYY");
                  let day = check.format("DD"); // => ('Monday' , 'Tuesday' ----)
                  let month = check.format("MMMM"); // => ('January','February.....)
                  let year = check.format("YYYY"); // => ('2012','2013' ...)
                  let date = `${month} ${day}, ${year}`;
                  return (
                    <List.Item>
                      <List.Item.Meta
                        title={`Tên người nhận: ${item.receiverFullName} | Số điện thoại: ${item.phone}`}
                        description={
                          <div>
                            Mã đơn: {item.id}
                            <br />
                            Ngày tạo : {date} <br />
                            Địa chỉ cụ thể: {item.addressDetails}
                            <br />
                            Ghi chú: {item.note}
                          </div>
                        }
                      />
                      <div
                        style={{
                          cursor: "pointer",
                          textDecoration: "underline",
                        }}
                        onClick={() => detailHandle(item.id)}
                      >
                        Chi tiết
                      </div>
                    </List.Item>
                  );
                }}
              />
            </TabPane>
          ))}
        </Tabs>
      ) : (
        <OrderDetail data={detail} />
      )}
    </div>
  );
};

export default OrderMangement;
