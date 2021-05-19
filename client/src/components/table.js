import React, { useState } from "react";
import {
    useTable,
    useSortBy,
    usePagination,
    useFilters,
    useGlobalFilter
    // useAsyncDebounce,
} from "react-table";

import { Spinner, Table } from "reactstrap";
import {
    Label,
    Input,
    CustomInput,
    FormGroup,
    Pagination,
    PaginationItem,
    PaginationLink
} from "reactstrap";
import { matchSorter } from "match-sorter";
import classNames from "classnames";

function DefaultColumnFilter({
    column: { filterValue, preFilteredRows, setFilter }
}) {
    return (
        <Input
            type="text"
            value={filterValue || ""}
            onChange={(e) => {
                setFilter(e.target.value || undefined);
            }}
            placeholder="Search..."
            style={{
                fontSize: "10px"
            }}
        />
    );
}


function fuzzyTextFilterFn(rows, id, filterValue) {
    return matchSorter(rows, filterValue, { keys: [(row) => row.values[id]] });
}

fuzzyTextFilterFn.autoRemove = (val) => !val;

const XTable = ({ columns, data, loading = true, toggle, setTitle, setPatient}) => {
    const [switchSearch, setSwitchSearch] = useState(false);
    const toggleSwitchSearch = () => {
        setAllFilters([]);
        setSwitchSearch(!switchSearch);
    };
    const filterTypes = React.useMemo(
        () => ({
            fuzzyText: fuzzyTextFilterFn,
            text: (rows, id, filterValue) => {
                return rows.filter((row) => {
                    const rowValue = row.values[id];
                    return rowValue !== undefined
                        ? String(rowValue)
                            .toLowerCase()
                            .startsWith(String(filterValue).toLowerCase())
                        : true;
                });
            }
        }),
        []
    );

    const defaultColumn = React.useMemo(
        () => ({
            Filter: DefaultColumnFilter
        }),
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        setAllFilters,
        state: { pageIndex, pageSize }
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0, pageSize: 10 },
            defaultColumn,
            filterTypes
        },
        useFilters,
        useGlobalFilter,
        useSortBy,
        usePagination
    );

    return (
        <>
            <div>
                <span className="float-right ">
                    <CustomInput
                        checked={switchSearch}
                        className="table-search-switch"
                        type="switch"
                        name="customSwitch"
                        id="customSwitch"
                        onChange={toggleSwitchSearch}
                        label={<i className="fas fa-filter"></i>}
                    />
                </span>
            </div>
            <Table {...getTableProps()} hover bordered responsive className="table">
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <>
                            <tr className="theader" {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column) => (
                                    <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                        {column.render("Header")}
                                             <span className="float-right">
                                            {!column.notShowSortingDisplay ? (
                                                column.isSorted ? (
                                                    column.isSortedDesc ? (
                                                        <i className="fas fa-sort-down"></i>
                                                    ) : (
                                                            <i className="fas fa-sort-up"></i>
                                                    )
                                                ) : (
                                                        <i className="fas fa-sort"></i>
                                                )
                                            ) : (
                                                ''
                                            )}
                                        </span> 
                                    </th>
                                ))}
                            </tr>
                            {switchSearch ? (
                                <tr style={{ backgroundColor: "aliceBlue" }}>
                                    {headerGroup.headers.map((column, index) => (
                                        <th className="tfilter">
                                            {column.canFilter ? (
                                                <FormGroup className="mb-1">
                                                    <Label className="divFilter mb-0">
                                                        Filter {column.render("Header")} :
                          </Label>
                                                    {column.render("Filter")}
                                                </FormGroup>
                                            ) : null}
                                        </th>
                                    ))}
                                </tr>
                            ) : (
                                ""
                            )}
                        </>
                    ))}
                </thead>
                {loading ? (
                    <tbody>
                        <tr>
                            <td colSpan="10000" className="text-center">
                                <Spinner />
                            </td>
                        </tr>
                    </tbody>
                ) : (
                    <>
                        {page.length === 0 ? (
                            <tbody>
                                <tr>
                                    <td colSpan="10000" className="text-left">
                                      ** No values with that filter
                  </td>
                                </tr>
                            </tbody>
                        ) : (
                            <tbody {...getTableBodyProps()}>
                                {page.map((row, i) => {
                                    prepareRow(row);
                                    return (
                                        <tr {...row.getRowProps()}>
                                            {row.cells.map((cell) => {
                                                return (
                                                    <td onClick={() => { setTitle("Edit Vaccination"); setPatient(row.original); toggle(); }}
                                                        {...cell.getCellProps({
                                                            className: cell.column.className
                                                        })}
                                                    >
                                                        {cell.render("Cell")}
                                                    </td>
                                                );
                                            })}
                                        </tr>
                                    );
                                })}
                            </tbody>
                        )}
                    </>
                )}
            </Table>

            {page.length > 0 && (
                <div className={classNames("div-pagination", { "d-none": loading })}>
                    <div className="div-pagination-2">
                        <div className="div-pagination-2-2">
                            Showing{" "}
                            <select
                                className="selectan"
                                value={pageSize}
                                onChange={(e) => {
                                    setPageSize(Number(e.target.value));
                                }}
                            >
                                {[10, 20, 30, 50, 100].map((pageSize) => (
                                    <option key={pageSize} value={pageSize}>
                                        {pageSize}
                                    </option>
                                ))}
                            </select>{" "}
              record per-page
            </div>
                    </div>

                    <div className="div-pagination-1">
                        Page : {pageIndex + 1} from {pageOptions.length}{" "}
                        <Pagination className="pagina">
                            <PaginationItem disabled={!canPreviousPage}>
                                <PaginationLink onClick={() => gotoPage(0)}>
                                    {"<<"}
                                </PaginationLink>
                            </PaginationItem>
                            <PaginationItem disabled={!canPreviousPage}>
                                <PaginationLink onClick={() => previousPage()}>
                                    {"<"}
                                </PaginationLink>
                            </PaginationItem>
                            <PaginationItem disabled={!canNextPage}>
                                <PaginationLink onClick={() => nextPage()}>
                                    {">"}
                                </PaginationLink>
                            </PaginationItem>
                            <PaginationItem disabled={!canNextPage}>
                                <PaginationLink onClick={() => gotoPage(pageCount - 1)}>
                                    {">>"}
                                </PaginationLink>
                            </PaginationItem>
                        </Pagination>

                    </div>
                </div>
            )}
        </>
    );
};

export default XTable;
