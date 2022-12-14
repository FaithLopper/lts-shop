import { HourglassOutlined , SolutionOutlined, CarOutlined, StopOutlined, CheckCircleOutlined } from '@ant-design/icons';
const AppConstants = {
    apiRootUrl: process.env.REACT_APP_API,
    // contentRootUrl: `${process.env.REACT_APP_API}/file`,
    contentRootUrl: `${process.env.REACT_APP_API}/v1/file/download`,
    langKey: 'vi',
}

export const LayoutConfigs = {
    NAV_WIDTH_EXPANDED: 264,
    NAV_WIDTH_COLLAPSED: 80
}

export const StorageKeys = {
    userData: 'LTS-SHOP-USER-DATA',
    appLanguage: 'app-language'
}

export const UploadFileTypes = {
    AVATAR: 'AVATAR',
    LOGO: 'LOGO',
    DOCUMENT: 'DOCUMENT',
}

export const APP_WEB_STORE = 'APP_WEB_STORE'
export const APP = 'CLIENT_WEB'


// User role
export const ROLE_SUPER_USER = 'ROLE_EMPLOYEE'
export const ROLE_ADMIN = 'ROLE_COLLABORATOR'

// Pagination config
export const DEFAULT_TABLE_ITEM_SIZE = 10
export const DATE_FORMAT_DISPLAY = 'DD-MM-YYYY'
export const DATE_FORMAT_VALUE = 'YYYY-MM-DD'

// Common status
export const STATUS_LOCK = 0
export const STATUS_ACTIVE = 1

// Register form
export const REG_SOURCE_PHONE = 1
export const REG_SOURCE_FACEBOOK = 2
export const REG_SOURCE_GOOGLE = 3

// Gender

export const GENDER_MALE = 1
export const GENDER_FEMALE = 2

export { AppConstants }

export const NEW_KIND_CUSTOMER = 1

export const CurrentcyPositions = {
    FRONT: 0,
    BACK: 1,
}

export const OrdersStates = [
    {
        value: 0,
        label: 'newCreated',
        color: '#171717',
        icon: <HourglassOutlined />,
    },
    {
        value: 1,
        label: 'verified',
        color: 'orange',
        icon: <SolutionOutlined />,
    },
    {
        value: 2,
        label: 'shipping',
        color: '#096dd9',
        icon: <CarOutlined />,
    },
    {
        value: 3,
        label: 'finish',
        color: '#389e0d',
        icon: <CheckCircleOutlined />,
    },
    {
        value: 4,
        label: 'cancel',
        color: '#cf1322',
        icon: <StopOutlined/>,
    },
]

export const UserTypes = {
    ADMIN: 1,
    CUSTOMER: 2,
    EMPLOYEE: 3,
}

export const UserStatus = [
    {
        value: STATUS_ACTIVE,
        label: 'active',
        color: 'green',
    },
    {
        value: STATUS_LOCK,
        label: 'lock',
        color: 'red',
    },
]

export const ProvinceKinds = {
    province: {
        name: 'PROVINCE_KIND_PROVINCE',
        level: 1,
        text: 'Province'
    },
    district: {
        name: 'PROVINCE_KIND_DISTRICT',
        level: 2,
        text: 'District'
    },
    commune: {
        name: 'PROVINCE_KIND_COMMUNE',
        level: 3,
        text: 'Commune'
    }
}

export const commonSex = [
    { value: 0, label: 'Female' },
    { value: 1, label: 'Male' }
]

export const PaymentMothod ={
    CARD:1,
    PAYPAL:2,
    COD:3
}
