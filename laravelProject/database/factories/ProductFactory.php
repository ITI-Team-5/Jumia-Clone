<?php

namespace Database\Factories;
use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     *
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = Product::class;

    public function definition()
    {

        return [
            'title' => $this->faker->title,
            'SKU' => $this->faker->text(8),
            'details' => $this->faker->paragraph,
            'price' => $this->faker->
            randomFloat(null,0,2000),
            'image' =>$this->faker->text
        ];
    }
}
