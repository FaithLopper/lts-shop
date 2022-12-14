import qs from 'query-string'
import KEYS from '../constants/storageKeys'
import { CurrentcyPositions } from '../constants';
import { getObjectData } from './localStorageHelper';

const Utils = {
    convertStringToLowerCase(str) {
        if(str) {
            return str.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
            .map(x => x.toLowerCase())
            .join(' ')
        }
        return '';
    },
    camelCaseToTitleCase(camelCase) {
        if (camelCase === null || camelCase === '') {
            return camelCase
        }

        camelCase = camelCase.trim()
        var newText = ''
        for (var i = 0; i < camelCase.length; i++) {
            if (
                /[A-Z]/.test(camelCase[i]) &&
                i !== 0 &&
                /[a-z]/.test(camelCase[i - 1])
            ) {
                newText += ' '
            }
            if (i === 0 && /[a-z]/.test(camelCase[i])) {
                newText += camelCase[i].toLowerCase()
            } else {
                newText += camelCase[i].toLowerCase()
            }
        }

        return newText
    },
    isEmptyObject(obj) {
        return (
            obj && Object.keys(obj).length === 0 && obj.constructor === Object
        )
    },
    getFileNameFromPath(path) {
        if (path) return path.split('\\').pop().split('/').pop()
        return ''
    },
    makePath(path, data) {
        let pathResult = path
        const params = {}
        const dataKeys = Object.keys(data || {})

        for (let key of dataKeys) {
            const keyCompare = ':' + key
            const value = data[key]

            if (pathResult.indexOf(keyCompare) !== -1) {
                pathResult = pathResult.replace(keyCompare, value)
            } else {
                params[key] = value
            }
        }

        if (Object.values(params).length) {
            pathResult += '?' + qs.stringify(params)
        }

        return pathResult
    },
    isMobileDevice(){
        return(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent))
    },
    formatMoney(value, setting = {}){
        if(Object.keys(setting) <= 0) setting = getObjectData(KEYS.USER_DATA)?.settings?.["Money and Number"] || {};
        if((value || value === 0) && !isNaN(value)) {
            const groupSeparator = setting.groupSeparator || ',';
            const decimalSeparator = setting.decimalSeparator || '.';
            const currentcy = setting.currencySymbol || '₫';
            const currencySymbolPosition = setting.currencySymbolPosition;
            const moneyRatio = setting.moneyRatio || 1;
            const decimal = Number(setting.decimal) || 0;
            if(value.toString().indexOf(decimalSeparator) === -1) {
                value = value / moneyRatio;
                value = value.toFixed(decimal);
                const decimalIndex = value.toString().lastIndexOf(".");
                if(decimalIndex > -1) {
                    value = value.toString().substring(0, decimalIndex) + decimalSeparator + value.toString().substring(decimalIndex + 1);
                }
            }
            else {
                value = value.toFixed(Number(setting.decimal) || 0);
            }
            value = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, groupSeparator);
            if(currencySymbolPosition === CurrentcyPositions.FRONT) {
                return `${currentcy} ${value}`;
            }
            else {
                return `${value} ${currentcy}`;
            }
        }
        return '';
    },
    formatIntegerNumber(value){
        value = value.replace(/\$\s?|(,*)/g, '')
        value = value.replace(/\$\s?|(\.*)/g, '')
        return value
    },
    formatNumber(value, setting){
        if(value) {
            const decimalPosition = value.toString().indexOf('.');
            if(decimalPosition > 0) {
                const intVal = value.toString().substring(0, decimalPosition);
                const decimalVal = value.toString().substring(decimalPosition + 1);
                return `${intVal.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}.${decimalVal}`;
            }
            return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        }
        else if(value === 0)
            return 0;
        return '';
    },
    checkPermission(requiredPermissions = [], hasCollaborator) {
        const userData = getObjectData(KEYS.USER_DATA)
        if(requiredPermissions.some(permission => userData?.permissions?.indexOf(permission) < 0)) {
            return false
        }
        if(hasCollaborator && userData?.settings?.["enable-collaborator"] !== 1) {
            return false
        }
        return true
    },
    getCollaboratorId() {
        return window.location.pathname.split('/')?.[1] !== ''? (window.location.pathname.split('/')[1]) : null
    },
    getProductId() {
        return window.location.pathname.split('/')?.[1];
    },
    getPathName() {
        return window.location.pathname + window.location.search;
    },
    getFullPath() {
        if(qs.parse(window.location.search)?.path?.toUpperCase() === 'SEO')
        {
            return window.location.pathname.split('/')?.[1];
        }
        if (Number(window.location.pathname.split('/')?.[1]))
            return Number(window.location.pathname.split('/')?.[1])
        return null
    },
    isSEOPath() {
        if(qs.parse(window.location.search)?.kind?.toUpperCase() === 'SEO')
            return true;
        return false;
    },
    findRefByKey(key, arrayToFind) {
        return arrayToFind.find(e => e.refKey === key)?.refValue
    },
    checkEmailValid( email ) {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    },
    getCurrentPathName() {
        return (window.location.pathname.split('/')?.[2])
    },
    removeCollaboratorIdFromPath (path) {
        return path.split(':collaboratorId/')?.[1]?.split('/')[0]
    },
    getBase64(img, callback) {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    },
    romanize (num) {
        if (isNaN(num))
            return NaN;
        var digits = String(+num).split(""),
            key = ["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM",
                   "","X","XX","XXX","XL","L","LX","LXX","LXXX","XC",
                   "","I","II","III","IV","V","VI","VII","VIII","IX"],
            roman = "",
            i = 3;
        while (i--)
            roman = (key[+digits.pop() + (i * 10)] || "") + roman;
        return Array(+digits.join("") + 1).join("M") + roman;
    },
    numberToCurency(num) {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(num);
    },
    checkAllAvailableParams(inputParam) {
    const searchParams = {}
    if (inputParam.page) {
        searchParams.page = inputParam.page;
    }

    if (inputParam.size) {
        searchParams.size = inputParam.size;
    }

    if (inputParam.kind) {
        searchParams.kind = inputParam.kind;
    }

    if (inputParam.parentId) {
        searchParams.parentId = inputParam.parentId;
    }

    if (inputParam.search) {
        if (inputParam.search.name) {
        searchParams.name = inputParam.search.name;
        }
        if (inputParam.search.status) {
        searchParams.status = inputParam.search.status;
        }
    }
    return searchParams;
    },
}

export default Utils
