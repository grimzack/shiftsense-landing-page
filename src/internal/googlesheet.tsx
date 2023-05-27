import { google } from 'googleapis';
export async function getWaitlistDummyList() {
  try {
    const target = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
    const jwt = new google.auth.JWT(
      process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
      undefined,
      (process.env.GOOGLE_SHEETS_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
      target
    );

    const sheets = google.sheets({ version: 'v4', auth: jwt });
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: 'Waitlist', // sheet name
    });

    const rows = response.data.values;
    if (rows != null && rows !== undefined && rows.length) {
      return rows.map((row) => ({
        title: row[2],
        subtitle: row[3],
        code: row[4],
        browser: row[5],
      }));
    }
  } catch (err) {
    console.log(err);
  }
  return [];
}