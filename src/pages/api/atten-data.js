/**
 * @param {import ('next').NextApiRequest} req
 * @param {import ('next').NextApiResponse} res
 */
import Cors from "cors";
import initMiddleware from '../../lib/initMiddleware'
const cors = Cors({
    methods: ["GET", "POST", "PUT", "DELETE"],
    origin: "*", // allow requests from any origin
});
export default async function handler(req, res) {
    await initMiddleware(req, res, cors);
    const data = req.body;
    console.log("THIS IS IN ATTENDATA");
    const { course: code } = data
    console.log(code)
    const response = await fetch('http://172.25.64.1:5000/api', {
        method: "POST",
        headers: {
            'content-Type': 'application/json'
        },
        body: JSON.stringify(code)
    })
    const attendanceData = await response.json()
    console.log(attendanceData)

    // const attendanceData = {
    //     "20BSCCS001": false,
    //     "20BSCCS002": true,
    //     "20BSCCS003": true,
    //     "20BSCCS004": false,
    //     "20BSCCS005": true,
    //     "20BSCCS006": false,
    //     "20BSCCS007": false,
    //     "20BSCCS008": true,
    //     "20BSCCS009": false,
    //     "20BSCCS010": true,
    //     "20BSCCS011": true,
    //     "20BSCCS012": true,
    //     "20BSCCS013": true,
    //     "20BSCCS014": true,
    //     "20BSCCS015": false,
    //     "20BSCCS016": false,
    //     "20BSCCS017": true,
    //     "20BSCCS018": false,
    //     "20BSCCS019": true,
    //     "20BSCCS020": false
    // };

    console.log('exiting ....')
    res.json({ attendanceData })
}
/**
 * const keyBytes = new Uint8Array(32);
    window.crypto.getRandomValues(keyBytes);
    const key = CryptoJS.enc.Base64;
    const iv = CryptoJS.lib.WordArray.random(16);
    const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
    }).toString();
 */