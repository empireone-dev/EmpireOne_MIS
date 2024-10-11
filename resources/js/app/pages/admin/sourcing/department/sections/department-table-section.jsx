import React from 'react';
import { Space, Table, Tag } from 'antd';
import { useSelector } from 'react-redux';


const DepartmentTableSection = () => {
  const {departments}=useSelector((store)=>store.departments)
  const data = departments.map(res=>({
    dept:res.dept
  }))

  const columns = [
    {
      title: 'Departments',
      dataIndex: 'dept',
      key: 'dept',
      render: (text) => <a>{text}</a>,
    },
    // {
    //   title: 'Age',
    //   dataIndex: 'age',
    //   key: 'age',
    // },
    // {
    //   title: 'Address',
    //   dataIndex: 'address',
    //   key: 'address',
    // },
    // {
    //   title: 'Tags',
    //   key: 'tags',
    //   dataIndex: 'tags',
    //   render: (_, { tags }) => (
    //     <>
    //       {tags.map((tag) => {
    //         let color = tag.length > 5 ? 'geekblue' : 'green';
    //         if (tag === 'loser') {
    //           color = 'volcano';
    //         }
    //         return (
    //           <Tag color={color} key={tag}>
    //             {tag.toUpperCase()}
    //           </Tag>
    //         );
    //       })}
    //     </>
    //   ),
    // },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a>Invite {record.name}</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];
  return <Table columns={columns} dataSource={data} />
};
export default DepartmentTableSection;