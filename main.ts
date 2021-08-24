import { db as sequelize } from './db/db-connection'
import { DateService } from './scripts/unsubscriptions/date';
import { Unsubcriptions } from './scripts/unsubscriptions/queries';
const prompt = require('prompt-sync')();

class Main {
    constructor() {
        this.runScripts()
    }
    async runScripts() {
        //await this.connecSqlServertDatabase()
        this.executeScript()
    }
    async connecSqlServertDatabase() {
        try {
            await sequelize.authenticate()
            console.log('-------connection with SQL SERVER was done sucessly!!')

        } catch (error) {
            console.log(error)
        }
    }
    executeScript() {
        /* console.log('===== Hi Alejandro, there are disponible scripts for: unsubscriptions =====')
        const name = prompt('Choose a table: ');
        console.log(`Hey there ${name}`); */
        const unsubcriptions = new Unsubcriptions(new DateService())
        unsubcriptions.fullSqlFile(500, 1000, 2021, 12)
    }
}
const main = new Main()