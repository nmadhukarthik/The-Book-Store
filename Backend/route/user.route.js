import express from "express"
import { login, Signup } from "../controller/user.controller.js"
// import { googleSignup } from "../controller/googleSignup.controller.js"

 export const router = express.Router()

router.post("/signup", Signup)
      .post("/login", login)
// router.get("/google", googleSignup)

