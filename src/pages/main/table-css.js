const cssString = `
.Ptable{
    width: 100%;
    margin-bottom: 10px;
    font-size: 12px;
    /*border-collapse: collapse;*/
    border-spacing: 0;
    line-height: 18px;
}

.Ptable tdTitle{
  width: 72px
}

.Ptable th, .param_table th, .Ptable td, .param_table td{
    padding: 8px;
    border: 1px solid #dadada;
    text-align: left;
    vertical-align: baseline;
}

.Ptable th, .param_table th{
    width: 100%;
    colspan: 2;
}

`;
export default cssString;
