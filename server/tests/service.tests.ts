import {postData, getData, putData, deleteData} from '../src/service/service';
import * as rep from '../src/repository/repository';


describe('post test', ()  => {
    test("test 1", async () => {
        const mock = jest.spyOn(rep, "postTasks");

        mock.mockResolvedValue([{
            id: 1, 
            title: "test1", 
            description: "test desc1", 
            completed: true, 
            created_at: "2022-09-10T10:00:00.000Z"
        }]);

        const res = await postData("test1", "test desc1", true, "10.09.2020");

        expect(res).toEqual(res);
        
    });

    test("error test", async () => {
        const mock = jest.spyOn(rep, "postTasks");

        mock.mockResolvedValue([]);

        try{
            await postData("test1", "test desc1", true, "10.09.2020")
        }catch(err: any){
            expect(err.message).toBe("Произошла ошибка при создании");
        }
    })
});


describe("get data test", () => {
    test('test 1', async () => {
        const mock = jest.spyOn(rep, "getTask");

        mock.mockResolvedValue([{
            id: 1, 
            title: "test2", 
            description: "test desc2", 
            completed: true, 
            created_at: "2022-09-10T10:00:00.000Z" 
        }]);

        const res = await getData();

        expect(res).toEqual([{
            id: 1, 
            title: "test2", 
            description: "test desc2", 
            completed: true, 
            created_at: "2022-09-10T10:00:00.000Z"
        }]);

    });

    test('error test2', async () => {
        const mock = jest.spyOn(rep, "getTask");
        mock.mockResolvedValue([]);

        try{
            await getData();
        }catch(err: any){
            expect(err.message).toBe("Произошла ошибка");
        }
    })
});


describe("put test", () => {
    test('put test 1', async () => {
        const mock = jest.spyOn(rep, "putTask");

        mock.mockResolvedValue([{
            id: 1, 
            title: "test2", 
            description: "test desc2", 
            completed: true, 
            created_at: "2022-09-10T10:00:00.000Z"
        }]);

        const res = await putData(1, "test2", "test desc2", true, "10.09.2022");

        expect(res).toEqual([{
            id: 1, 
            title: "test2", 
            description: "test desc2", 
            completed: true, 
            created_at: "2022-09-10T10:00:00.000Z"
        }]);
    });

    test("error test2", async () => {
        const mock = jest.spyOn(rep, "putTask");
        mock.mockResolvedValue([]);

        try{
            await putData(1, "test2", "test desc2", true, "10.09.2022");
        }catch(err: any){
            expect(err.message).toBe("Произошла ошибка");
        }
    })
});

describe("delete test", () => {
    test("test 1", async () =>{
        const mock = jest.spyOn(rep, "deleteTask");
        mock.mockResolvedValue([
            {id: 1, 
            title: "test2", 
            description: "test desc2", 
            completed: true, 
            created_at: "2022-09-10T10:00:00.000Z"}
        ]);
        const res = await deleteData(1);
        expect(res).toEqual([ {id: 1, 
            title: "test2", 
            description: "test desc2", 
            completed: true, 
            created_at: "2022-09-10T10:00:00.000Z"}])
    });

    test('test 2', async () => {
        const mock = jest.spyOn(rep, "deleteTask");
        mock.mockResolvedValue([]);

        try{
            await deleteData(2)
        }catch(err: any){
            expect(err.message).toBe("Элемент не существует");
        }
    })
})