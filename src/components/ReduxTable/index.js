import React from "react";
import { Table, Row, Col } from "reactstrap";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import _ from "lodash";

//Components
import PageSearch from "../PageSearch";
import Loader from "../Loader";
import NoRecordsFound from "../NoRecordsFound";

//Action
import { fetchList, setTablePage } from "../../actions/table";

//Styles
import "./styles.scss";
import Pagination from "../Pagination";

//Assets
import { ChevronDown, ChevronUp } from "../../assets/icons";

//Helper
import { getParamsByName } from "../../lib/helper";
import { FwSelect } from "@freshworks/crayons/react";

export const ReduxColumn = () => {};

class ReduxTable extends React.Component {
  state = {
    page: 1,
    pageSize: 10,
    id: "",
    apiURL: "",
    selectedAll: false,
    selectedIds: [],
    searchTerm:
      this.props.params && this.props.params.searchItem
        ? this.props.params.searchItem
        : "" || "",
    isSearch: false,
    isActive: "",
    pagination: true,
    selectedSortOption: "Alphabetical A-Z",
    sortByOptions: [
      {
        value: "a-z",
        label: "Alphabetical A-Z",
      },
    ],
    value: getParamsByName("search"),
  };

  componentDidMount() {
    const { apiURL, id, table, sortByOptions } = this.props;
    this.setState(
      {
        id,
        apiURL,
        page: table[id] && table[id].currentPage ? table[id].currentPage : 1,
        pageSize: table[id] && table[id].pageSize ? table[id].pageSize : 10,
        selectedSortOption:
          sortByOptions && sortByOptions.length
            ? sortByOptions[0].value
            : this.state.selectedSortOption,
      },
      () => {
        const selectedSortOption = this.getSelectedSortLabel(
          this.state.selectedSortOption
        );
        this.handleSortByChange(selectedSortOption);
      }
    );
  }

  componentDidUpdate(prevProps) {
    if (this.props.apiURL !== prevProps.apiURL) {
      const { sortByOptions } = this.props;

      this.setState(
        {
          apiURL: this.props.apiURL,
          selectedSortOption:
            sortByOptions && sortByOptions.length
              ? sortByOptions[0].value
              : this.state.selectedSortOption,
        },
        () => {
          const selectedSortOption = this.getSelectedSortLabel(
            this.state.selectedSortOption
          );
          this.handleSortByChange(selectedSortOption);
        }
      );
    }
  }

  /**
   * Fetch data using API call
   *
   * @param {*} force
   */

  fetchData(force, sort, sortDir) {
    const {
      id,
      apiURL,
      page,
      pageSize,
      searchTerm,
      pagination,
      selectedSortOption,
    } = this.state;
    const {
      table,
      actions: { fetchList, setTablePage },
      sortByOptions,
    } = this.props;
    const sortAndSortDir = selectedSortOption.split(":");
    const sortBy = sort ? sort : sortAndSortDir[0];
    const sortDirBy = sortDir ? sortDir : sortAndSortDir[1];

    const listDetails = table[id] || {};

    const params = this.props.params || {};
    params.search = searchTerm || "";
    if (this.props.startDate) {
      params.startDate = this.props.startDate;
    }
    if (this.props.endDate) {
      params.endDate = this.props.endDate;
    }
    params.sort = sort || (sortByOptions && !searchTerm && sortBy) || "";
    params.sortDir =
      sortDir || (sortByOptions && !searchTerm && sortDirBy) || "";
    params.pagination = pagination;

    if (this.props.paramsToUrl) {
      const currentPage = window.location.pathname;
      let queryString = "";
      const queryStringArray = Object.entries(params);

      if (queryStringArray.length > 0) {
        queryString = "?";
        queryStringArray.forEach(async (queryParam) => {
          if (queryParam[0] !== "searchItem")
            queryString = `${queryString}&${queryParam[0]}=${queryParam[1]}`;
        });
      }
      if (this.props.history) {
        this.props.history.push(`${currentPage}${queryString}`, {
          data: params,
        });
      }
    }
    if (!listDetails.isFetching) {
      if (!listDetails) {
        return;
      }
      if (
        !listDetails[page] ||
        (listDetails.sortList[page] !== params.sort &&
          listDetails.sortDirList[page] !== params.sortDir) ||
        force
      ) {
        fetchList(id, apiURL, page, pageSize, params);
      } else {
        setTablePage(id, page);
      }
    }
  }

