import fetch from "node-fetch";

const headers = {
  accept: "application/json, text/plain, */*",
  "accept-language":
    "es-ES,es;q=0.9,en;q=0.8,de;q=0.7,ja;q=0.6,it;q=0.5,th;q=0.4",
  authorization:
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjJjMTU3MjFhLWZlYTgtNDk1ZC04ZDMwLWQyYjY5YjNjYjhiMiIsImNhdGVnb3J5TmlkIjotNywiZW1haWwiOiJ6a2ExOTk4QGdtYWlsLmNvbSIsImp3dCI6ImV5SjBlWEFpT2lKS1YxUWlMQ0poYkdjaU9pSklVekkxTmlKOS5leUp6ZFdJaU9pSjZhMkV4T1RrNFFHZHRZV2xzTG1OdmJTSXNJblZ6WlhKT2FXUWlPalV6TWpNMk15d2laM0oxY0c5R1lXMXBiR2xoY2s1cFpITWlPbHN6T1RjMk5EZGRMQ0owYVdWdVpVRmliMjV2UkdselkyRndZV05wZEdGa2J5STZabUZzYzJVc0ltRmliMjVoWkc4aU9tWmhiSE5sTENKbVlXMXBiR2xoY2tGaWIyNWhaRzhpT21aaGJITmxMQ0poZFdRaU9pSkNiMk5oSUZOdlkybHZjeUlzSW1Oc2FXVnVkR1ZPYVdRaU9pMHlMQ0p1WW1ZaU9qRTNOak14TXpneU9ESXNJbk52WTJsdlRtbGtJam96T1RjMk5EY3NJbVY0Y0NJNk1UYzJNemMwTXpBNE1pd2lhV0YwSWpveE56WXpNVE00TWpneUxDSmpZWFJsWjI5eWFXRk9hV1FpT2kwM0xDSnFkR2tpT2lJME1UYzJOemczT1MweU1EZG1MVFJpWWpFdE9XWXdNQzA0TUdZMU9EUmlNell4TmpBaUxDSmxiV0ZwYkNJNklucHJZVEU1T1RoQVoyMWhhV3d1WTI5dElpd2lZMkYwWldkdmNtbGhSM0oxY0c5R1lXMXBiR2xoY2s1cFpITWlPbHN0TjExOS4zN001dkQ4STd0QUllVVhnNFFMelJYbFlaVGNwQUVZdkJBdjBFcG8zVVJnIiwic29jaW9OaWQiOjM5NzY0Nywic29jaW9OdW1lcm8iOjI2NzczMiwic29jaW9UaXBvIjoicGxlbm8iLCJpYXQiOjE3NjMxMzgyODIsImV4cCI6MTc2MzIyNDY4Mn0.cLvYFMet6jM4r-Slrz3PO9CuvVQl4VSyjrC-cDBkIRw",
  "cache-control": "no-cache",
  pragma: "no-cache",
  priority: "u=1, i",
  "sec-ch-ua": '"Not;A=Brand";v="99", "Opera";v="123", "Chromium";v="139"',
  "sec-ch-ua-mobile": "?0",
  "sec-ch-ua-platform": '"Windows"',
  "sec-fetch-dest": "empty",
  "sec-fetch-mode": "cors",
  "sec-fetch-site": "same-site",
  cookie:
    "_ga=GA1.1.845973217.1758043686; HWWAFSESTIME=1762887865740; HWWAFSESID=fa7d310c4a423c4fe61; QueueITAccepted-SDFrts345E-V3_e20251109adh=EventId%3De20251109adh%26QueueId%3D00000000-0000-0000-0000-000000000000%26RedirectType%3Dafterevent%26IssueTime%3D1763058803%26Hash%3Deb797b57a6ea9ce53eb3ea299bcf469f94d9f908560ecbf3aab862a9d0b16054; _clck=pqbgr7%5E2%5Eg10%5E0%5E2085; QueueITAccepted-SDFrts345E-V3_e20251116adh=EventId%3De20251116adh%26QueueId%3D00000000-0000-0000-0000-000000000000%26FixedValidityMins%3D3%26RedirectType%3Didle%26IssueTime%3D1763139057%26Hash%3D800b967345eab4cb76b7ee6d448b382ac07ede276172e727f9bf9565a13ebf33; _clsk=1962r5m%5E1763139059528%5E23%5E1%5Ea.clarity.ms%2Fcollect; _ga_3FH6W5GDRD=GS2.1.s1763138272$o48$g1$t1763139059$j57$l0$h0",
  Referer: "https://bocasocios.bocajuniors.com.ar/",
};

const SECTORES = [
  "I",
  // "F",
  // "G",
  // "J",
  "H",
  // "LIC",
  // "TS4",
  // "TS5",
  // "TN1",
  // "TN2",
  // "ACREDITA",
  // "TN3",
  // "TN4",
  // "TN5",
  // "TS1",
  // "TS2",
  // "TS3",
  // "MPO",
  // "MPV",
  // "MPV1",
  // "MPV2",
  // "K",
  // "PREND",
  // "PRS3",
  // "M20",
  // "MC",
  // "MD",
  // "MI",
  // "MPA",
  // "PLCOF",
  // "PRN1",
  // "PRN2",
  // "PRN3",
  // "PRS1",
  // "PRS2",
  // "SPD",
  // "PMPOA",
  // "PMPOB",
  // "PMPCOA",
  // "PMPCOB",
  // "SMV",
  // "SBI",
  // "SCD",
  // "SCI",
  // "SDD",
  // "SDI",
  // "SPC",
  // "PPS3",
  // "SAC",
  // "SAD",
  // "SAI",
  // "SBC",
  // "SBD",
  // "PLCVS",
  // "PPN1",
  // "PPN2",
  // "PPN3",
  // "PPS1",
  // "PPS2",
  // "LD",
  // "VCN",
  // "VCS",
  // "PCJVP",
  // "PLCPREF",
  // "PLCVN",
  // "LID",
  // "LII",
  // "LPC",
  // "LPD",
  // "LPI",
  // "LV",
];

while (true) {
  const sectores = await fetch(
    "https://bocasocios-gw.bocajuniors.com.ar/event/809/seat/section/availability",
    {
      headers,
      body: null,
      method: "GET",
    }
  ).then((res) => res.json());

  const disponibles = sectores.secciones
    .filter((sector) => sector.hayDisponibilidad)
    .filter((sector) => SECTORES.includes(sector.codigo)); // Excluir sector no deseado

  console.log("Sectores con disponibilidad:", disponibles.length);

  if (disponibles.length > 0) {
    const asientos = await fetch(
      `https://bocasocios-gw.bocajuniors.com.ar/event/seat/section/${disponibles[0].nid}/availability`,
      {
        headers,
        body: null,
        method: "GET",
      }
    ).then((res) => res.json());

    console.log(
      "Asientos disponibles en el sector",
      disponibles[0].nid,
      ":",
      asientos.ubicaciones.length
    );

    const reservar = await fetch(
      `https://bocasocios-gw.bocajuniors.com.ar/event/seat/reserve/${asientos.ubicaciones[0].nid}`,
      {
        headers,
        body: JSON.stringify({
          ubicacionNid: asientos.ubicaciones[0].nid,
        }),
        method: "POST",
      }
    );
    if (reservar.ok) console.log({ success: true, message: "Reserva exitosa" });
    break;
  }
  await new Promise((r) => setTimeout(r, 5000));
}
