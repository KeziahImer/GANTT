import { Router } from 'express';
import Project from '../models/projects';
import Task from '../models/tasks';

const CreateProject = async (req, res) => {
  const project = new Project({
    name: req.body.name,
    start: req.body.start,
    end: req.body.end,
    userId: req.body.userId
  });
  try {
    await project.save();
    res.status(201).json({ messsage: 'Utilisateur créé !' });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const DeleteProject = async (req, res) => {
  try {
    await Project.deleteOne({ name: req.params.name });
    res.status(201).json({ message: 'Projet supprimé' });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const UpdateProject = async (req, res) => {
  try {
    await Project.updateOne(
      { name: req.body.oldname },
      { start: req.body.newstart }
    );
    await Project.updateOne(
      { name: req.body.oldname },
      { end: req.body.newend }
    );
    await Project.updateOne(
      { name: req.body.oldname },
      { name: req.body.newname }
    );
    res.status(201).json({ message: 'Projet mis à jour' });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const AddtaskProject = async (req, res) => {
  try {
    const task = new Task({
      name: req.body.task_name,
      start: req.body.start,
      end: req.body.end
    });
    await task.save();
    await Project.updateOne(
      { name: req.body.project_name },
      { $push: { tasks: task } }
    );
    res.status(201).json({ message: 'Tâche ajoutée' });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const RemovetaskProject = async (req, res) => {
  try {
    await Project.updateOne(
      { name: req.body.name },
      { $pull: { tasks: req.body.task } }
    );
    res.status(201).json({ message: 'Tâche supprimée' });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const GetProject = async (req, res) => {
  try {
    const projects = await Project.find({ userId: req.params.id });
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error });
  }
};

const GetOneProject = async (req, res) => {
  try {
    const project = await Project.find({ _id: req.params.id }).populate(
      'tasks'
    );
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ error });
  }
};

const router = Router();

router.post('/create', CreateProject);
router.post('/update', UpdateProject);
router.delete('/delete/:name', DeleteProject);
router.post('/addtask', AddtaskProject);
router.post('/removetask', RemovetaskProject);
router.get('/get/:id', GetProject);
router.get('/details/:id', GetOneProject);

export default router;
