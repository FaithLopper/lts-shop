import React from "react";
import {
  CheckCircleFilled,
  LoadingOutlined,
  SmileOutlined,
  SolutionOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Popover, Result, Steps } from "antd";
import { Link } from "react-router-dom";
import qs from 'query-string';
import { useEffect } from "react";
import { useState } from "react";
import Utils from "../../../../../../../utils";
const { Step } = Steps;
const customDot = (dot, { status, index }) => (
  <Popover
    content={
      <span>
        step {index} status: {status}
      </span>
    }
  >
    {dot}
  </Popover>
);
const Summary = ({history}) => {

  const [info,setInfo]= useState({
    id:null,
    status:null,
    total:null
  })

  useEffect(()=>{
    const queryString= qs.parse(history.location.search)
    const {id,status,total}= queryString
    if(total){
      setInfo(queryString)
    }else{
      window.location.href='/cart'
    }
  },[])

  return (
    <section className="summary section">
      <div className="summary__container page-wrapper grid">
        <Result
          status="success"
          title="Cảm ơn quý khách, đơn hàng đã đặt thành công."
          subTitle={[
            <div className="summary__process">
              <Steps current={0} progressDot={customDot}>
                <Step
                  title="Chờ xác nhận"
                  description={[<LoadingOutlined />]}
                />
                <Step title="Chờ lấy hàng" />
                <Step title="Đang giao" />
                <Step title="Hoàn thành" />
              </Steps>
            </div>,
            <div className="content__title">Tổng: {Utils.formatMoney(info.total) || 0}</div>,
            <div>Đơn hàng: {info.id}</div>,
            <div>Dự kiến giao từ 9 đến ngày 7 tháng 11 2022.</div>,
          ]}
          extra={[
            <Link to="/" className="login__button round-button">
              Tiếp tục mua hàng
            </Link>,
          ]}
        />
      </div>
    </section>
  );
};

export default Summary;