  /**
   * Change page
   *
   * @param {*} page
   */
  onPageChange(page) {
    this.setState({ page }, this.fetchData);
  }

  /**
   * Change page size
   *
   * @param {*} e
   */
  onPageSizeChange(e) {
    this.setState({ page: 1, pageSize: e.target.value, isSearch: false }, () =>
      this.fetchData(true)
    );
  }

  /**
   * Select all checkbox
   *
   * @param {*} data
   * @param {*} e
   */
  toggleSelectAll(data, e) {
    const selectedIds = this.state.selectedIds;

    data.forEach((row) => {
      if (e.target.checked) {
        if (selectedIds.indexOf(row.id) < 0) {
          selectedIds.push(row.id);
        }
      } else {
        if (selectedIds.indexOf(row.id) >= 0) {
          selectedIds.splice(selectedIds.indexOf(row.id), 1);
        }
      }
    });

    this.setState(
      {
        selectedAll: e.target.checked,
        selectedIds: selectedIds,
      },
      () => {
        this.props.onBulkSelect(selectedIds);
      }
    );
  }

  /**
   * Single checkbox select
   *
   * @param {*} data
   * @param {*} e
   */
  toggleSelect(data, e) {
    const rowIds = [];
    data.forEach((row) => {
      rowIds.push(row.id);
    });

    const rowId = e.target.value;
    const selectedIds = this.state.selectedIds;
    if (e.target.checked) {
      if (selectedIds.indexOf(rowId) < 0) {
        selectedIds.push(rowId);
      }
    } else {
      if (selectedIds.indexOf(rowId) >= 0) {
        selectedIds.splice(selectedIds.indexOf(rowId), 1);
      }
    }

    let selectedLength = 0;
    rowIds.forEach((rowId) => {
      if (selectedIds.indexOf(rowId) >= 0) {
        selectedLength++;
      }
    });

    this.setState(
      {
        selectedAll: rowIds.length === selectedLength,
        selectedIds: selectedIds,
      },
      () => {
        this.props.onBulkSelect(selectedIds);
      }
    );
  }

  UNSAFE_componentWillReceiveProps(props) {
    const { table, id } = props;
    const listDetails = table[id];
    let data = [];

    if (listDetails) {
      data = listDetails[listDetails.currentPage] || [];
    }

    const selectedIds = this.state.selectedIds;
    let selectedLength = 0;
    data.forEach((row) => {
      if (selectedIds.indexOf(row.id) >= 0) {
        selectedLength++;
      }
    });

    this.setState({
      selectedAll: selectedLength > 0 && selectedLength === data.length,
    });
  }

  /**
   * Change search term
   *
   * @param {*} event
   */
  onChange(event) {
    this.setState({ value: event.target.value });
    event.persist();
    this.setState({ searchTerm: event.target.value });
    this.doSearch(event);
    if (this.props.islandingTable)
      this.props.saveSearchTerm(event.target.value);
  }

  doSearch = _.debounce((event) => {
    this.setState(
      {
        isSearch: true,
        searchTerm: encodeURIComponent(event.target.value),
        page: 1,
      },
      () => {
        this.fetchData(true);
        this.setState({
          selectedAll: false,
          selectedIds: [],
        });
      }
    );
  }, 500);

  columnSortBy(sortBy) {
    this.setState({ isActive: !this.state.isActive, sortBy: sortBy });
    let sortDir = "";
    if (this.state.isActive) {
      sortDir = "DESC";
    } else {
      sortDir = "ASC";
    }
    this.fetchData(true, sortBy, sortDir);
  }

  handleSortByChange = (value) => {
    this.setState({ selectedSortOption: this.getSortValueFromLabel(value) });
    this.getSortByOptions(value);
  };

