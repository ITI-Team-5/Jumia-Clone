<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use  App\Http\Controllers\UserController;
use App\Models\User;

class FinalTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    // public function test_example()
    // {
    //     $response = $this->get('/');

    //     $response->assertStatus(200);
    // }
    public function test_routing()
    {

        $response = $this->get('api/orders');
        $response->assertStatus(200);

        $response = $this->get('api/orders/1');
        $response->assertStatus(200);

        $response = $this->get('api/orders');
        $response->assertStatus(200);

        $response = $this->get('api/products');
        $response->assertStatus(200);


    }
    public function test_registerNewUser(): void
    {
        $newUser = User::create([
            'name' => 'sayed',
            'email' => 'sayed@gmail.com',
            'password' => '123456',
            'phone' => '012542',
            'address' =>'cairo',
        ]);

        $this->get(action([UserController::class, 'registerNewUser'], $newUser))
            ->assertStatus(200);

    }

}
