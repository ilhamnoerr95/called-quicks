import React, { useState } from 'react';

// antd
import { Collapse, Checkbox, Space, DatePicker } from 'antd';
// import type { CollapseProps } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';

// components
import Loading from '@/Components/loading';

// type
import type { NotifData } from '@/Types/msg.type';
import Image from 'next/image';

const MainTodo: React.FC<{
    dataNotif: NotifData[];
    isLoading: boolean;
}> = (props) => {
    console.log('render main todo');
    const [checked, setChecked] = useState<boolean>(true);

    const onChange = (e: CheckboxChangeEvent) => {
        console.log('checked = ', e.target.checked);
        setChecked(e.target.checked);
    };

    const items = (params: NotifData[]) =>
        Array.isArray(params)
            ? params.map((data, index: number) => ({
                  key: data.id,
                  label: (
                      <>
                          <div className="row">
                              <Checkbox
                                  className="col-9"
                                  checked={checked}
                                  onChange={onChange}
                              >
                                  <strong>{data.title}</strong>
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
                                  />
                                  <p className="mock-block">{data.body}</p>
                              </Space>
                          </Space>
                      </div>
                  ),
              }))
            : [];

    return props.isLoading ? (
        <Loading />
    ) : (
        <Collapse
            style={{ backgroundColor: 'white' }}
            bordered={false}
            items={items(props.dataNotif)}
            expandIconPosition="end"
        />
    );
};

export default MainTodo;
