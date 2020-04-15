import React from "react";

const TableHeader = ({
  orderBy,
  orderAsc,
  headers,
  handleHeaderChange,
  showActionColumn,
  actionColumnLabel
}) => {
  const renderHeader = (orderBy, orderAsc, headers) => {
    const header = headers.map(value => {
      const orderIcon =
        orderBy === value.field ? (
          <i
            className={"fas " + (orderAsc ? "fa-angle-down" : "fa-angle-up")}
          ></i>
        ) : (
          <></>
        );

      return (
        <th key={value.field}>
          <a
            href=""
            onClick={e => {
              e.preventDefault();
              handleHeaderChange(
                value.field,
                orderBy === value.field ? !orderAsc : true
              );
            }}
          >
            {value.label}
            {orderIcon}
          </a>
        </th>
      );
    });

    if (showActionColumn) {
      header.push(<th key="action-column">{actionColumnLabel || ""}</th>);
    }

    return <tr>{header}</tr>;
  };

  const header = renderHeader(orderBy, orderAsc, headers);

  return header;
};

export default TableHeader;
