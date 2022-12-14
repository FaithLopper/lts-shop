import { notification } from 'antd'
import { Toast } from 'antd-mobile'
import Utils from '../utils'

const isMobile = Utils.isMobileDevice()

const showSucsessMessage = (content, translate, duration) => {
    if(isMobile) {
        Toast.success(content, duration);
    }
    else {
        notification.success({
            message: translate?.t(`${translate.ns}:success`, 'Success') || 'Success',
            description: content
        });
    }
}

const showErrorMessage = (content, translate) => {
    if(isMobile) {
        Toast.fail(content);
    }
    else {
        notification.error({
            message: translate?.t(`${translate.ns}:error`, 'Error') || 'Error',
            description: content,
        });
    }
}

const showWarningMessage = (content, translate) => {
    if(isMobile) {
        Toast.show(content);
    }
    else {
        notification.warning({
            message: translate?.t(`${translate.ns}:error`, 'Error Message') || 'Error Message',
            description: content
        });
    }
}

export {
    showErrorMessage,
    showWarningMessage,
    showSucsessMessage,
}