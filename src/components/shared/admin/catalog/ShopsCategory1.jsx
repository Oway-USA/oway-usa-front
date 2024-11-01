import React, { useState } from "react";
import s from "@/styles/admin/CategoryBlock1.module.scss";
import { Checkbox } from "@nextui-org/react";
import useCategories from "../../../../hooks/admin/useCategories";

export default function ShopsCategory1({
  setSelectedCategory,
  selectedCategory,
}) {
  const { categories } = useCategories();

  const handleCategoryChange = (category) => {
    if (selectedCategory.includes(category.id)) {
      setSelectedCategory(selectedCategory.filter((id) => id !== category.id));
    } else {
      setSelectedCategory([...selectedCategory, category.id]);
    }
  };

  return (
    <div className={s.category_block} data-aos="fade-right"
    data-aos-offset="300"
    data-aos-easing="ease-in-sine">
      <h3>Категории</h3>
      <div className={s.checkboxes}>
        {categories.map((category) => (
          <div className={s.checkboxes_block} key={category.id}>
            <Checkbox
              size="md"
              checked={selectedCategory.includes(category.id)}
              onChange={() => handleCategoryChange(category)}
            >
              {category.name}
            </Checkbox>
          </div>
        ))}
      </div>
    </div>
  );
}
