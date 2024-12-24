import express from 'express'
import { getBook } from '../controller/book.controller.js'


export const router = express.Router()

router.get("/", getBook)

