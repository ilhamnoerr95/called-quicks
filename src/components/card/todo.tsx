import React, { useState } from 'react';

// antd
import {
    Collapse,
    Checkbox,
    Space,
    DatePicker,
    Popover,
    Select,
    Tag,
} from 'antd';
// import type { CheckboxValueType } from 'antd/es/checkbox/Group';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
// components
import Loading from '@/Components/loading';

// type
import type { NotifData } from '@/Types/msg.type';
import Image from 'next/image';
import { EllipsisOutlined } from '@ant-design/icons';
import type { CustomTagProps } from 'rc-select/lib/BaseSelect';

// const opts = () => {
//     const dt = [
//         {
//             label: ' Important ASAP',
//             value: '#E5F1FF',
//         },
//         { label: 'Office Meeting', value: '#FDCFA4' },
//         { label: 'Virtuan Meeting', value: '#F9E9C3' },
//         { label: 'ASAP', value: '#AFEBDB' },
//         { label: 'Client Related', value: '#CBF1C2' },
//         { label: 'Self Task', value: '#CFCEF9' },
//         { label: 'Appoinment', value: '#F9E0FD' },
//         { label: 'Court Related', value: '#9DD0ED' },
//     ];
//     const result = [];
//     result.push(
//         dt.map((data) => ({
//             ...data,
//             label: (
//                 <div
//                     style={{
//                         background: data.value,
//                         border: '1px solid black',
//                         borderRadius: '3px',
//                     }}
//                 >
//                     {data.label}
//                 </div>
//             ),
//         })),
//     );

//     return result[0];
// };

const options = [
    {
        label: 'Important ASAP',
        value: '#E5F1FF',
    },
    { label: 'Office Meeting', value: '#FDCFA4' },
    { label: 'Virtuan Meeting', value: '#F9E9C3' },
    { label: 'ASAP', value: '#AFEBDB' },
    { label: 'Client Related', value: '#CBF1C2' },
    { label: 'Self Task', value: '#CFCEF9' },
    { label: 'Appoinment', value: '#F9E0FD' },
    { label: 'Court Related', value: '#9DD0ED' },
];
const tagRender = (props: CustomTagProps) => {
    const { label, value, closable, onClose } = props;
    const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
        event.preventDefault();
        event.stopPropagation();
    };
    return (
        <Tag
            color={value}
            onMouseDown={onPreventMouseDown}
            closable={closable}
            onClose={onClose}
            style={{ marginRight: 3, color: 'black' }}
        >
            <strong>{label}</strong>
        </Tag>
    );
};

const MainTodo: React.FC<{
    dataNotif: NotifData[];
    isLoading: boolean;
}> = (props) => {
    const [checked, setChecked] = useState<boolean>(true);
    const [open, setOpen] = useState<boolean>(true);

    const items = (params: NotifData[]) =>
        Array.isArray(params)
            ? params.map((data, index: number) => ({
                  key: data.id,

                  label: (
                      <>
                          <div className="row">
                              <Checkbox
                                  defaultChecked={index === 1 && checked}
                                  key={data.id}
                                  className="col-9 checkbox"
                                  onChange={(e: CheckboxChangeEvent) => {
                                      setChecked(e.target.checked);
                                  }}
                              >
                                  <strong
                                      className={(index === 1 && 'done') + ''}
                                  >
                                      {data.title}
                                  </strong>
                              </Checkbox>
                              <div
                                  className="col-3"
                                  style={{
                                      display: 'flex',
                                      flexDirection: 'row',
                                      justifyContent: 'space-between',
                                  }}
                              >
                                  {index == 0 ? (
                                      <span className="indicators-2">
                                          2 Days Left
                                      </span>
                                  ) : (
                                      <span />
                                  )}
                                  <span>12/06/2021</span>
                              </div>
                          </div>
                      </>
                  ),
                  children: (
                      <div className="px-lg detail-todo">
                          <Space direction="vertical">
                              <Space
                                  size="small"
                                  align="center"
                                  className="space-align-block"
                              >
                                  <Image
                                      src={'/images/schedule_24px.svg'}
                                      width={12}
                                      height={12}
                                      alt="schedule"
                                  />
                                  <DatePicker />
                              </Space>
                              <Space
                                  size="small"
                                  align="start"
                                  className="space-align-block"
                              >
                                  <Image
                                      src={'/images/icon/image/edit_24px.svg'}
                                      width={12}
                                      height={12}
                                      alt="edit"
                                      style={{ cursor: 'pointer' }}
                                      onClick={() => setOpen(!open)}
                                  />
                                  <div className="mock-block">
                                      <textarea
                                          disabled={open}
                                          key={data.id}
                                          className={
                                              (!open && 'open') + 'text-area'
                                          }
                                          defaultValue={data.body}
                                          onChange={(e) => e.target.value}
                                          placeholder="No Description"
                                      />
                                  </div>
                              </Space>
                              <div className="mock-block">
                                  <Select
                                      mode="multiple"
                                      placeholder="Please select"
                                      style={{ width: '90%' }}
                                      options={options}
                                      tagRender={tagRender}
                                  />
                              </div>
                          </Space>
                      </div>
                  ),
                  extra: (
                      <Popover
                          className="delete"
                          style={{
                              border: ' 1px solid #828282',
                              color: 'yellow',
                          }}
                          placement="bottom"
                          trigger="click"
                          content={
                              <div
                                  style={{
                                      cursor: 'pointer',
                                  }}
                              >
                                  <div className="indicators-2">Delete</div>
                              </div>
                          }
                      >
                          <EllipsisOutlined className="ml-sm" />
                      </Popover>
                  ),
              }))
            : [];

    return props.isLoading ? (
        <Loading />
    ) : (
        <>
            <Collapse
                collapsible="icon"
                style={{ backgroundColor: 'white' }}
                bordered={false}
                items={items(props.dataNotif)}
                expandIconPosition="end"
            />
            <style>
                {`
                    .ant-popover-content > .ant-popover-inner {
                        border: 1px solid #828282;
                        
                    }
                `}
            </style>
        </>
    );
};

export default MainTodo;
