import fetch from "node-fetch";
import puppeteer from "puppeteer";
import readline from "readline";

const SECTORES = [
  "I",
  "F",
  "G",
  "J",
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

const TIMEOUT = 5000;

let puntos = 0;

// Function to get user input from console
function getUserInput(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
}

// Get credentials from user
console.log("=== Login a Boca Socios ===");
const userEmail = await getUserInput("Ingrese su email: ");
const userPassword = await getUserInput("Ingrese su contraseña: ");
console.log("===========================\n");

const browser = await puppeteer.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  args: ["--disable-cache"],
});

const [page] = await browser.pages();

async function server() {
  while (true) {
    const sectoresResponse = await fetch(
      "https://bocasocios-gw.bocajuniors.com.ar/event/812/seat/section/availability",
      {
        headers,
        method: "GET",
      }
    );

    if (!sectoresResponse.ok) {
      console.log("Error al obtener sectores, recargando cookies...");
      await page.reload({ waitUntil: "networkidle0" });
      const cookies = await browser.cookies().then((cookies) => {
        return cookies
          .map((cookie) => `${cookie.name}=${cookie.value}`)
          .join("; ");
      });
      headers.Cookie = cookies;
      continue;
    }

    const sectores = await sectoresResponse.json();

    const disponibles = sectores.secciones
      .filter((sector) => sector.hayDisponibilidad)
      .filter((sector) => SECTORES.includes(sector.codigo)); // Excluir sector no deseado

    puntos = (puntos + 1) % 4; // 0,1,2,3 → vuelve a 0
    const dots = ".".repeat(puntos); // "", ".", "..", "..."
    console.clear(); // Limpia la consola (opcional)

    console.log("Buscando sectores con disponibilidad" + dots);

    if (disponibles.length > 0) {
      for (const sector of disponibles) {
        const asientos = await fetch(
          `https://bocasocios-gw.bocajuniors.com.ar/event/seat/section/${sector.nid}/availability`,
          {
            headers,
            method: "GET",
          }
        ).then((res) => res.json());

        console.log(
          "Asientos disponibles en el sector",
          sector.codigo,
          ":",
          asientos.ubicaciones.length
        );
        for (const asiento of asientos.ubicaciones) {
          const reservar = await fetch(
            `https://bocasocios-gw.bocajuniors.com.ar/event/seat/reserve/${asiento.nid}`,
            {
              headers,
              body: JSON.stringify({
                ubicacionNid: asiento.nid,
              }),
              method: "POST",
            }
          );
          if (reservar.ok) {
            console.log({ success: true, message: "Reserva exitosa" });
            await browser.close();
            return;
          } else {
            const error = await reservar.json();
            console.log({ success: false, error });
          }
        }
      }
    }
    await new Promise((r) => setTimeout(r, TIMEOUT));
  }
}

const SELECTORS = {
  loginForm: "#__next > main > div > span > span > form",
  closeButton:
    "#__next > main > div > span > span > form > div._dsp-flex._ai-stretch._fd-column._bxs-border-box._pos-relative._mih-0px._miw-0px._fs-1._pr-0px._pl-0px._pb-0px._bg-FFFFFF35._fg-1._fb-0px > div > div:nth-child(10) > div._dsp-flex._ai-stretch._fd-column._fb-auto._bxs-border-box._pos-relative._mih-0px._miw-0px._fs-0._pr-20px._pl-20px._pt-20px > button",
};

async function login() {
  try {
    const form = await page.waitForSelector(SELECTORS.loginForm);

    // Find email input with more robust approach
    const emailInput =
      (await form?.waitForSelector("input[type='email']")) ||
      (await page.waitForSelector("input[type='email']"));

    // Find password input with more robust approach
    const passwordInput =
      (await form?.waitForSelector("input[type='password']")) ||
      (await page.waitForSelector("input[type='password']"));

    if (!emailInput || !passwordInput) {
      throw new Error("No se encontró el campo de email o contraseña");
    }

    // Clear fields first, then type
    await emailInput.click(); // Select all
    await emailInput.type(userEmail);

    await passwordInput.click(); // Select all
    await passwordInput.type(userPassword);

    // Wait a moment for fields to be filled
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Use the specific original selector for the login button
    console.log("Buscando botón de login...");
    const loginButton = await page.waitForSelector(
      "#__next > main > div > span > span > form > div._dsp-flex._ai-stretch._fd-column._bxs-border-box._pos-relative._mih-0px._miw-0px._fs-1._pr-0px._pl-0px._pb-0px._bg-FFFFFF35._fg-1._fb-0px > div > div:nth-child(10) > div._dsp-flex._ai-stretch._fd-column._fb-auto._bxs-border-box._pos-relative._mih-0px._miw-0px._fs-0._pr-20px._pl-20px._pt-20px > button",
      { timeout: 5000 }
    );

    if (loginButton) {
      console.log("Botón de login encontrado, haciendo click...");
      await loginButton.click();
    } else {
      console.log("Botón de login no encontrado, intentando alternativa...");
      const closePopup = await page.waitForSelector(SELECTORS.closeButton);
      await closePopup?.click();
    }
  } catch (error) {
    console.error("Error en el login:", error);
    throw error;
  }
}

let headers;

console.log("Navegando a Boca Socios...");
await page.goto("https://bocasocios.bocajuniors.com.ar");

try {
  console.log("Intentando iniciar sesión...");
  await login(page);
  console.log("¡Inicio de sesión exitoso!");
} catch (error) {
  console.warn(
    "Error en el login, continuando de todos modos:",
    error instanceof Error ? error.message : String(error)
  );
}
console.log("Ingresando a la página principal...");
await page.waitForNavigation({ waitUntil: "networkidle0" });
await page.goto("https://bocasocios.bocajuniors.com.ar/matches/812/plateas");
await page
  .waitForRequest(
    "https://bocasocios-gw.bocajuniors.com.ar/event/812/seat/section/availability"
  )
  .then((res) => {
    headers = res.headers();
  });
const cookies = await browser.cookies().then((cookies) => {
  return cookies.map((cookie) => `${cookie.name}=${cookie.value}`).join("; ");
});
headers.Cookie = cookies;

await server();
