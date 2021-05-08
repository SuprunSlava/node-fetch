const fetchData = require("./fetch-data");
const {
    Client
} = require('pg');

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'root',
    port: 5432,
});

const url = "http://www.dsdev.tech/logs/",
    year = "2021",
    month = "01",
    day = "23";

const storeData = async () => {
    const data = await fetchData(url, year, month, day);
    data.sort((a, b) => {
        const keyA = new Date(a.created_at),
            keyB = new Date(b.created_at);
        if (keyA < keyB) return -1;
        if (keyA > keyB) return 1;
        return 0;
    });
    client.connect();
    for (const key in data) {
        const {
            created_at,
            first_name,
            message,
            second_name,
            user_id
        } = data[key];
        //Replace redundant whitespaces and replacing ' with double quotes to prevent sql escaping
        const trimmedMessage = message.toString().replace(/\s+/g, ' ').trim().replace(/'/g, "''");
        const query = `INSERT INTO logs.userslogs(created_at, first_name, message, second_name, user_id) 
        VALUES ('${created_at}', '${first_name}', '${trimmedMessage}', '${second_name}', ${user_id})`
        console.log(query);
        client.query(query, (error, response) => {
            if (error) {
                console.log(error);
                return;
            }
            console.log("Data insert successful");
        })
    }
}
storeData();