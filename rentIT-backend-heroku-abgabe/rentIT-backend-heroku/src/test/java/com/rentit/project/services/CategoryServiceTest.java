package com.rentit.project.services;

import com.rentit.project.models.ArticleEntity;
import com.rentit.project.models.CategoryEntity;
import com.rentit.project.repositories.CategoryRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

//import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;
import static org.mockito.Mockito.*;


@SpringBootTest
class CategoryServiceTest {

    private CategoryService categoryService;
    private CategoryRepository categoryRepository;

    @BeforeEach // executer avant chaque test test
    void setUp() {
        categoryRepository = mock(CategoryRepository.class); //  cree un objet mock de type CategoryRepository
        categoryService = new CategoryService();
        categoryService.categoryRepository = categoryRepository;  // injecte le mock CategoryRepository dans la propriete categoryRepository
    }

    @Test
    void testAddCategory() {

        CategoryEntity categoryEntity = new CategoryEntity();
        categoryEntity.setName("Test Category"); // cree une categorie et lui donne un nom

        //quand la methode save de categoryRepository est appele avec n'importe quel objet de type CategoryEntity, retourne l'objet categoryEntity
        when(categoryRepository.save(any(CategoryEntity.class))).thenReturn(categoryEntity);

        //executer la methode addCategory
        CategoryEntity result = categoryService.addCategory(categoryEntity);

        //verifie si le resultat correspond au attente
        assertEquals("Test Category", result.getName());

        // verifie que la methode save de categoryRepository a ete appele exactement une fois avec n'importe quel objet de type CategoryEntity en argument.
        verify(categoryRepository, times(1)).save(any(CategoryEntity.class));
    }

    @Test
    void testGetAllCategories() {
        // Arrange
        List<CategoryEntity> mockCategories = new ArrayList<>();
        CategoryEntity category1 = new CategoryEntity(1L, "Category 1", "Description 1", new ArrayList<>());
        CategoryEntity category2 = new CategoryEntity(2L, "Category 2", "Description 2", new ArrayList<>());


        mockCategories.add(category1);
        mockCategories.add(category2);

        when(categoryRepository.findAll()).thenReturn(mockCategories);

        // Act
        List<CategoryEntity> result = categoryService.getAllCategories();

        assertEquals(2, result.size());
        assertEquals("Category 1", result.get(0).getName());

        verify(categoryRepository, times(1)).findAll();
    }

    @Test
    public void demoTestMethod(){
        assertTrue(true);
    }

}