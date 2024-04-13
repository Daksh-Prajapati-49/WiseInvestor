import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import axios from 'axios';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';


// const opt = [
//   "groww-nifty-total-market-index-fund-direct-growth",
//   "zerodha-nifty-large-midcap-250-index-fund-direct-growth",
//   "navi-nifty-50-index-fund-direct-growth"
// ]

const CompareMutualFunds = ({ signin, user }) => {
  const navigate = useNavigate();
  console.log(signin);
  useEffect(() => {
    if (!signin) {
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

  const add = async (e) => {
    e.preventDefault();
    try {
      console.log(search);
      const data = await axios.get(`http://localhost:5000/api/data/search/${search}`);
      setMFData([...mfData, data]);
      console.log(data);
    }
    catch (e) {
      console.log(e.message);
    }
  }

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
        response.data.data.content.forEach((element)=>{
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

  // const call = (event)=>{
  //   event.preventDefault();
  //   console.log(event.target);
  //   console.log(event.target.innerText);
  // }

  return (
    <>
      <Navbar />
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
          onChange={(e)=>setSearch(e.target.innerText)}
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
      <div style={{ display: 'flex', flexWrap: 'wrap', width: '100%' }}>
        {mfData.map((data, index) => (
          <div key={index} style={{ flex: `calc(100% / ${mfData.length + 1} - 20px)`, margin: '10px', border: '1px solid #ccc', padding: '10px', minWidth: '200px', overflow: 'auto' }}>
            {/* <h6>Data {index + 1}:</h6> */}
            <h6>{data.data.meta_title}</h6>
            <pre style={{ whiteSpace: 'pre-wrap' }}>{JSON.stringify(data.data, null, 2)}</pre>
          </div>
        ))}
      </div>






    </>
  )
}

export default CompareMutualFunds