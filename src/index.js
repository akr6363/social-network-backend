import express from 'express'
import mongoose from "mongoose";
import {postValidator} from "../validation/post.js";
import {validationResult} from 'express-validator'
import PostModel from "../models/Post.js";
import cors from 'cors'

// подключение к базе данных monoGB
mongoose.connect('mongodb+srv://akr6363:m4rostov6363@cluster0.k28vbpl.mongodb.net/social-network?retryWrites=true&w=majority')
    .then(() => console.log('DB ok'))
    .catch((err) => console.log('DB error', err))


const app = express()
const port = 4444

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.send('Hello World!')
    res.end()
})


app.get('/posts', async (req, res) => {
    try {
        const posts = await PostModel.find()
        res.json(posts)
    } catch (err) {
        res.status(500).json({
            message: 'Не удалось получить статьи'
        })
    }
})

app.post('/posts', postValidator, async (req, res) => {

    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array())
        }

        const doc = new PostModel({
            // title: req.body.title,
            text: req.body.text,
        })

        const post = await doc.save()

        res.json(post)
    } catch (err) {
        res.status(500).json({
            message: "Не удалось создать пост"
        })
    }
})

// app.delete('/posts/:id', async (req, res) => {
//     try {
//         const postId = req.params.id
//         console.log(postId)
//         PostModel.findOneAndDelete({
//             _id: postId
//         }, (err, doc) => {
//             if (err) {
//                 console.log(err)
//                 return res.status(500).json ({
//                     message: 'Не удалось удалить статью'
//                 })
//             }
//             if (!doc) {
//                 return res.status(404).json({
//                     message: 'Статья не найдена'
//                 })
//             }
//             res.json({
//                 success: true
//             })
//         })
//     }
//
//     catch (err) {
//         res.status(500).json({
//             message: "errooor"
//         })
//     }
// })

app.delete('/posts/:id', async (req, res) => {
    try {
        const postId = req.params.id
        const deletePost = await PostModel.findOneAndDelete({
            _id: postId
        })
        res.json('sucess')
    } catch (err) {
       res.json('не удалось удалить статью статью')
    }

})


app.listen(port,() => {
    console.log(`Example app listening on port ${port}`)
})

