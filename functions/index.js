const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");


const serviceAccount = require("./webshop0781-firebase-adminsdk-wri6p-4f551295b5.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:
  "https://webshop0781-default-rtdb.europe-west1.firebasedatabase.app",
});

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(bodyParser.json());

const verifyToken = (req, res, next) => {
  const idToken = req.headers.authorization;

  admin
    .auth()
    .verifyIdToken(idToken)
    .then((decodedToken) => {
      req.user = decodedToken;
      next();
    })
    .catch((error) => {
      console.error("Hiba történt a token ellenőrzésekor:", error);
      res.sendStatus(401);
    });
};

app.post("/setCustomClaims", verifyToken, (req, res) => {
  const { uid, claims } = req.body;
  admin
    .auth()
    .setCustomUserClaims(uid, claims)
    .then(() => {
      console.log("Felhasználó claimsek sikeresen beállítva.");
      res.json({ message: "OK" });
    })
    .catch((error) => {
      console.error(
        "Hiba történt a felhasználó claimsek beállításakor:",
        error
      );
      res.sendStatus(500);
    });
});

app.post("/setUserProfile", (req, res) => {
  const { uid, displayName, profilePicture, phoneNumber, email} = req.body;
  admin
    .auth()
    .updateUser(uid, {
      displayName: displayName,
      photoURL: profilePicture,
      phoneNumber: phoneNumber,
      email: email
    })
    .then((userRec) => {
      res.json({message:"Sikeres profil módosítás!", uid: uid});
    }).catch((err) => console.error(err));
});

app.post("/deleteUser", (req, res) => {
    const { uid } = req.body
    admin.auth().deleteUser(uid)
    .then(() => res.json({message: 'Felhasználó sikeresen törölve!'}))
    .catch((err) => console.error(err));
})

app.get("/users", verifyToken, (req, res) => {
  admin
    .auth()
    .listUsers()
    .then((userRecords) => {
      const users = userRecords.users.map((user) => ({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        claims: user.customClaims,
        profilePicture: user.photoURL,
        phoneNumber: user.phoneNumber
        // Egyéb felhasználói adatok ......
      }));
      res.json(users);
    })
    .catch((error) => {
      console.error("Hiba történt a felhasználók lekérésekor:", error);
      res.sendStatus(500);
    });
});

app.get("/users/:uid/claims", verifyToken, (req, res) => {
  const { uid } = req.params;
  admin
    .auth()
    .getUser(uid)
    .then((userRecord) => {
      res.json(userRecord.customClaims);
    })
    .catch((error) => {
      console.error("Hiba történt a felhasználó lekérdezésekor:", error);
      res.sendStatus(500);
    });
});

exports.api = functions.https.onRequest(app);
