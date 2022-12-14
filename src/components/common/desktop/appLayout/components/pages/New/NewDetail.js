import React from "react";
import {Spin } from "antd";
const NewDetail = ({ dataConfig, loading }) => {
  return (
    <section className="new__detail section" id="new__detail">
      <div className="new__detail__container container grid">
        <div></div>
        {loading ? (
          <div className="section__loading container">
            <Spin size="large" />
          </div>
        ) : (
          <div
            className="new_detail-content"
            dangerouslySetInnerHTML={{ __html: dataConfig.content }}
          ></div>
        )}
      </div>
    </section>
  );
};

export default NewDetail;
