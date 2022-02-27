import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Typography from "@mui/material/Typography";
/* @ts-ignore */
import useStora from "@rawewhat/stora";
import { useCallback, useEffect } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";

import api from "./api";

interface IFormInput {
  name: string;
}

const initialStates = {
  app: {
    loading: false,
    patients: null,
  },
};

const initialActions = {
  app: {
    setPatients: ({ set }: any, data: any) => {
      console.log({ data });
      set("app", { loading: false, patients: data });
    },
  },
};

const initializer = (stora: unknown) => {
  // console.log("stora", stora);
};

const defaultRows: Patient[] = [
  { id: 1, _id: "1", name: "Test 1" },
  { id: 2, _id: "2", name: "Test 2" },
  { id: 3, _id: "3", name: "Test 3" },
];

function App() {
  const { control, handleSubmit } = useForm<IFormInput>();
  const [state, action] = useStora({
    states: initialStates,
    actions: initialActions,
    init: initializer,
  });
  // console.log({ state });

  let rows = defaultRows;
  if (state.app.patients && state.app.patients.length > 0) {
    rows = state.app.patients.map((patient: Patient) => ({
      id: patient._id,
      _id: patient._id,
      name: patient.name,
    }));
  }

  const onSubmit = useCallback<SubmitHandler<IFormInput>>(async (data) => {
    console.log({ data });
    try {
      await api.insertPatient(data);
      refetch();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const remove = useCallback(async (id: string) => {
    try {
      await api.deletePatientById(id);
      refetch();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const refetch = useCallback(async () => {
    try {
      const patients = await api.getAllPatients();
      action.app.setPatients(patients.data.data);
    } catch (error) {
      console.log(error);
      action.app.setPatients([]);
    }
  }, []);

  useEffect(() => {
    refetch();
  }, []);

  return (
    <>
      <CssBaseline />
      <Container
        sx={{ display: "flex", flexDirection: "column", height: "100%" }}
        maxWidth="md"
      >
        <Typography
          variant="h2"
          component="h2"
          gutterBottom
          sx={{ textAlign: "center", pt: 3 }}
        >
          Stora Demo App
        </Typography>
        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            pr: "7px",
            "& .MuiTextField-root": { m: 1, flex: 1 },
          }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
        >
          <>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  // error

                  label="Name"
                  placeholder="Patient name"
                  // helperText="Incorrect name."
                />
              )}
            />
            <Button
              size="large"
              sx={{
                height: 54,
              }}
              type="submit"
              variant="contained"
            >
              Add
            </Button>
          </>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "white",
            height: "100vh",
          }}
        >
          {state.app.loading ? (
            <CircularProgress />
          ) : state.app.patients && state.app.patients.length === 0 ? (
            <Typography variant="h4" component="h4">
              No Data
            </Typography>
          ) : (
            <TableContainer sx={{ flex: 1, my: 2 }} component={Paper}>
              <Table aria-label="patient table">
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{ display: { xs: "none", md: "table-cell" } }}
                    >
                      ID
                    </TableCell>
                    <TableCell>Patient Name</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row: Patient) => (
                    <TableRow key={row._id}>
                      <TableCell
                        component="th"
                        scope="row"
                        sx={{ display: { xs: "none", md: "table-cell" } }}
                      >
                        {row._id}
                      </TableCell>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>
                        <IconButton
                          aria-label="delete"
                          color="primary"
                          onClick={() => remove(row._id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>
      </Container>
    </>
  );
}

export default App;