  // Sort by option
  getSortByOptions(value) {
    const valueArray = this.getSortValueFromLabel(value).split(":");
    const sortBy = valueArray[0];
    const sortDir = valueArray[1];

    this.fetchData(true, sortBy, sortDir);
  }

  getSelectedSortLabel() {
    const sortByOptions = this.props.sortByOptions
      ? this.props.sortByOptions
      : this.state.sortByOptions;

    const selectedSortOption = sortByOptions.find(
      (option) => option.value === this.state.selectedSortOption
    );

    if (selectedSortOption) {
      return selectedSortOption.label;
    }

    return "";
  }

  getSortValueFromLabel(label) {
    const sortByOptions = this.props.sortByOptions
      ? this.props.sortByOptions
      : this.state.sortByOptions;

    const selectedSortOption = sortByOptions.find(
      (option) => option.value === label
    );

    if (selectedSortOption) {
      return selectedSortOption.value;
    }

    return "";
  }

  render() {
    const {
      table,
      id,
      children: columns,
      showHeader,
      onRowClick,
      bulkSelect,
      headerButton,
      searchPlaceholder,
      searchDisabled,
      newTableHeading,
      transformData,
      disableColumnSort,
      sortByOptions,
      icon,
      message,
      subtextMessage,
      noPagination,
      searchBarWidth,
      hideMarginBottom,
      showNoRecord = true,
      noRecordFoundHeight,
      noRecordFoundComponent,
      onScroll,
    } = this.props;

    const listDetails = table[id];
    const isLoading = !listDetails || listDetails.isFetching;
    const { selectedAll, selectedIds } = this.state;

    let data = [];
    let totalCount = 0;
    let currentPage = "";
    let pageSize = "";
    let startPage = "";
    let endPage = "";

    if (listDetails) {
      currentPage = listDetails.currentPage;
      totalCount = listDetails.totalCount;
      pageSize = listDetails.pageSize;
      data = listDetails[currentPage] || [];

      startPage = (currentPage - 1) * pageSize + 1;
      startPage = startPage > totalCount ? totalCount : startPage;

      endPage = currentPage * pageSize;
      endPage = endPage > totalCount ? totalCount : endPage;
    }

    const columnLength = columns.length + (bulkSelect ? 1 : 0);

    if (transformData) {
      data = transformData(data);
    }

    return (
      <div
        className={`redux-table ${this.props.className} ${
          onScroll ? "redux-table-responsive" : ""
        }`}>
        <div>
          {showHeader && (
            <>
              {newTableHeading ? (
                <div
                  className={`mb-3 d-flex cover flex-md-row align-items-start flex-column ${
                    searchDisabled
                      ? "justify-content-end"
                      : "justify-content-between"
                  }`}>
                  {!searchDisabled && (
                    <PageSearch
                      width={searchBarWidth}
                      value={this.state.value}
                      classnames="page-search"
                      placeholder={searchPlaceholder}
                      onChange={this.onChange.bind(this)}
                    />
                  )}
                  {sortByOptions && (
                    <FwSelect
                      placeholder="Sort By"
                      onFwChange={(e) => {
                        this.handleSortByChange(e.target.value);
                      }}
                      options={sortByOptions}></FwSelect>
                  )}
                </div>
              ) : (
                <Row className="mb-3">
                  <Col xs="12">
                    <div
                      className={`page-heading d-flex ${
                        searchDisabled
                          ? "justify-content-end"
                          : "justify-content-between"
                      }`}>
                      {!searchDisabled && (
                        <PageSearch
                          classnames="page-search"
                          placeholder={searchPlaceholder}
                          onChange={this.onChange.bind(this)}
                        />
                      )}
                      {headerButton && headerButton}
                    </div>
                  </Col>
                </Row>
              )}
            </>
          )}

          <Table
            hover
            responsive
            className={`table-outline text-break ${
              hideMarginBottom ? "mb-0" : ""
            }`}
            // style={{borderCollapse: "collapse !important"}}
          >
            <thead className="thead-light">
              <tr>
                {bulkSelect && (
                  <th style={{ width: 12, paddingRight: 0 }}>
                    <input
                      type="checkbox"
                      checked={selectedAll}
                      onChange={this.toggleSelectAll.bind(this, data)}
                    />
                  </th>
                )}
                {React.Children.map(columns, (x) => {
                  return (
                    x && (
                      <th
                        style={{
                          minWidth: x.props.minWidth ? x.props.minWidth : "",
                          maxWidth: x.props.maxWidth ? x.props.maxWidth : "",
                        }}
                        className={`${
                          x.props.sortBy !== "" ? "cursor-pointer" : ""
                        } ${x.props.className}`}
                        onClick={() => {
                          return !disableColumnSort && !x.props.disableOnClick
                            ? this.columnSortBy(x.props.sortBy)
                            : false;
                        }}
                        colSpan={x.props.colspan}>
                        {x.props.children}
                        {!disableColumnSort && !x.props.disableOnClick ? (
                          x.props.sortBy === this.state.sortBy ? (
                            this.state.isActive ? (
                              <ChevronUp />
                            ) : (
                              <ChevronDown />
                            )
                          ) : (
                            <ChevronDown />
                          )
                        ) : (
                          ""
                        )}
                      </th>
                    )
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {data.map((list, key) => {
                return (
                  <tr key={key}>
                    {bulkSelect && (
                      <td style={{ paddingRight: 0 }}>
                        <input
                          type="checkbox"
                          value={list.id}
                          onChange={this.toggleSelect.bind(this, data)}
                          checked={selectedIds.indexOf(list.id) >= 0}
                        />
                      </td>
                    )}
                    {React.Children.map(columns, (x) => {
                      return (
                        x && (
                          <td
                            className={`${x.props.className} ${
                              onRowClick && !x.props.disableOnClick
                                ? "cursor-pointer"
                                : ""
                            } ${
                              x.props.type && x.props.type === "link"
                                ? "text-link"
                                : ""
                            }`}
                            onClick={() =>
                              x.props.isClickable === "true" &&
                              onRowClick &&
                              !x.props.disableOnClick
                                ? x.props.onLinkClick
                                  ? x.props.onLinkClick(list)
                                  : onRowClick(list)
                                : null
                            }
                            style={{
                              maxWidth: x.props.width ? x.props.width : "300px",
                              ...(x.props.field &&
                                x.props.field.toLowerCase() === "action" && {
                                  width: "90px",
                                }),
                            }}>
                            {x.props.field !== "action"
                              ? x.props.renderField
                                ? x.props.renderField(list)
                                : list[x.props.field]
                              : x.props.element}
                          </td>
                        )
                      );
                    })}
                  </tr>
                );
              })}
              {isLoading ? (
                <tr>
                  <td className="text-center" colSpan={columnLength}>
                    <Loader />
                  </td>
                </tr>
              ) : !noRecordFoundComponent ? (
                data.length === 0 && !icon && showNoRecord ? (
                  <tr>
                    <td className="text-center" colSpan={columnLength}>
                      <NoRecordsFound
                        middleHeight={noRecordFoundHeight}
                        showMessage={true}
                        hideCard={true}
                        message="No Records Found"
                      />
                    </td>
                  </tr>
                ) : data.length === 0 && icon ? (
                  <tr>
                    <td
                      className="align-middle"
                      colSpan={columnLength}
                      height="400px">
                      <div className="d-flex flex-column align-items-center">
                        {icon}
                        <strong>No records found</strong>
                        <span> {message ? message : ""} </span>
                        <span> {subtextMessage ? subtextMessage : ""} </span>
                      </div>
                    </td>
                  </tr>
                ) : null
              ) : (
                data.length === 0 && (
                  <tr>
                    <td className="text-center" colSpan={columnLength}>
                      {noRecordFoundComponent}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </Table>

          {totalCount > 0 && !noPagination && (
            <Row>
              <Col>
                Showing {startPage} to {endPage} of {totalCount} entries
              </Col>
              <Col>
                <Pagination
                  currentPage={currentPage}
                  totalCount={totalCount}
                  pageSize={pageSize}
                  onPageChange={this.onPageChange.bind(this)}
                />
              </Col>
            </Row>
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    table: state.table,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ fetchList, setTablePage }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ReduxTable);
