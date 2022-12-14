import React, { useRef } from "react";

import Utils from "../../../../../../utils";
import { useTranslation, withTranslation } from "react-i18next";
import { connect } from "react-redux";
import MasterLayout from "../../MasterLayout";
import MobileMasterLayout from "../../../../mobile/appLayout/MobileMasterLayout";

const { isMobileDevice } = Utils;
const isMobile = isMobileDevice();

const NotFoundComponent = ()=>(
    <section className="notfound section">
    <div className="notfound__container">
      <h2 className="section__title">Chúng tôi không thể tìm thấy trang bạn đang tìm kiếm.</h2>
      <h2 className="section__title">Xin lỗi vì sự bất tiện.</h2>
    </div>
  </section>
)

const NotFoundPage = (props) => {
  const { t } = props;
  return !isMobile ? (
    <MasterLayout {...props} t={t} Component={NotFoundComponent}/>
  ) : (
    <MobileMasterLayout {...props} t={t} Component={NotFoundComponent} />
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation(['navigationBar','notFoundPage'])(NotFoundPage));
