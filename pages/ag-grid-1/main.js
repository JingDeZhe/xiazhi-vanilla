import { initGrid } from './grid'
import './main.css'
import 'ag-grid-enterprise/styles/ag-grid.min.css'
import 'ag-grid-enterprise/styles/ag-theme-quartz.min.css'

const app = document.querySelector('#app')

const grid = document.createElement('div')
grid.id = 'grid'
grid.className = 'ag-theme-quartz'
app.appendChild(grid)

initGrid(grid)
