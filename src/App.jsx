import { CircularProgress, IconButton, Paper } from '@mui/material';
import { useState, useEffect, useMemo } from 'react';
import DataTable from 'react-data-table-component';
import { getRickAndMorty } from './services/rm.service';
import EditIcon from '@mui/icons-material/Edit';
import FilterComponent from './components/FilterComponent/FilterComponent';

const columns = [
  {
    name: 'Name',
    selector: (row) => row.name,
    sortable: true,
  },
  {
    name: 'Status',
    selector: (row) => row.status,
  },
  {
    name: 'Status',
    selector: (row) => row.status,
  },
  {
    name: 'Species',
    selector: (row) => row.species,
  },
  {
    name: 'Gender',
    selector: (row) => row.gender,
  },
  {
    name: 'Action',
    button: true,
    cell: () => (
      <IconButton color="primary" variant="contained" type="button">
        <EditIcon />
      </IconButton>
    ),
  },
];

const ExpandedComponent = ({ data }) => (
  <div>
    <div>{data.name}</div>
    <div>{data.status}</div>
    <div>
      <img src={data.img} width="100" alt={data.name} />
    </div>
  </div>
);

function App() {
  const [text, setText] = useState('');
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const [loading, setLoading] = useState(true);
  const [persons, setPersons] = useState([]);
  const personFilter = persons.filter((person) => person.name && ''.toLocaleLowerCase().includes(text.toLowerCase()));

  const handleChangeFilter = (e) => setText(e.target.value);

  const subHeaderComponent = useMemo(() => {
    const handerClear = () => {
      if (text) {
        setResetPaginationToggle(!resetPaginationToggle);
        setText('');
      }
    };

    return <FilterComponent filterText={text} onFilter={handleChangeFilter} onClear={handerClear} />;
  }, [text, resetPaginationToggle]);

  useEffect(() => {
    const fetchCall = async () => {
      const resp = await getRickAndMorty();
      setPersons(resp);
      setLoading(false);
    };

    fetchCall();
  }, []);

  return (
    <Paper
      elevation={3}
      sx={{
        padding: 5,
      }}
    >
      <DataTable
        title="Rick and Morty"
        progressPending={loading}
        progressComponent={<CircularProgress />}
        columns={columns}
        data={personFilter}
        subHeader
        subHeaderComponent={subHeaderComponent}
        expandableRows
        expandableRowsComponent={ExpandedComponent}
        pagination
      />
    </Paper>
  );
}

export default App;
