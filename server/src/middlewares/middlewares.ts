import { Request, Response, NextFunction } from "express";

function checkBody(req: Request, res: Response, next: NextFunction) {
    const { title, description, completed, created_at } = req.body;

    console.log('checkBody - получены данные:', { title, description, completed, created_at });

    if (!title || typeof title !== 'string') {
        return res.status(400).json({ 
            error: 'Заголовок (title) обязателен и должен быть строкой',
            received: title 
        });
    }

    if (description !== undefined && typeof description !== 'string') {
        return res.status(400).json({ 
            error: 'Описание (description) должно быть строкой',
            received: description 
        });
    }

    if (completed !== undefined && 
        typeof completed !== 'boolean' && 
        completed !== 'true' && 
        completed !== 'false') {
        return res.status(400).json({ 
            error: 'Статус (completed) должен быть true, false, "true" или "false"',
            received: completed 
        });
    }


    if (created_at && isNaN(Date.parse(created_at))) {
        return res.status(400).json({ 
            error: 'created_at должен быть корректной датой',
            received: created_at 
        });
    }

    console.log('checkBody - проверка пройдена');
    next();
}

function checkID(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    console.log(`checkID - проверка ID: ${id}`);

    const numericId = Number(id);
    if (isNaN(numericId) || numericId <= 0) {
        return res.status(400).json({ 
            error: 'Некорректный ID задачи. ID должен быть положительным числом',
            received: id 
        });
    }

    console.log(`checkID - ID ${id} валидный`);
    next();
}

export { checkBody, checkID };