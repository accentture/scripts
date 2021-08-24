import { Sequelize } from 'sequelize'

export const db = new Sequelize({
    dialect: 'mssql',
    host: 'smartpyme-dev.database.windows.net',
    port: 1433,
    database: 'smartpyme-enterprise-dev-database',
    username: 'developers',
    password: 'UBtRzXbgW@QFR8zZ',
    //dialectOptions: { instanceName: 'MSSQLSERVER' },
})

