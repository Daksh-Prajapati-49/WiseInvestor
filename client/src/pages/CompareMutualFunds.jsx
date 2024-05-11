import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import axios from 'axios';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import { preProcess } from '../utils/preProcess';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


// const opt = [
//   "groww-nifty-total-market-index-fund-direct-growth",
//   "zerodha-nifty-large-midcap-250-index-fund-direct-growth",
//   "navi-nifty-50-index-fund-direct-growth"
// ]

const CompareMutualFunds = ({ user, setUser }) => {
  const navigate = useNavigate();
  // console.log(signin);
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [])

  const [search, setSearch] = useState('');
  const [mfData, setMFData] = useState([]);
  const [opt, setOpt] = useState([
    "groww-nifty-total-market-index-fund-direct-growth",
    "zerodha-nifty-large-midcap-250-index-fund-direct-growth",
    "navi-nifty-50-index-fund-direct-growth"
  ]);

  const [fundName, setFundName] = useState([]);
  const [fundDetails, setFundDetails] = useState([]);
  const [returns, setReturns] = useState([]);
  const [prosCons, setProsCons] = useState([]);
  const [holdings, setHoldings] = useState([]);
  const [fundManager, setFundManager] = useState([]);
  const [fund, setFund] = useState([]);

  useEffect(() => {
    preProcess(mfData, fundName, setFundName, fundDetails, setFundDetails, returns, setReturns, prosCons, setProsCons, holdings, setHoldings, fundManager, setFundManager, fund, setFund);
  }, [mfData]);

  const add = async (e) => {
    e.preventDefault();
    try {
      console.log(search);
      const data = await axios.get(`http://localhost:5000/api/data/search/${search}`);
      setMFData([...mfData, data.data]);
      // console.log(data);
    }
    catch (e) {
      console.log(e.message);
    }
  }
  // useEffect(()=>{
  //   const tp = {
  //     "min_sip_investment": "Min SIP Amount",
  //     "expense_ratio": "Expense Ratio",
  //     "nav": "NAV"
  //   }
  //   setMFData([...mfData, tp]);
  //   // setMFData([]);
  // },[])

  useEffect(() => {
    console.log(mfData);
  }, [mfData])

  useEffect(() => {
    const getData = setTimeout(() => {
      axios
        .get(`http://localhost:5000/api/data/query/${search}`)
        .then((response) => {
          // console.log(response.data);
          const tp = [];
          response.data.data.content.forEach((element) => {
            tp.push(element.search_id);
          })
          setOpt(tp);
          // console.log(response.data.data.content);
        })
        .catch((error) => {
          console.log(error);
        });
    }, 2000)
    return () => clearTimeout(getData)
  }, [search])

  const rows = [
    "Fund Details",
    "Returns",
    "Pros & Cons",
    "Top Holdings",
    "Fund Manager",
    "About Fund"
  ]

  return (
    <>
      <Navbar user = {user} setUser={setUser} />
      <br />

      <Box
        sx={{
          width: 500,
          maxWidth: '100%',
          margin: 'auto'
        }}
      >
        <Stack spacing={2} sx={{ width: 500 }}>
          <Autocomplete
            id="free-solo-demo"
            Mutual-Fund-Name
            options={opt}
            renderInput={(params) => <TextField {...params} label="Mutual Fund Name" value={search}
              onChange={(e) => setSearch(e.target.value)} />}
            onChange={(e) => setSearch(e.target.innerText)}
          />
        </Stack>
      </Box>
      <br />
      <Stack spacing={2} direction="row" sx={{ width: 500, margin: 'auto' }}>
        {/* <Button variant="text">Text</Button> */}
        <Button variant="contained" onClick={add}>Add Mutual Fund</Button>
        {/* <Button variant="outlined">Outlined</Button> */}
      </Stack>
      <br />
      {
        mfData.length === 0 ?
          "" :
          (
            <div style={{ width: '90%', margin: "auto" }}>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      {fundName.map((ele, idx) => (
                        <TableCell style={{ width: '25%', border: '1px solid gray',backgroundColor:'#e2e8f0' }} align='center'><h3>{ele}</h3></TableCell>
                      ))}
                      {/* <TableCell>Dessert (100g serving)</TableCell>
                <TableCell align="right">Calories</TableCell>
                <TableCell align="right">Fat&nbsp;(g)</TableCell>
                <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
                    </TableRow>
                  </TableHead>



                  <TableBody>
                    {/* Fund Details  */}
                    <TableRow
                      sx={{ '&:last-child td, &:last-child th': { border: 1 } }}
                    >
                      <TableCell component="th" scope="row" colSpan={5} align="center" style = {{backgroundColor:'#dbeafe'}}>
                        <h3>{rows[0]}</h3>
                      </TableCell>
                    </TableRow>
                    {
                      fundDetails[0].map((_, colIndex) => (
                        <TableRow key={colIndex}>
                          {
                            fundDetails.map((row, rowIndex) => (
                              <TableCell key={rowIndex} align="center" style={{ border: '1px solid gray',backgroundColor:'#eff6ff' }}>
                                {
                                  row[colIndex]
                                }
                              </TableCell>
                            ))
                          }
                        </TableRow>
                      ))
                    }





                    {/* Returns  */}
                    <TableRow
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row" align="center" colSpan={5} style = {{backgroundColor:'#ccfbf1'}}>
                        <h3>{rows[1]}</h3>
                      </TableCell>
                    </TableRow>
                    {
                      returns[0].map((_, colIndex) => (
                        <TableRow key={colIndex}>
                          {
                            returns.map((row, rowIndex) => (
                              <TableCell key={rowIndex} align="center" style={{ border: '1px solid gray', backgroundColor:'#f0fdfa' }}>
                                {
                                  row[colIndex] ? row[colIndex] : "NA"
                                }
                              </TableCell>
                            ))
                          }
                        </TableRow>
                      ))
                    }




                    {/* Pros & Cons  */}
                    <TableRow
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row" align="center" colSpan={5} style = {{backgroundColor:'#ede9fe'}}>
                        <h3>{rows[2]}</h3>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align='center' style={{ border: '1px solid gray' ,backgroundColor:'#f5f3ff' }}>
                        Pros
                      </TableCell>
                      {
                        prosCons.map((ele, idx) => (
                          <TableCell align="center" style={{ border: '1px solid gray' ,backgroundColor:'#f5f3ff' }}>
                            <div>
                              {ele[0].length > 0 ? (ele[0].map((e, id) => {
                                return <div key={id}>{e}</div>

                              })) : "NA"
                              }
                            </div>


                          </TableCell>
                        ))
                      }
                    </TableRow>
                    <TableRow>
                      <TableCell align='center' style={{ border: '1px solid gray' ,backgroundColor:'#f5f3ff' }}>
                        Cons
                      </TableCell>
                      {
                        prosCons.map((ele, idx) => (
                          <TableCell align="center" style={{ border: '1px solid gray' ,backgroundColor:'#f5f3ff' }}>
                            <div>
                              {ele[1].length > 0 ? (ele[1].map((e, id) => {
                                return <div key={id}>{e}</div>

                              })) : "NA"
                              }
                            </div>
                          </TableCell>
                        ))
                      }
                    </TableRow>





                    {/* Top Holdings  */}
                    <TableRow
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row" align="center" colSpan={5} style = {{backgroundColor:'#fef3c7'}}>
                        <h3>{rows[3]}</h3>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell rowSpan={12} align='center' style={{ border: '1px solid gray' ,backgroundColor:'#fffbeb' }}>Top 10 Holdings</TableCell>
                    </TableRow>
                    {[...Array(11)].map((_, rowIndex) => (
                      <TableRow key={rowIndex}>
                        {holdings.map((column, colIndex) => (
                          <TableCell key={`${rowIndex}-${colIndex}`} style={{ border: '1px solid gray', backgroundColor:'#fffbeb' }}>
                            {column[rowIndex] ? (
                              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div>{column[rowIndex][0] ? column[rowIndex][0] : "NA"}</div>
                                <div>{column[rowIndex][1] ? column[rowIndex][1] : "NA"}</div>
                              </div>) : "NA"}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}





                    {/* Fund Manager  */}
                    <TableRow
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row" align="center" colSpan={5} style = {{backgroundColor:'#ffe4e6'}}>
                        <h3>{rows[4]}</h3>
                      </TableCell>
                    </TableRow>
                    {
                      fundManager[0].map((_, colIndex) => (
                        <TableRow key={colIndex}>
                          {
                            fundManager.map((row, rowIndex) => (
                              <TableCell key={rowIndex} align="center" style={{ border: '1px solid gray' , backgroundColor:'#fff1f2' }}>
                                {
                                  row[colIndex]
                                }
                              </TableCell>
                            ))
                          }
                        </TableRow>
                      ))
                    }




                    {/* About Fund  */}
                    <TableRow
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row" align="center" colSpan={5} style = {{backgroundColor:'#fae8ff'}}>
                        <h3>{rows[5]}</h3>
                      </TableCell>
                    </TableRow>
                    {
                      fund[0].map((_, colIndex) => (
                        <TableRow key={colIndex}>
                          {
                            fund.map((row, rowIndex) => (
                              <TableCell key={rowIndex} align="center" style={{ border: '1px solid gray',backgroundColor:'#fdf4ff' }}>
                                {
                                  row[colIndex]
                                }
                              </TableCell>
                            ))
                          }
                        </TableRow>
                      ))
                    }

                  </TableBody>
                </Table>
              </TableContainer>
            </div>)
      }
      {/* <div style={{ display: 'flex', flexWrap: 'wrap', width: '100%' }}>
        {mfData.map((data, index) => (
          <div key={index} style={{ flex: `calc(100% / ${mfData.length + 1} - 20px)`, margin: '10px', border: '1px solid #ccc', padding: '10px', minWidth: '200px', overflow: 'auto' }}>
            <pre style={{ whiteSpace: 'pre-wrap' }}>{JSON.stringify(data, null, 2)}</pre>
          </div>
        ))}
      </div> */}
    </>
  )
}

export default CompareMutualFunds