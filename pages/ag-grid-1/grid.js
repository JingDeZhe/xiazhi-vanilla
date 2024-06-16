import { createGrid } from 'ag-grid-enterprise'
import 'https://cdn.jsdelivr.net/npm/dayjs@1/dayjs.min.js'

export const initGrid = (el) => {
  /**@type {import('ag-grid-community').GridOptions} */
  const gridOptions = {
    rowModelType: 'serverSide',
    serverSideDatasource: createDatasource(),
    cacheBlockSize: 50,
    maxBlocksInCache: 2,
    blockLoadDebounceMillis: 500,
    // serverSideInitialRowCount: null,
    columnDefs: [
      { field: 'title', headerName: '名称', flex: 1, minWidth: 200 },
      {
        field: 'is_tv',
        headerName: '类型',
        valueFormatter: (p) => {
          return p.data.is_tv === 0 ? '电影' : '电视剧'
        },
        enableRowGroup: true,
      },
      { field: 'year', headerName: '时间', filter: 'agNumberColumnFilter', enableRowGroup: true },
      { field: 'role_desc', headerName: '角色' },
    ],
    autoSizeStrategy: {
      type: 'fitCellContents',
    },
    sideBar: true,
    // colResizeDefault: 'shift',

    // events
    onGridReady: ({ api }) => {
      console.log('grid ready')
      api.setFilterModel({
        year: {
          filterType: 'number',
          type: 'greaterThanOrEqual',
          filter: 2020,
        },
      })
    },

    onFirstDataRendered: ({ api }) => {
      api.ensureIndexVisible(0, 'top')
    },
  }
  const grid = createGrid(el, gridOptions)
}

const createDatasource = () => {
  return {
    getRows: (params) => {
      fetch('http://localhost:5177/db/douban/grid-service', {
        method: 'post',
        body: JSON.stringify(params.request),
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
      })
        .then((d) => d.json())
        .then((res) => {
          params.success(res)
        })
        .catch((err) => {
          console.error(err)
          params.fail()
        })
    },
  }
}
