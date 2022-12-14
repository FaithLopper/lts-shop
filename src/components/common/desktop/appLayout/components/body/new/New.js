import React from "react";
import { AppConstants } from "../../../../../../../constants";
import { Pagination, Spin } from "antd";
import moment from "moment";

const New = (props) => {
  const { newData, pagination, handleTableChange, loading } = props;

  return (
    <section className="new section" id="new">
      <div className="container">
        <h1>TIN TỨC & BÀI VIẾT</h1>
      </div>
      {!loading ? (
        <>
          <div className="new__container container grid">
            {newData.length !== 0 ? (
              newData.map(({ banner, title, description, createdDate, id }) => {
                let check = moment(createdDate);
                let day = check.format("DD"); // => ('Monday' , 'Tuesday' ----)
                let month = check.format("MMMM"); // => ('January','February.....)
                let year = check.format("YYYY"); // => ('2012','2013' ...)
                let date = `${month} ${day}, ${year}`;
                return (
                  <a href={`/news/${id}`} className="new__item" key={title}>
                    <img
                      alt="new"
                      className="new__item-image"
                      src={AppConstants.contentRootUrl + banner}
                    ></img>
                    <div className="new__item-description">{description}</div>
                    <div className="new__item-title">{title}</div>
                    <div className="new__item-createdDate">{date}</div>
                  </a>
                );
              })
            ) : (
              <></>
            )}
          </div>
        </>
      ) : (
        <div className="section__loading container">
          <Spin size="large" />
        </div>
      )}
      <div className="new__pagination">
        <Pagination
          current={pagination.current}
          onChange={handleTableChange}
          defaultCurrent={1}
          total={pagination.totalElements}
          pageSize={pagination.pageSize}
        />
      </div>
    </section>
  );
};

export default New;
