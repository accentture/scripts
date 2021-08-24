import { db as sequelize } from '../../db/db-connection'
import dayjs from 'dayjs'
import fs from 'fs'
var faker = require('faker');

import utc from 'dayjs/plugin/utc'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import objectSupport from "dayjs/plugin/objectSupport";
import { DateService } from './date';
dayjs.extend(utc)
dayjs.extend(localizedFormat)
dayjs.extend(objectSupport);

/* --cuando reasonId = 4 complete aditionInformation */

export class Unsubcriptions {
    constructor(private dateService: DateService) { }
    writeContentInFile(content: string) {
        fs.appendFileSync('unsubscribers.sql', content)
    }
    addAditionInformation(reasonId: number) {
        let aditionalInformation
        if (reasonId === 4) {
            aditionalInformation = faker.lorem.sentence()
        } else {
            aditionalInformation = 'NULL'
        }
        return aditionalInformation
    }
    createQuery(year: number, month: number, day: number) {
        const reasonId = Math.floor(Math.random() * 4) + 1
        const date = this.dateService.getDate(year, month, day)

        const sql = `INSERT INTO Unsubscriptions VALUES(NEWID(), '${faker.internet.email()}', '${date}', ${reasonId}, '${this.addAditionInformation(reasonId)}' ); \n`

        return sql
    }

    createRecordsByDay(year: number, month: number, day: number, recordsByDay: number) {
        let sql
        for (let record = 1; record <= recordsByDay; record++) {
            sql = this.createQuery(year, month, day)
            this.writeContentInFile(sql)
        }
    }
    createRecordsByMonth(year: number, month: number, ammountRecords: number) {
        const daysByMonth = 30,
            recordsByDay = parseInt(`${ammountRecords / daysByMonth}`),
            sqlComment = `\n\n/* ${this.dateService.getNameOfMonth(month)} */\n`

        this.writeContentInFile(sqlComment)
        for (let day = 1; day <= daysByMonth; day++) {
            this.createRecordsByDay(year, month, day, recordsByDay)
            /* if ((month != 1 && day <= 21) || (month != 12 && day >= 21)) {
            } */

        }
    }
    createAllRecords(year: number, totalMonths: number, ammountRecords: number) {
        for (let month = 1; month <= totalMonths; month++) {
            this.createRecordsByMonth(year, month, ammountRecords)
        }
    }
    fullSqlFile(minRecords: number, maxRecords: number, year: number, totalMontsh: number) {
        const numberOfRecords = Math.floor(Math.random() * (maxRecords - minRecords + 1)) + minRecords

        this.createAllRecords(year, totalMontsh, numberOfRecords)

    }
}

