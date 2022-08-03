import { Stack, TextField, Paper, Button } from '@mui/material'
import { Container } from '@mui/system'
import { useRef, useState, useEffect } from 'react'


import Tracker from '@openreplay/tracker';

const tracker = new Tracker({
  projectKey: "653PmfezjGAlnV0I8hu9",
  ingestPoint: "https://openreplay.testdomain.com/ingest"
});


export default function Home() {

  useEffect(() => {
    tracker.start();
  }, [])

  const nameRef = useRef(null)
  const emailRef = useRef(null)
  const addressRef = useRef(null)
  const pwdRef = useRef(null)
  const creditCardRef = useRef(null)
  const [data, setData] = useState([])

  async function saveData() {
    const payload = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      address: addressRef.current.value,
      cc: creditCardRef.current.value,
      pwd: pwdRef.current.value
    }

    const resp = await fetch('/api/data', {
      method: 'POST',
      body: JSON.stringify(payload)
    })

    const respData = await resp.json()
    setData([...data, respData])

  }

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ py: 5}}>
        <Container maxWidth="sm">
          <Stack spacing={3}>
            <TextField autoComplete='false' inputRef={nameRef} label="Name" data-openreplay-htmlmasked ></TextField>
            <TextField autoComplete='false' inputRef={emailRef} label="E-mail"></TextField>
            <TextField autoComplete='false' inputRef={pwdRef} label="Password" type={"password"}></TextField>
            <TextField autoComplete='false' inputRef={creditCardRef} label="Credit Card" ></TextField>
            <TextField autoComplete='false' inputRef={addressRef} label="Address" data-openreplay-htmlmasked></TextField>
            <Button variant='contained' onClick={saveData}>Save</Button>
          </Stack>
        </Container>
        <Container maxWidth="sm">
          <Stack spacing={3}>
          {data && data.map( (d, idx) => {
            return (
              <Paper elevation={2} key={idx} sx={{p: 2}}>
                <p >
                  {d.name} 
                  ({d.email}) - 
                  <span data-openreplay-masked>{d.address}</span>
                </p>
                <p >
                  {d.cc} - 
                  <span data-openreplay-masked>{d.pwd}</span>
                </p>
              </Paper>
            )
          })}
          </Stack>
        </Container>
      </Paper>
    </Container>
  )
}
