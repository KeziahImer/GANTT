import { Router } from 'express'
import Project from '../models/projects.js'
import mangoose from 'mongoose'
import projects from '../models/projects.js'

async function CreateProject(req, res, next) {
    const project = new Project({
        name: req.body.name,
        start: req.body.start,
        end: req.body.end
    })
    try {
        await project.save()
        res.status(201).json({ messsage: 'Utilisateur créé !'})
    } catch (error) {
        res.status(400).json({error})
    }
}

const router = Router()

router.post('/create', CreateProject)

export default router;
