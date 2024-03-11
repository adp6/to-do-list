const {Router} = require ('express')
const Task = require('../Model/Task')
const {check , validationResult} = require ('express-validator')

const router = Router()

router.post(
    '/tasks',
    [
        check('task', 'Task is required').not().isEmpty(),
        check('deadline', 'Deadline is required and should be a future date').isDate().custom((value, { req }) => {
            const today = new Date();
            if (value < today) {
                throw new Error('Deadline should be a future date');
            }
            return true;
        })
    ],
    async (req, res) => {
        try{
            const error = validationResult(req)
            if(!error.isEmpty()){
                return res.status(400).json({
                    error:error.array(),
                    message:'Wrong data'
                })
            }
            const {task , deadline} = req.body
            const isExist =  await Task.findOne({task})
            if(isExist){
                return res.status(400).json({message:'Such task already exist'})
            }
            const newTask = new Task({task, deadline})
            await newTask.save()
            res.status(201).json({ message: 'Task successfully added' })
        } catch (e) {
            res.status(500).json({message:'Something go wrong, try again'})
        }
    }
)

router.delete(
    '/tasks/:id',
    async(req,res)=>{
        const taskId = req.params.id;
        try{
            await Task.findByIdAndDelete(taskId)
            res.status(200).json({ message: 'Task deleted successfully' });
        } catch (e) {
            res.status(500).json({message:'Something go wrong, try again'})
        }
    }
)