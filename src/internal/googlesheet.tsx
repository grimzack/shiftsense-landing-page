import useGoogleSheets from 'use-google-sheets';
const { GoogleSpreadsheet } = require('google-spreadsheet');

const doc = new GoogleSpreadsheet(process.env.REACT_APP_GOOGLE_SHEET_ID);


export default async function googleSpreadsheet() {

  console.log("called!")
  try {
    console.log(process.env)
    const key =process.env.REACT_APP_GOOGLE_SHEETS_PRIVATE_KEY ?  process.env.REACT_APP_GOOGLE_SHEETS_PRIVATE_KEY : ""
    console.log("key is " + key)
    console.log(process.env.REACT_APP_GOOGLE_SHEETS_CLIENT_EMAIL)
    
    await doc.useServiceAccountAuth({
      client_email: process.env.REACT_APP_GOOGLE_SHEETS_CLIENT_EMAIL,
      private_key: key.replace(/\\n/gm, '\n')
    });


    console.log("got auth")

    await doc.getInfo();
    console.log("info")
    const sheet = doc.sheetsByIndex[0];
    console.log("sheet");
    const rows = await sheet.getRows();
    console.dir(rows);
    const row_value = rows[2][0];
    console.log(row_value)

    //res.status(200).json({ message: 'A ok!' });
  } catch (error) {
    console.log("err is " + error)
    //res.status(500).json(error);
  }
}