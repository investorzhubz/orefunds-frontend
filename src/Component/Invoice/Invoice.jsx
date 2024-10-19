import React from 'react';
import html2canvas from 'html2canvas'; // Import html2canvas
import jsPDF from 'jspdf'; // Import jsPDF
import './assets/css/style.css';
import signature from '../../resources/images/signature.gif';
import logo from '../../resources/images/logoces.png';

const Invoice = ({ data }) => {
  
  // Function to format the date
  function formatMongoDate(mongoDate) {
    const date = new Date(mongoDate);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);
    return `${day}.${month}.${year}`;
  }

  // Function to handle the download of the invoice as PDF
  const handleDownload = () => {
    const invoiceSection = document.getElementById('tm_download_section');
    
    // Temporarily set the invoice section to desktop size for the PDF generation
    const originalWidth = invoiceSection.style.width;
    invoiceSection.style.width = '800px'; // Force width to desktop size
  
    html2canvas(invoiceSection).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
  
      const imgWidth = 190; // Width of the image in the PDF
      const pageHeight = pdf.internal.pageSize.height;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
  
      let position = 0;
  
      // Add the image to the PDF
      pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
  
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
  
      // Save the PDF
      pdf.save(`invoice_${data.invoiceNumber || 'default'}.pdf`);
  
      // Revert the invoice section back to its original size after PDF generation
      invoiceSection.style.width = originalWidth;
    });
  };
  
  return (
    <div className="tm_container">
      <div className="tm_invoice_wrap">
        <div className="tm_invoice tm_style1 tm_type1" id="tm_download_section">
          <div className="tm_invoice_in">
            <div className="tm_invoice_head tm_top_head tm_mb15 tm_align_center">
              <div className="tm_invoice_left">
                <div className="tm_logo">
                  <img src={logo} alt="Logo" />
                </div>
              </div>
              <div className="tm_invoice_right tm_text_right tm_mobile_hide">
                <div className="tm_f50 tm_text_uppercase tm_white_color">Invoice</div>
              </div>
              <div className="tm_shape_bg tm_accent_bg tm_mobile_hide"></div>
            </div>
            <div className="tm_invoice_info tm_mb25">
              <div className="tm_card_note tm_mobile_hide">
                <b className="tm_primary_color">Payment Method: </b>{data.method}
              </div>
              <div className="tm_invoice_info_list tm_white_color">
                <p className="tm_invoice_number tm_m0">Invoice No: <b>#LL93784</b></p>
                <p className="tm_invoice_date tm_m0">Date: <b>{formatMongoDate(data.createdAt)}</b></p>
              </div>
              <div className="tm_invoice_seperator tm_accent_bg"></div>
            </div>
            <div className="invoice-status">
              <p>STATUS : {data.status}</p>
            </div>
            <div className="tm_invoice_head tm_mb10">
              <div className="tm_invoice_left">
                <p className="tm_mb2"><b className="tm_primary_color">Invoice To:</b></p>
                <p>
                  {data.firstname} {data.lastname} <br />
                  {data.address}<br />
                  {data.country}<br />
                  {data.email}
                </p>
              </div>
              <div className="tm_invoice_right tm_text_right">
                <p className="tm_mb2"><b className="tm_primary_color">Pay To:</b></p>
                <p>
                  {process.env.REACT_APP_APP_NAME}<br />
                </p>
              </div>
            </div>
            <div className="tm_table tm_style1">
              <div className="">
                <div className="tm_table_responsive">
                  <table>
                    <thead>
                      <tr className="tm_accent_bg">
                        <th className="tm_width_3 tm_semi_bold tm_white_color">Transaction</th>
                        <th className="tm_width_4 tm_semi_bold tm_white_color">Method</th>
                        <th className="tm_width_2 tm_semi_bold tm_white_color">Amount</th>
                        <th className="tm_width_1 tm_semi_bold tm_white_color">Currency</th>
                        <th className="tm_width_2 tm_semi_bold tm_white_color tm_text_right">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="tm_width_3">1. {data.type}</td>
                        <td className="tm_width_4">{data.method}</td>
                        <td className="tm_width_2">{data.amount}</td>
                        <td className="tm_width_1">{data.currency}</td>
                        <td className="tm_width_2 tm_text_right">{data.amount}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="tm_invoice_footer tm_border_top tm_mb15 tm_m0_md">
             
              <div class="tm_left_footer">
                {/* <p class="tm_mb2"><b class="tm_primary_color">Payment info:</b></p>
                <p class="tm_m0">Credit Card - 236***********928 <br />Amount: $1732</p> */}
              </div>

                <div className="tm_right_footer">
                  <table className="tm_mb15">
                    <tbody>
                      <tr className="tm_gray_bg">
                        <td className="tm_width_3 tm_primary_color tm_bold">Subtotal</td>
                        <td className="tm_width_3 tm_primary_color tm_bold tm_text_right">{data.amount} {data.currency}</td>
                      </tr>
                      <tr className="tm_gray_bg">
                        <td className="tm_width_3 tm_primary_color">Fees <span className="tm_ternary_color">(0)</span></td>
                        <td className="tm_width_3 tm_primary_color tm_text_right">0</td>
                      </tr>
                      <tr className="tm_accent_bg">
                        <td className="tm_width_3 tm_border_top_0 tm_bold tm_f16 tm_white_color">Grand Total</td>
                        <td className="tm_width_3 tm_border_top_0 tm_bold tm_f16 tm_white_color tm_text_right">{data.amount} {data.currency}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="tm_invoice_footer tm_type1">
              <div class="tm_left_footer">
                {/* <p class="tm_mb2"><b class="tm_primary_color">Payment info:</b></p>
                <p class="tm_m0">Credit Card - 236***********928 <br />Amount: $1732</p> */}
              </div>
                <div className="tm_right_footer">
                  <div className="tm_sign tm_text_center">
                    <img src={signature} alt="Sign" />
                    <p className="tm_m0 tm_ternary_color">Jhon Dorrel</p>
                    <p className="tm_m0 tm_f16 tm_primary_color">Accounts Manager</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="tm_note tm_text_center tm_font_style_normal">
              <hr className="tm_mb15" />
              <p className="tm_mb2"><b className="tm_primary_color">Terms & Conditions:</b></p>
              <p className="tm_m0">Any claims related to transaction errors, discrepancies, or account balance issues must be reported in writing within thirty (30) days from the date of the transaction...</p>
            </div>
          </div>
        </div>
        <div className="tm_invoice_btns tm_hide_print">
          <a href="javascript:window.print()" className="tm_invoice_btn tm_color1">
            <span className="tm_btn_icon">
              <svg xmlns="http://www.w3.org/2000/svg" className="ionicon" viewBox="0 0 512 512"><path d="M384 368h24a40.12 40.12 0 0040-40V168a40.12 40.12 0 00-40-40H104a40.12 40.12 0 00-40 40v160a40.12 40.12 0 0040 40h24" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="32"/><rect x="128" y="240" width="256" height="208" rx="24.32" ry="24.32" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="32"/><path d="M368 240V104a40.12 40.12 0 00-40-40H184a40.12 40.12 0 00-40 40v136" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="32"/><path d="M368 448l32 32 32-32" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="32"/><path d="M368 384h32a32 32 0 0032-32v-32" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="32"/><path d="M144 384h32a32 32 0 0032-32v-32" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="32"/><path d="M256 448v-32" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="32"/></svg>
            </span>
            <span className="tm_btn_text">Print</span>
          </a>
          <button className="tm_invoice_btn tm_color2" onClick={handleDownload}>
            <span className="tm_btn_icon">
              <svg xmlns="http://www.w3.org/2000/svg" className="ionicon" viewBox="0 0 512 512"><path d="M432 384H80a32 32 0 01-32-32V128a32 32 0 0132-32h352a32 32 0 0132 32v224a32 32 0 01-32 32z" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="32"/><path d="M368 448l32 32 32-32" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="32"/><path d="M368 384h32a32 32 0 0032-32v-32" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="32"/><path d="M144 384h32a32 32 0 0032-32v-32" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="32"/><path d="M256 448v-32" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="32"/></svg>
            </span>
            <span className="tm_btn_text">Download</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
