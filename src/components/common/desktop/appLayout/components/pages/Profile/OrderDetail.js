import React from "react";
import { useEffect } from "react";
import Utils from "../../../../../../../utils";
const OrderDetail = (props) => {
  const { data } = props;

  function toPlainString(num) {
    return ("" + +num).replace(
      /(-?)(\d*)\.?(\d*)e([+-]\d+)/,
      function (a, b, c, d, e) {
        return e < 0
          ? b + "0." + Array(1 - e - c.length).join(0) + c + d
          : b + c + d + Array(e - d.length + 1).join(0);
      }
    );
  }

  useEffect(()=>{
    let items= document.getElementsByClassName("bill__row")
    items[items.length-1].classList.add("bill__end")
  },[])

  return (
    <div>
      {data ? (
        <div className="order__detail grid">
          <div className="order__detail-header">
            <div>Mã đơn: {data.id}</div>
            <div>Ngày tạo đơn: {data.createdDate}</div>
            <br/>
          </div>
          <div className="order__detail-body grid">
            <div className="detail__content">
              <div style={{fontSize:"1.3rem"}}>Hoá đơn đến</div> <br/>
              <div>{data.receiverFullName}</div>
              <div>Địa chỉ: {data.addressDetails}</div>
              <div>{data.ward + ", " + data.district + ", " + data.province}</div>
              <div> </div> <br/>
              <div>Số điện thoại: {data.phone}</div>
              <div>Ghi chú: {data.note}</div>
            </div>
            <div className="detail__content">
              <div style={{fontSize:"1.3rem"}}>Giao hàng đến</div> <br/>
              <div>{data.receiverFullName}</div>
              <div>Địa chỉ: {data.addressDetails}</div>
              <div>{data.ward + ", " + data.district + ", " + data.province}</div>
              <div> </div> <br/>
              <div>Số điện thoại: {data.phone}</div>
              <div>Ghi chú: {data.note}</div>
            </div>
            <div className="detail__content">
              <div style={{fontSize:"1.3rem"}}> Hình thức thanh toán: </div> <br/>
              {data.paymentMethod === 3 ? " COD" : <></>}
              {data.paymentMethod === 2 ? " PAYPAL" : <></>}
              {data.paymentMethod === 1 ? " CARD" : <></>}
            </div>
          </div>
          <div className="order__detail-footer">
            <table className="order__bill">
              <tr>
                <th>Số lượng</th>
                <th>Chi tiết sản phẩm</th>
                <th>Giá</th>
                <th >Tổng</th>
              </tr>
              {data.orderItems.lenght !== 0 ? (
                data.orderItems.map((item) => {
                  return (
                    <tr className="bill__row">
                      <td>{item.quantity}</td>
                      <td style={{textAlign:"left"}}>
                        {item.productName} | {" "}
                        {item.extraVariant.lenght !== 0 ? (
                          item.extraVariant.map((variant) => (
                            <>{variant.variants.map(x => x.name)} <span>{" "}</span></>
                          ))
                        ) : (
                          <></>
                        )}
                      </td>
                      <td>{Utils.formatMoney(toPlainString(item.price))}</td>
                      <td></td>
                    </tr>
                  );
                })
              ) : (
                <></>
              )}
              <tr>
                <td></td>
                <td></td>
                <td style={{fontWeight:"bold"}}>Tổng phụ</td>
                <td style={{fontWeight:"bold"}}>{Utils.formatMoney(toPlainString(data.subTotal))}</td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td>Phí ship</td>
                <td>{Utils.formatMoney(toPlainString(data.shippingCharge))}</td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td style={{fontWeight:"bold"}}>Tổng</td>
                <td style={{fontWeight:"bold"}}>{Utils.formatMoney(toPlainString(data.subTotal))}</td>
              </tr>
            </table>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default OrderDetail;
