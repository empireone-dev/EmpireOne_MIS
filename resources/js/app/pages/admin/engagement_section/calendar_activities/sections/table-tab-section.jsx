import React, { useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table, Tag } from "antd";
import Highlighter from "react-highlight-words";
import { useSelector } from "react-redux";
import moment from "moment";
import { router } from "@inertiajs/react";

export default function TableTabSection() {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const { engagements } = useSelector((state) => state.engagements)
  console.log('engagement', engagements)

  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys, confirm, dataIndex)
          }
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys, confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() =>
              clearFilters && handleReset(clearFilters)
            }
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: "Event Name	",
      dataIndex: "EventName",
      key: "eventname",
      ...getColumnSearchProps("eventname"),
    },
    {
      title: "Time",
      dataIndex: "TOE",
      key: "time",
      ...getColumnSearchProps("time"),
    },
    {
      title: "Date",
      dataIndex: "DOE",
      key: "date",
      render: (_, record) => {
        return (
          <div className="gap-1.5 flex">
            {moment(record.DOE).format('LL')}
          </div>
        );
      },
    },
    {
      title: "Pre-Survey",
      dataIndex: "pre_surv",
      key: "pre_surv",
      ...getColumnSearchProps("pre_surv"),
    },
    {
      title: "Post-Survey",
      dataIndex: "post_surv",
      key: "post_surv",
      ...getColumnSearchProps("post_surv"),
    },

    // {
    //     title: "Action",
    //     dataIndex: "action",
    //     render: (_, record) => {
    //         return (
    //             <ButtonComponents />
    //         );
    //     },
    // },
  ];

  return (
    <div>
      <div className="flex flex-1 mt-3">
        <div className="flex w-full items-center gap-x-3 mb-4">
          <h2 className="text-lg font-medium text-gray-800">
            <b>Event Ratings</b>
          </h2>
        </div>
        <div className="w-full flex justify-end items-center">
          <button className="hover:text-blue-500"
            onClick={() => router.visit("/admin/engagements_section/calendar_activities/all_events_rate")}
          >
            <h1 className=""><b>View Both Site Event Ratings</b></h1>
          </button>
        </div>
      </div>
      <Table columns={columns} dataSource={engagements} />;
    </div>
  );
}
