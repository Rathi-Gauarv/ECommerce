import React, { useState } from 'react'
import Swal from 'sweetalert2'
import '../Styles/ExportButton.css'

const ExportButton = ({download}) => {
    const [exportSelected, setExportSelected] = useState(null)

    const handleExportOption = (e)=>{
        setExportSelected(e.target.value)
    }

    const handleDownload = ()=>{
        if(exportSelected && exportSelected!=="Export As"){
                exportSelected=="Excel" ? download?.exportToExcel() : download?.exportToPdf()
            }else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please select file type first !',
              })
        }
    }

    return (
        <div className=" export_btn_icon_container">
            <select className="export_select " onChange={handleExportOption}>
                <option value="Export As" selected>Export As</option>
                <option value="Excel">Excel</option>
                <option value="PDF">PDF</option>
            </select>

            {
                (exportSelected && exportSelected !=="Export As") ?
                <i className={(exportSelected && exportSelected !=="Export As")? "download_iconAfterSelected fa-solid fa-download":"download_icon fa-solid fa-download" } onClick={handleDownload}></i>
                : <i className={(exportSelected && exportSelected !=="Export As")? "download_iconAfterSelected fa-solid fa-download":"download_icon fa-solid fa-download" } onClick={handleDownload} data-toggle="tooltip" data-placement="center" title="Please select file type first"></i>
            }
            
            
        </div>

       
    )
}

export default ExportButton
