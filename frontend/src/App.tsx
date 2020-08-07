import React, { useState } from 'react';
import { Form, Input, DatePicker, Button, Upload, message, Table } from 'antd';
import moment from 'moment';
import { baseURL } from './api/axios';
import { inquiry, IInquiryParams } from './api';
import './App.css';

const dateFormat = 'YYYY-MM-DD';
interface IColumn {
    id: number,
    name: string,
    phone: string,
    date: string
}
const columns = [
    {
        title: '客户姓名',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '客户手机号',
        dataIndex: 'phone',
        key: 'phone',
    },
    {
        title: '上传时间',
        dataIndex: 'date',
        key: 'date',
    },
]

const App = () => {
    const [form] = Form.useForm();
    const [dataSource, setDataSource] = useState([] as IColumn[]);
    const onFinish = async ({ 
        name = '', 
        phone = '',
        startDate, 
        endDate
    }: IInquiryParams) => {
        startDate = moment.isMoment(startDate) ? startDate.format(dateFormat) + ' 00:00' : new Date('1900-01-01').toISOString();
        endDate =  moment.isMoment(endDate) ? endDate.format(dateFormat) + ' 23:59' : new Date('2077-01-01').toISOString();
        const res = await inquiry({ name, phone, startDate, endDate });
        setDataSource((res as any).map((item: any) => ({ ...item, date: moment(item.date).format('YYYY-MM-DD HH:mm:ss') })));
    }

    return (
        <div className='container'>
            <div className='menu'>
                <div className='admin'>Admin Pro</div>
                <div>数据管理</div>
            </div>
            <div className='content'>
                <div className='row'>
                    <Upload
                        accept='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                        action={`${baseURL}upload`}
                        onChange={(info) => {
                            console.log(info);
                            const { status, response } = info.file;
                            if (status === 'done') {
                                message.success(`上传${response.success ? '成功' : '失败'}！`);
                            } else if (status === 'error') {
                                message.error('上传失败！');
                            }
                        }}
                    >
                        <Button>导入数据</Button>
                    </Upload>
                    <span className='download' onClick={() => window.open(`${baseURL}download`)}>模板下载</span>
                </div>
                <Form form={form} layout='inline' size='large' onFinish={onFinish}>
                    <Form.Item name='name' label='姓名'>
                        <Input placeholder='请输入姓名' />
                    </Form.Item>
                    <Form.Item name='phone' label='手机号'>
                        <Input placeholder='请输入手机号码' />
                    </Form.Item>
                    <Form.Item name='startDate'>
                        <DatePicker format={dateFormat} placeholder={'上传开始时间'} />
                    </Form.Item>
                    <div className='link'><span>-</span></div>
                    <Form.Item name='endDate'>
                        <DatePicker format={dateFormat} placeholder={'上传截止时间'} />
                    </Form.Item>
                    <Button type='primary' htmlType='submit'>查询</Button>
                    <Button style={{ marginLeft: 20 }} onClick={() => form.resetFields()}>清空</Button>
                </Form>
                <Table style={{ marginTop: 20 }} dataSource={dataSource} columns={columns} />
            </div>
        </div>
    );
}

export default App;
