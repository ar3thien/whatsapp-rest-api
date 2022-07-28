// dependencies declaration
//const qrcode = require('qrcode-terminal');
const fs = require("fs");
const express = require('express');
const app = express();
//const { body, validationResult } = require('express-validator');
const { Client, LocalAuth } = require('whatsapp-web.js');

//variables declaration
const QR_FILE_PATH = './last.qr';
global.ClientReady = false;

// clean old qr if present
if (fs.existsSync(QR_FILE_PATH)) {
  console.log(QR_FILE_PATH + ' file found! Removing it...');
  fs.unlinkSync(QR_FILE_PATH);
}


app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

// app.post('/send-message', [
//   body('number').notEmpty(),
//   body('message').notEmpty(),
// ], async (req, res) => {
//   const errors = validationResult(req).formatWith(({
//     msg
//   }) => {
//     return msg;
//   });

//   if (!errors.isEmpty()) {
//     return res.status(422).json({
//       status: false,
//       message: errors.mapped()
//     });
//   }

//   const number = req.body.number;
//   const numberDDI = number.substr(0, 2);
//   const numberDDD = number.substr(2, 2);
//   const numberUser = number.substr(-8, 8);
//   const message = req.body.message;

//   if (numberDDI !== "55") {
//     const numberZDG = number + "@c.us";
//     client.sendMessage(numberZDG, message).then(response => {
//       res.status(200).json({
//         status: true,
//         message: 'Message sent',
//         response: response
//       });
//     }).catch(err => {
//       res.status(500).json({
//         status: false,
//         message: 'Message not sent',
//         response: err.text
//       });
//     });
//   }
//   else if (numberDDI === "55" && parseInt(numberDDD) <= 30) {
//     const numberZDG = "55" + numberDDD + "9" + numberUser + "@c.us";
//     client.sendMessage(numberZDG, message).then(response => {
//       res.status(200).json({
//         status: true,
//         message: 'BOT-ZDG Mensagem enviada',
//         response: response
//       });
//     }).catch(err => {
//       res.status(500).json({
//         status: false,
//         message: 'BOT-ZDG Mensagem não enviada',
//         response: err.text
//       });
//     });
//   }
//   else if (numberDDI === "55" && parseInt(numberDDD) > 30) {
//     const numberZDG = "55" + numberDDD + numberUser + "@c.us";
//     client.sendMessage(numberZDG, message).then(response => {
//       res.status(200).json({
//         status: true,
//         message: 'BOT-ZDG Mensagem enviada',
//         response: response
//       });
//     }).catch(err => {
//       res.status(500).json({
//         status: false,
//         message: 'BOT-ZDG Mensagem não enviada',
//         response: err.text
//       });
//     });
//   }
// });

global.client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: { headless: true,args: ['--no-sandbox']},
});

client.initialize();

client.on('qr', (qr) => {
  console.log('QR Received');
  fs.writeFileSync(QR_FILE_PATH, qr);
});

client.on("ready", () => {
  console.log("The client is ready!");
  ClientReady = true;

  try {
    fs.unlinkSync(QR_FILE_PATH);
  } catch (err) { }
});

client.on("auth_failure", () => {
  console.log("AUTH Failed !");
  process.exit();
});

// client.on("ready", () => {
//   console.log("Client is ready!");
// });

// app.get('/initialize', async (req, res) => {
//   //req.header.add = client.initialize();
//   res.redirect('../new-client')
// });

// app.get("/getqr", async (req, res) => {
//   client
//     .getState()
//     .then((data) => {
//       if (data) {
//         res.write("<html><body><h2>Already Authenticated</h2></body></html>");
//         res.end();
//       } else client.on('qr', (qr) => {
//         console.log('QR RECEIVED here', qr);
//         res.end({ msg: qr });
//       });
//     })
//     .catch(() =>   client.on('qr', (qr) => {
//       console.log('QR RECEIVED there', qr);
//       res.end({ msg: qr });

//     }));
// });

app.get('/LastQR', async (req, res) => {
  if (ClientReady) {
    res.status(404).json({ msg: 'Client is already ready!' });
  } else {
  try {
    const LastQR = fs.readFileSync(QR_FILE_PATH, 'utf8');
    //console.log(data);
    res.status(200).json({ msg: LastQR });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'An error occured, please check the server logs' });
  }}
});

// app.get('/new-client', async (req, res) => {
//   try {
//     //console.log(client.initialize());
//     const ClientState = await client.getState();
//     console.log("ClientState: " + ClientState);
//     if(!ClientState) {
//       console.log('ClientState is null');
//       throw new Error('ClientState is null');
//     } else {
//     res.end({ msg: 'Client already connected' });
//     }
//     //await client.initialize();
//     //console.log(ClientState);
//   } catch (err) {
//     //client.initialize();
//     //console.log('start error catch')
//     client.on('qr', (qr) => {
//       res.end({ msg: qr });
//       console.log('QR RECEIVED', qr);
//     });
//     client.on('ready', () => {
//       console.log('Client is ready!');
//       // if(!qr) {
//       //   res.json({ msg: 'Client is ready!' });
//       // }
//       //res.json({ msg: 'Client is ready!' });
//     });
//     //await client.initialize();
//   }

//   // client.on('qr', qr => {
//   //     qrcode.generate(qr, {small: true});
//   // });

//   // client.on('ready', () => {
//   //   console.log('Client is ready!');
//   //   // client.getChats().then((chats) => {
//   //   //     console.log(chats[2]);
//   //   // })
//   //   //client.sendMessage("33782807851@c.us","this is a test");
//   //   //res.json({msg: 'Client is ready!'});

//   // });

//   //await client.initialize();
//   //return res.sendStatus(200);
// });

app.get('/ClientState', async (req, res) => {
  try {
    const ClientState = await client.getState();
    if (!ClientState) {
      console.log('ClientState is null');
      throw new Error('ClientState is null');
    } else {
      res.status(200).json({ msg: ClientState });
    }
  } catch (err) {
    res.status(110).json({ msg: 'Client not connected' });
  }
});

app.get('/Logout', async (req, res) => {
  // await client.logout();
  // res.status(200).json({ msg: 'Logout successful' });

  client.getState().then((data) => {
    if (!data) {
      //console.log(data)
      res.status(500).json({ msg: 'Logout failed, client not connected' });
    }
    else {
      client.logout();
      res.status(200).json({ msg: 'Logout successful' });
      process.exit();
    }
  }).catch(() => res.status(500).json({ msg: 'Logout failed, client not connected' }));
});


app.post('/SendMessage', async (req, res) => {
  // check if client is ready
  if (ClientReady) {
  // check if body parameters are empty
    if (!req.body.number || !req.body.message) {
      //res.send('Missing body parameters');
      //return res.sendStatus(400).json({ error: 'Missing body parameters' });
      console.log(req.body.number);
      return res.status(400).json({ msg: 'Missing body parameters' });
      //return res.status(400).send('Missing body parameters');
    }
  // get serialized number id
  const NumberId = await (client.getNumberId(req.body.number));
  //console.log(NumberId);
  if (!NumberId) {
    return res.status(400).json({ msg: 'Invalid number' });
  }
  // send the message
  client.sendMessage(NumberId._serialized, req.body.message);
  res.sendStatus(200);
  } else { // if client not ready
    return res.status(400).json({ msg: 'Client is not ready yet!' });
  }
})

app.listen(3000, function () {
  console.log('App running on *: ' + 3000);
});