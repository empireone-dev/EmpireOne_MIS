import React from 'react';
import { Descriptions } from 'antd';

export default function ApplicantIDDescription() {
  const items1 = [
    {
      key: '1',
      label: 'Application #',
      children: 'Zhou Maomao',
    },
    {
      key: '2',
      label: 'Fullname',
      children: '1810000000',
    },
    {
      key: '3',
      label: 'Suffix',
      children: 'Hangzhou, Zhejiang',
    },
    {
      key: '4',
      label: 'Date Of Birth',
      children: 'empty',
    },
    {
      key: '5',
      label: 'Maritial Status',
      children: 'No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China',
    },
    {
      key: '5',
      label: 'Gender',
      children: 'No. 18, ',
    },
    {
      key: '5',
      label: 'Religion',
      children: 'No. 18, ',
    },
    {
      key: '5',
      label: 'Nationality',
      children: 'No. 18, ',
    },
    {
      key: '5',
      label: 'Email Address',
      children: 'No. 18, ',
    },
    {
      key: '5',
      label: 'Mobile #',
      children: 'No. 18, ',
    },
    {
      key: '5',
      label: "Mother's Maiden Name",
      children: 'No. 18, ',
    },
    {
      key: '5',
      label: "Father's Full Name",
      children: 'No. 18, ',
    },
    {
      key: '5',
      label: "Highest Educational Attaintment",
      children: 'No. 18, ',
    },
    {
      key: '5',
      label: "Course Taken",
      children: 'No. 18, ',
    },
  ];
  const items2 = [
    {
      key: '5',
      label: "Address",
      children: 'So. Cotcot Brgy Rizal San carlos city negros occidental, Brgy. , San Carlos City, Negros Occidental ',
    },
  ]
  const items3 = [
    {
      key: '5',
      label: "SSS No.",
      children: 'So. Cotcot Brgy Rizal San carlos  ',
    },
    {
      key: '5',
      label: "Pag-ibig No.",
      children: 'So. Cotcot Brgy Rizal San carlos  ',
    },
    {
      key: '5',
      label: "Tin No.",
      children: 'So. Cotcot Brgy Rizal San carlos  ',
    },
    {
      key: '5',
      label: "Philhealth No.",
      children: 'So. Cotcot Brgy Rizal San carlos  ',
    },
  ]
  const items4 = [
    {
      key: '5',
      label: "Emergency Contact Fullname",
      children: 'So. Cotcot Brgy Rizal San carlos  ',
    },
    {
      key: '5',
      label: "Address",
      children: 'So. Cotcot Brgy Rizal San carlos  ',
    },
    {
      key: '5',
      label: "Relationship",
      children: 'So. Cotcot Brgy Rizal San carlos  ',
    },
    {
      key: '5',
      label: "Contact No.",
      children: 'So. Cotcot Brgy Rizal San carlos  ',
    },
  ]
  return ( 
 <div className='flex flex-col gap-6'>
    <Descriptions
    column={2}
    title="Application Information" items={items1} />
    <Descriptions
    column={1}
    title="Address Information" items={items2} />
      <Descriptions
    column={2}
    title="Government ID Information" items={items3} />
    <Descriptions
    column={2}
    title=" Emergency Contact Information" items={items4} />
 </div>
   );
}
