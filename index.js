const express = require('express')
const cors = require('cors')
const app = express()

const employee_routes = require('./routes/employee_routes')
const company_routes = require('./routes/company_routes')
const workday_routes = require('./routes/workday_routes')
const clock_routes = require('./routes/clock_routes')

const host = '127.0.0.1'
const port = 3333

app.use(cors("http://localhost:3000/employees"))
app.use(express.json())
app.use('/employees', employee_routes)
app.use('/company', company_routes)
app.use('/workday', workday_routes)
app.use('/clock', clock_routes)

app.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}`)
})