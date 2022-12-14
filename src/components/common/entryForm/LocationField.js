import { Form, Select } from 'antd';
import React from 'react';
import BaseField from './BaseField';


class LocationField extends BaseField {
    constructor(props) {
        super(props);
    }

    render(){
        const {label,fieldName,allowClear,options,onChange}= this.props;
        return( 
            <Form.Item label={label}
            name={fieldName}
            rules={this.getRules()}
            shouldUpdate={false}
            // noStyle={noStyle}
        >

          <Select
            // mode="multiple"
            showSearch
            allowClear={allowClear}
            placeholder={this.getPlaceHolder()}
            style={{
                width: '100%',
            }}
            onChange={onChange}
            >
            {options.map(item =>  <Select.Option key={item.key} value={item.key}>{item.value} </Select.Option>)}
          </Select>
        </Form.Item>
        )
    }
}
export default LocationField;