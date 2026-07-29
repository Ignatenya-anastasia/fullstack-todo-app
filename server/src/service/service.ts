import { iTask } from "../interface/interface";
import {postTasks, getTask, putTask, deleteTask} from "../repository/repository";


async function postData(title: string, description: string, completed: boolean, created_at: string): Promise<iTask[]> {
    const result: iTask[] = await postTasks(title, description, completed, created_at);
    if(!result.length) throw new Error("Произошла ошибка при создании");
    return result;
};

async function getData() {
    const result: iTask[] = await getTask();
    if(!result.length) throw new Error("Произошла ошибка");
    return result;
};

async function putData(id: number, title: string, description: string, completed: boolean, created_at: string) : Promise<iTask[]> {
    const result: iTask[] = await putTask(id, title, description, completed, created_at);
    if(!result.length) throw new Error("Произошла ошибка");
    return result;
};

async function deleteData(id: number): Promise<iTask[]> {
    const result: iTask[] = await deleteTask(id);
    if(!result.length) throw new Error("Элемент не существует");
    return result;
}

export {postData, getData, putData, deleteData}