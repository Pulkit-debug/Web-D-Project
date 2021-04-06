const fs = require("fs");   // since I'll be writing to the file so I need fs
const rfs = require("rotating-file-stream");    // used to rotate the logs when the file gets full
const path = require("path");

// logDirectory defines where the log will be stored.
const logDirectory = path.join(__dirname, "../production_logs");
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream("access.log", {
    interval: "1d",
    path: logDirectory,
});

const development = {
    name: "development",
    asset_path: "./assets",
    session_cookie_key: "something",
    db: "getSocial_development",
    smtp: {
        service: "gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: "vpulkit567@gmail.com",
            pass: "pulkit567",
        },
    },
    google_client_id:
        "949351513265-sdn6tdljof4svu82ttjb6dv13r4gckb5.apps.googleusercontent.com",
    google_client_secret: "_E3B1KOTDH4aW3jNvsRoUS4J",
    google_call_back_url: "http://localhost:9000/users/auth/google/callback",
    jwt_secret: "getSocial",
    morgan: {
        mode: "dev",
        options: { stream: accessLogStream },
    }
}

const production = {
    name: "production",
    asset_path: process.env.getSocial_asset_path,
    session_cookie_key: process.env.getSocial_session_cookie_key,
    db: process.env.getSocial_db,
    smtp: {
        service: "gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.getSocial_auth_user,
            pass: process.env.getSocial_auth_pass,
        },
    },
    google_client_id: process.env.getSocial_google_client_id,
    google_client_secret: process.env.getSocial_google_client_secret,
    google_call_back_url: process.env.getSocial_google_call_back_url,
    jwt_secret: process.env.GETSOCIAL_JWT_SECRET,
    morgan: {
        mode: "combined",
        options: { stream: accessLogStream },
    }
}

module.exports = eval(process.env.NODE_ENV) == undefined ? development : eval(process.env.NODE_ENV);