// import React, { useState } from "react";
// import { useRouter } from "next/router";

// const AttendanceTable = () => {
//   const router = useRouter();
//   const code = router.query.name;
//   const [attendanceData, setAttendanceData] = useState([]);
//   const [tableRows, setTableRows] = useState([]);
//   const [dates, setDates] = useState([]);
//   async function getAttendanceData() {
//     const res = await fetch("/api/mongo/attendancedata", {
//       method: "POST",
//       headers: {
//         "content-Type": "application/json",
//       },
//       body: JSON.stringify(code),
//     });
//     const receivedData = await res.json();
//     console.log(receivedData);
//     setAttendanceData(receivedData.attendanceData);
//     setDates(receivedData.dates);
//     console.log(dates, attendanceData);
//     const rows = receivedData.attendanceData.map((row,i) => {
//       return (
//         <tr className="border" key={row.roll}>
//           <td className="border">{dates[i]}</td>
//           {row.map((isPresent, index) => (
//             <td className="border" key={index}>{isPresent ? "P" : "A"}</td>
//           ))}
//         </tr>
//       );
//     });
//     setTableRows(rows);
//   }
//   const dateHeadersRow = dates.map((dateHeader, i) => (
//     <tr key={i}>{dateHeader}</tr>
//   ));
//   return (
//     <>
//     <div>
//       <h2>
//         <button
//           className="bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none"
//           onClick={getAttendanceData}
//         >
//           click to view
//         </button>
//       </h2>

//       {attendanceData.length > 0 && (
//         <table className="border">
//           <thead className="border">
//             <tr>
//               <th className="border">Dates</th>

//               {attendanceData[0].map((_, i) => (
//                 <th className="border" key={i}>Roll No. {i + 1}</th>
//               ))}
//             </tr>
//           </thead>
          
//           {tableRows}
          
//         </table>
//       )}

//       </div>
//     </>
//   );
// };

// export default AttendanceTable;

import React, { useState } from "react";
import { useRouter } from "next/router";
import { saveAs } from "file-saver";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import XLSX from "xlsx";

const AttendanceTable = () => {
  const router = useRouter();
  const code = router.query.name;
  const [attendanceData, setAttendanceData] = useState([]);
  const [tableRows, setTableRows] = useState([]);
  const [dates, setDates] = useState([]);

  async function getAttendanceData() {
    const res = await fetch("/api/mongo/attendancedata", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(code),
    });
    const receivedData = await res.json();
    console.log(receivedData);
    setAttendanceData(receivedData.attendanceData);
    setDates(receivedData.dates);
    console.log(dates, attendanceData);
    const rows = receivedData.attendanceData.map((row, i) => {
      return (
        <tr className="border" key={row.roll}>
          <td className="border">{dates[i]}</td>
          {row.map((isPresent, index) => (
            <td className="border" key={index}>
              {isPresent ? "P" : "A"}
            </td>
          ))}
        </tr>
      );
    });
    setTableRows(rows);
  }

  const dateHeadersRow = dates.map((dateHeader, i) => (
    <tr key={i}>{dateHeader}</tr>
  ));

  const DownloadButton = () => {
    const downloadAsPdf = () => {
      const doc = new jsPDF();

      const tableData = attendanceData.map((row, i) => [
        dates[i],
        ...row.map((isPresent) => (isPresent ? "P" : "A")),
      ]);

      doc.autoTable({
        head: [
          ["Dates", ...attendanceData[0].map((_, i) => `Roll No. ${i + 1}`)],
        ],
        body: tableData,
      });

      doc.save("attendance.pdf");
    };

    const downloadAsExcel = () => {
      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.aoa_to_sheet([
        ["Dates", ...attendanceData[0].map((_, i) => `Roll No. ${i + 1}`)],
        ...attendanceData.map((row, i) => [
          dates[i],
          ...row.map((isPresent) => (isPresent ? "P" : "A")),
        ]),
      ]);
      XLSX.utils.book_append_sheet(workbook, worksheet, "Attendance");
      const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });
      const excelData = new Blob([excelBuffer], {
        type:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      saveAs(excelData, "attendance.xlsx");
    };

    return (
      <div className="flex-row">
        <button className="bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none" onClick={downloadAsPdf}>Download as PDF</button>
      </div>
    );
  };

  return (
    <>
      <div>
        <h2>
          <button
            className="bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none"
            onClick={getAttendanceData}
          >
            Click to view
          </button>
        </h2>

        {attendanceData.length > 0 && (
          <table className="border">
            <thead className="border">
              <tr>
                <th className="border">Dates</th>

                {attendanceData[0].map((_, i) => (
                  <th className="border" key={i}>
                    Roll No. {i + 1}
                  </th>
                ))}
              </tr>
            </thead>

            {tableRows}
          </table>
        )}

        {attendanceData.length > 0 && <DownloadButton />}
      </div>
    </>
  );
};

export default AttendanceTable;
