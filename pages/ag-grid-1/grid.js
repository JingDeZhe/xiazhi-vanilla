import { createGrid } from 'ag-grid-enterprise'
import { computePosition } from 'https://cdn.jsdelivr.net/npm/@floating-ui/dom@1.6.5/+esm'

export const initGrid = (el) => {
  const posterPop = initPosterPop(el)
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
      },
      { field: 'year', headerName: '时间' },
      {
        field: 'poster',
        headerName: '封面',
        cellRenderer: (p) => {
          return `<span class="poster-anchor"><i class="gg-image"></i></span>`
        },
      },
      { field: 'role_desc', headerName: '角色' },
    ],
    autoSizeStrategy: {
      type: 'fitCellContents',
    },
    // colResizeDefault: 'shift',

    // events
    onGridReady: () => {
      console.log('grid ready')
    },

    onFirstDataRendered: ({ api }) => {
      api.ensureIndexVisible(0, 'top')
    },

    onCellClicked: (p) => {
      if (p.colDef.field === 'poster') {
        posterPop.show(p.data.poster)
        computePosition(p.event.target, posterPop.el, {
          placement: 'bottom-start',
        }).then(({ x, y }) => {
          Object.assign(posterPop.el.style, {
            left: `${x}px`,
            top: `${y}px`,
          })
        })
      } else {
        posterPop.hide()
      }
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

const initPosterPop = () => {
  const el = document.createElement('div')
  el.id = 'poster-pop'
  el.innerHTML = 'sss'
  const img = document.createElement('img')
  el.appendChild(img)
  document.body.appendChild(el)

  return {
    el,
    show: (url) => {
      el.style.display = 'block'
      img.src = url
    },
    hide: () => {
      el.style.display = 'none'
      img.src = '#'
    },
  }
}
