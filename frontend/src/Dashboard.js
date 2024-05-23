import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as d3 from 'd3';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { FormControl } from '@mui/material';
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [filters, setFilters] = useState({
    end_year: '',
    topic: '',
    sector: '',
    region: '',
    pestle: '',
    source: '',
    country: ''
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    itemsPerPage: 10
  });

  useEffect(() => {
    fetchChartData();
    fetchTableData();
  }, [filters, pagination.currentPage]);
  
  const fetchChartData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/dashboard/chart', {
        params: filters
      });
      setChartData(response.data.data);
      drawChart(response.data.data);
    } catch (error) {
      console.error('Error fetching chart data:', error);
    }
  };
  
  const fetchTableData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/dashboard/table', {
        params: {
          ...filters, // Include filters here
          page: pagination.currentPage,
          limit: pagination.itemsPerPage
        }
      });
      setData(response.data.data);
      setPagination({
        ...pagination,
        totalPages: response.data.totalPages,
        currentPage: response.data.currentPage
      });
    } catch (error) {
      console.error('Error fetching table data:', error);
    }
    
    // try {
    //   const response = await axios.get('http://localhost:8000/api/dashboard/table', {
    //     params: { ...filters, page: pagination.currentPage, limit: pagination.itemsPerPage }
    //   });
    //   setData(response.data.data);
    //   setPagination({
    //     ...pagination,
    //     totalPages: response.data.totalPages,
    //     currentPage: response.data.currentPage
    //   });
    // } catch (error) {
    //   console.error('Error fetching table data:', error);
    // }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };
  const clearFilters = () => {
    setFilters({
      end_year: '',
      topic: '',
      sector: '',
      region: '',
      pestle: '',
      source: '',
      country: ''
    });
  };

  const drawChart = (data) => {
    d3.select('#chart').selectAll('*').remove();

    const svg = d3.select('#chart')
      .append('svg')
      .attr('width', 6000) // Wide width for scrolling
      .attr('height', 400);

    const margin = { top: 20, right: 30, bottom: 40, left: 40 };
    const width = +svg.attr('width') - margin.left - margin.right;
    const height = +svg.attr('height') - margin.top - margin.bottom;

    const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3.scaleBand()
      .domain(data.map(d => d.topic))
      .rangeRound([0, width])
      .padding(0.1);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.intensity)])
      .rangeRound([height, 0]);

    g.append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x));

    g.append('g')
      .attr('class', 'axis axis--y')
      .call(d3.axisLeft(y).ticks(10));

    g.selectAll('.bar')
      .data(data)
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', d => x(d.topic))
      .attr('y', d => y(d.intensity))
      .attr('width', x.bandwidth())
      .attr('height', d => height - y(d.intensity))
      .attr('fill', 'steelblue');
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <Card variant="outlined">
      <React.Fragment>
    <CardContent>
    <h2>Search parameters</h2>
      <div>
      <FormControl>
        <TextField
          label="End Year"
          type="text"
          name="end_year"
          value={filters.end_year}
          onChange={handleInputChange}
          sx={{ marginRight: 2, marginBottom: 2}}
        />
        <TextField
          label="Topic"
          type="text"
          name="topic"
          value={filters.topic}
          onChange={handleInputChange}
          sx={{ marginRight: 2 }}
        />
      </FormControl>
      <FormControl>
        <TextField
          label="Sector"
          type="text"
          name="sector"
          value={filters.sector}
          onChange={handleInputChange}
          sx={{ marginRight: 2, marginBottom: 2}}
        />
        <TextField
          label="Region"
          type="text"
          name="region"
          value={filters.region}
          onChange={handleInputChange}
          sx={{ marginRight: 2 }}
        />       
      </FormControl>
      <FormControl>  
        <TextField
          label="PEST"
          type="text"
          name="pestle"
          value={filters.pestle}
          onChange={handleInputChange}
          sx={{ marginRight: 2, marginBottom: 2}}
        />    
        <TextField
          label="Source"
          type="text"
          name="source"
          value={filters.source}
          onChange={handleInputChange}
          sx={{ marginRight: 2}}
        />
        </FormControl>
        <FormControl>
        <TextField
          label="Country"
          type="text"
          name="country"
          value={filters.country}
          onChange={handleInputChange}
          sx={{ marginRight: 2, marginBottom: 2}}
        />
        <Button style={{maxWidth: '212px'}} variant="contained" onClick={clearFilters}>Clear Filter</Button>
        </FormControl>
      </div>
      </CardContent>
   
  </React.Fragment>
  </Card>
      <div style={{ width: '100%', height: '400px', overflowX: 'scroll', overflowY: 'hidden' }}>
        <div id="chart"></div>
      </div>
      <div>
        <Table sx={{ minWidth: 250, marginTop: 2}} size="small" aria-label="customized table">
        <TableHead sx={{backgroundColor:"#1976d2"}}>
            <TableRow >
              <TableCell sx={{ color:"white"}}>Title</TableCell>
              <TableCell sx={{ color:"white"}}>Intensity</TableCell>
              <TableCell sx={{ color:"white"}}>Likelihood</TableCell>
              <TableCell sx={{ color:"white"}}>Relevance</TableCell>
              <TableCell sx={{ color:"white"}}>End Year</TableCell>
              <TableCell sx={{ color:"white"}}>Country</TableCell>
              <TableCell sx={{ color:"white"}}>Topic</TableCell>
              <TableCell sx={{ color:"white"}}>Region</TableCell>
              <TableCell sx={{ color:"white"}}>Sector</TableCell>
              <TableCell sx={{ color:"white"}}>PEST</TableCell>
              <TableCell sx={{ color:"white"}}>Source</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(item => (
              <TableRow key={item._id}>
                <TableCell >{item.title}</TableCell >
                <TableCell >{item.intensity}</TableCell >
                <TableCell >{item.likelihood}</TableCell >
                <TableCell >{item.relevance}</TableCell >
                <TableCell >{item.end_year}</TableCell >
                <TableCell >{item.country}</TableCell >
                <TableCell >{item.topic}</TableCell >
                <TableCell >{item.region}</TableCell>
                <TableCell >{item.sector}</TableCell>
                <TableCell >{item.pestle}</TableCell>
                <TableCell >{item.source}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div>
        <Button variant="contained" size="small" sx={{ margin:2}}
          onClick={() => setPagination({ ...pagination, currentPage: pagination.currentPage - 1 })}
          disabled={pagination.currentPage === 1}
        >
          Previous
        </Button>
        <Button variant="contained" size="small" sx={{margin:2}}
          onClick={() => setPagination({ ...pagination, currentPage: pagination.currentPage + 1 })}
          disabled={pagination.currentPage === pagination.totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;

