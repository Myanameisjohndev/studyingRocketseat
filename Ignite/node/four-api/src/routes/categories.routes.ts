import { Router } from "express";

import { CategoryRepositoryy } from "../modules/cars/repositories/CategoriesRepository";
import { PostgreCategoriesRepository } from "../modules/cars/repositories/PostgreCategoriesRepository";
import { CreateCategoryService } from "../modules/cars/services/CreateCategoryService";

const categoriesRoutes = Router();
const categoryRepository = new CategoryRepositoryy();

categoriesRoutes.post("/", (request, response) => {
    const { name, description } = request.body;

    const createCategoryService = new CreateCategoryService(categoryRepository);
    createCategoryService.execute({ name, description });

    return response.status(201).send();
});

categoriesRoutes.get("/", (request, response) => {
    const all = categoryRepository.list();
    return response.status(201).json(all);
});

export { categoriesRoutes };
