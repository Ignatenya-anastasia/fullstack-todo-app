import express from "express";
import {Request, Response, NextFunction} from "express";
import {postData, getData, putData, deleteData} from '../service/service';
import {checkBody, checkID} from '../middlewares/middlewares';

const route = express.Router();

route.post('/', checkBody, async (req: Request, res: Response) => {
    try{
        const {title, description, completed, created_at} = req.body;
        const result = await postData(title, description, completed, created_at);
        res.status(200).send(result)
    }catch(err: any){
        res.status(400).send(err.message)
    }
    
});

route.get('/', async (req: Request, res: Response) => {
    try{
        const result = await getData();
        res.status(200).send(result)
    }catch(err: any){
        res.status(400).send(err.message)
    }
});

route.put("/:id", checkBody, checkID,  async (req: Request, res: Response) => {
    try{
        const id = Number(req.params.id);
        const {title, description, completed, created_at} = req.body;
        const result = await putData(id, title, description, completed, created_at);
        res.status(200).send(result)
    }catch(err: any){
        res.status(400).send(err.message)
    }
});

route.delete("/:id", checkID, async (req: Request, res: Response) => {
    try{
        const id = Number(req.params.id);
        const result = await deleteData(id);
        res.status(200).send(result)
    }catch(err: any){
        res.status(400).send(err.message);
    }
});



export default route;