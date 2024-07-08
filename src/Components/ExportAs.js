import React, { useState } from "react";
import Swal from "sweetalert2";
import "../Styles/ExportAs.css";

const ExportAs = ({ download }) => {
  const handleDownload = (e) => {
    if (e.target.value !== "Export As") {
      if (e.target.value == "CSV") {
        download?.exportToCSV();
      } else if (e.target.value == "PDF") {
        download?.exportToPdf();
      }
      Swal.fire({
        icon: "success",
        title: "Your file has started downloading...",
      });
    }
  };

  return (
    <div className=" export_btn_icon_container">
      <select className="export_select" onChange={handleDownload}>
        <option value="Export As" selected>
          Export As
        </option>
        <option value="CSV">CSV</option>
        <option value="PDF">PDF</option>
      </select>
    </div>
  );
};

export default ExportAs;
