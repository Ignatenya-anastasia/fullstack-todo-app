import {pool} from "../../db";
import { iTask } from "../interface/interface";

async function postTasks(title: string, description: string, completed: boolean, created_at: string): Promise<iTask[]> {
    const connection = await pool.connect();
    try{
        await connection.query("begin");
        const sql = "insert into tasks (title, description, completed, created_at) values ($1, $2, $3, $4)";
        await connection.query(sql, [title, description, completed, created_at]);
        const sql2 = "select * from tasks";
        const result = await connection.query(sql2);
        await connection.query("commit");
        return result.rows;
    }catch(err: any){
        await connection.query("rollback");
        throw new Error();
    }
};

async function getTask(): Promise<iTask[]> {
    const connection = await pool.connect();
    try{
        await connection.query("begin");
        const sql = "select * from tasks";
        const result = await connection.query(sql);
        await connection.query("commit");
        return result.rows;
    }catch(err: any){
        await connection.query("rollback");
        throw new Error();
    };
};

async function putTask(id: number, title: string, description: string, completed: boolean, created_at: string): Promise<iTask[]> {
    const connection = await pool.connect();
    try{
        await connection.query("begin");
        const sql = "update tasks set title = $1, description = $2, completed = $3, created_at = $4  where id = $5";
        await connection.query(sql, [title, description, completed, created_at, id]);
         const sql2 = "select * from tasks";
        const result = await connection.query(sql2);
        await connection.query("commit");
        return result.rows;
    }catch(err: any){
        await connection.query("rollback");
        throw new Error();
    };
};

async function deleteTask(id:number): Promise<iTask[]>{
    const connection = await pool.connect();
    try{
        await connection.query("begin");
        const sql = "delete from tasks where id =$1";
        await connection.query(sql, [id]);
        const sql2 = "select * from tasks";
        const result = await connection.query(sql2);
        await connection.query("commit");
        return result.rows;
    }catch(err: any){
        await connection.query("rollback");
        throw new Error();
    };
};

export {postTasks, getTask, putTask, deleteTask}