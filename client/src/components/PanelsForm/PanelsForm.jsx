import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Input, Select, DatePicker, TimePicker, Button } from 'antd';
import './PanelsForm.css';

const { TextArea } = Input;

const PanelsForm = () => {
  const [data, setData] = useState({
    'First name': '',
    'Last name': '',
    Email: '',
    Phone: '',
    'Job description': '',
    Address: '',
    City: '',
    State: '',
    'Zip code': ''
  });

  const onSubmit = async event => {
    event.preventDefault();

    await axios.post('http://localhost:3030/create', data);
  };

  const onChangeInput = event => {
    const input = event.currentTarget;
    const name = input.name;
    const value = input.value;

    setData({
      ...data,
      [name]: value
    });
  };

  return (
    <form className="panelsForm" onSubmit={onSubmit}>
      <div className="panels-container">
        <div className="panel">
          <div style={{ width: '100%', marginBottom: '10px' }}>
            <h2>Client details</h2>
          </div>
          <div>
            <div style={{ display: 'flex' }}>
              <Input
                onChange={onChangeInput}
                name="First name"
                value={data['First name']}
                required
                placeholder="First name"
                style={{ marginRight: '10px' }}
              />
              <Input onChange={onChangeInput} name="Last name" required placeholder="Last name" />
            </div>
            <Input
              onChange={onChangeInput}
              name="Phone"
              required
              placeholder="Phone"
              type="tel"
              className="mt-10"
            />
            <Input
              onChange={onChangeInput}
              name="Email"
              placeholder="Email (optional)"
              type="email"
              className="mt-10"
            />
          </div>
        </div>
        <div className="panel">
          <div style={{ width: '100%', marginBottom: '10px' }}>
            <h2>Job details</h2>
          </div>
          <div style={{ width: '100%' }}>
            <div style={{ display: 'flex' }}>
              <Select
                placeholder="Job type"
                onChange={value => setData({ 'Job type': value, ...data })}
                options={[
                  { value: 'Job-type-1', label: 'Job-type-1' },
                  { value: 'Job-type-2', label: 'Job-type-2' }
                ]}
                style={{ marginRight: '10px', width: '100%' }}
              />
              <Select
                placeholder="Job source"
                onChange={value => setData({ 'Job source': value, ...data })}
                options={[
                  { value: 'Job-source-1', label: 'Job-source-1' },
                  { value: 'Job-source-2', label: 'Job-source-2' }
                ]}
                style={{ width: '100%' }}
              />
            </div>
            <TextArea
              style={{ maxHeight: '100px' }}
              name="Job description"
              onChange={onChangeInput}
              autoSize="false"
              className="mt-10"
              placeholder="Job description (optional)"
            />
          </div>
        </div>
        <div className="panel">
          <div style={{ width: '100%', marginBottom: '10px' }}>
            <h2>Service location</h2>
          </div>
          <div>
            <Input name="Address" onChange={onChangeInput} required placeholder="Address" />
            <Input name="City" onChange={onChangeInput} required placeholder="City" className="mt-10" />
            <Input name="State" onChange={onChangeInput} placeholder="State" className="mt-10" />
            <div style={{ display: 'flex' }} className="mt-10">
              <Input
                name="Zip code"
                onChange={onChangeInput}
                required
                placeholder="Zip code"
                style={{ marginRight: '10px' }}
              />
              <Select
                placeholder="Area"
                options={[
                  { value: 'Somewhere-1', label: 'Somewhere-1' },
                  { value: 'Somewhere-2', label: 'Somewhere-2' }
                ]}
                style={{ width: '100%' }}
              />
            </div>
          </div>
        </div>
        <div className="panel">
          <div style={{ width: '100%', marginBottom: '10px' }}>
            <h2>Scheduled</h2>
            <div>
              <DatePicker
                onChange={(date, dateString) => setData({ 'Start date': dateString, ...data })}
                placeholder="Start date"
                style={{ width: '100%' }}
                className="mt-10"
              />
              <div style={{ display: 'flex' }} className="mt-10">
                <TimePicker
                  onChange={(time, timeString) => setData({ 'Start time': timeString, ...data })}
                  placeholder="Start time"
                  style={{ marginRight: '10px', width: '100%' }}
                />
                <TimePicker
                  onChange={(time, timeString) => setData({ 'End time': timeString, ...data })}
                  placeholder="End time"
                  style={{ width: '100%' }}
                />
              </div>
              <Select
                placeholder="Test select"
                onChange={value => setData({ 'Test select': value, ...data })}
                options={[
                  { value: 'Test-1', label: 'Test-1' },
                  { value: 'Test-2', label: 'Test-2' }
                ]}
                style={{ width: '100%' }}
                className="mt-10"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="buttons-container">
        <Button style={{ marginRight: '10px' }} shape="round" type="primary" htmlType="submit">
          Submit
        </Button>
        <Button shape="round">Save</Button>
      </div>
    </form>
  );
};

export default PanelsForm;
