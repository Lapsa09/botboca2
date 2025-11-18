import fetch from "node-fetch";

const headers = {
  accept: "application/json, text/plain, */*",
  "accept-language":
    "es-ES,es;q=0.9,en;q=0.8,de;q=0.7,ja;q=0.6,it;q=0.5,th;q=0.4",
  authorization: "Bearer eyJhbGciOi",
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
    "__Secure-1PSID=; __Secure-1PSIDCC=; CONSENT=YES+ES.es+20220328-17-0; __Secure-3PAPISID=; __Secure-3PAPISIDC=; SID=; HSID=; SSID=; APISID=; SAPISID=; NID=; __Secure-1PAPISID=; __Secure-1PAPISIDC=;",
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
    "https://bocasocios-gw.bocajuniors.com.ar/event/811/seat/section/availability",
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
