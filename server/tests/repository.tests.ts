import {postTasks, getTask, putTask, deleteTask} from "../src/repository/repository";

const connection = {
    query: jest.fn()
};

jest.mock("pg", () => {
    return {
        Pool: jest.fn(() => {
            return {
                connect: jest.fn(() => connection)
            };
        }),
    };
});

describe('post test 1', () => {
    test("test 1", async () => {
        connection.query.mockResolvedValue({
        rows: [{title: "test1", description: "test1desc", completed: true, created_at: "20.09.2020"}]
    });

    const res = await postTasks("test1", "test1desc", true, "20.09.2020");
    expect(connection.query).toHaveBeenCalled();
    expect(res).toEqual([{
        title: "test1", description: "test1desc", completed: true, created_at: "20.09.2020"
    }]);
    });
});

describe('get test', () => {
    test("test 1", async () => {
        connection.query.mockResolvedValue({
            rows: [{title: "test1", description: "test1desc", completed: true, created_at: "20.09.2020"}]
        });
        const res = await getTask();
        expect(connection.query).toHaveBeenCalled();
        expect(res).toEqual([{title: "test1", description: "test1desc", completed: true, created_at: "20.09.2020"}])
    });
});

describe("put test", () => {
    test("test 1", async () => {
        connection.query.mockResolvedValue({
            rows: [{id: 1, title: "test1", description: "test1desc", completed: true, created_at: "20.09.2020"}]
        });

        const res = await putTask(1, "test1",  "test1desc", true, "20.09.2020");
        expect(connection.query).toHaveBeenCalled();
        expect(res).toEqual([{id: 1, title: "test1", description: "test1desc", completed: true, created_at: "20.09.2020"}])
    });
});

describe("delete test", () => {
    test("test 1", async () => {
        connection.query.mockResolvedValue({
            rows: [{id: 1, title: "test1", description: "test1desc", completed: true, created_at: "20.09.2020"}]
        });

        const res = await deleteTask(1);
        expect(connection.query).toHaveBeenCalled();
        expect(res).toEqual([{id: 1, title: "test1", description: "test1desc", completed: true, created_at: "20.09.2020"}])
    });
});