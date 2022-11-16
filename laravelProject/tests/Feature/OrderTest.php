<?php

namespace Tests\Feature;
use  App\Http\Controllers\OrderController;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class OrderTest extends TestCase
{
    use RefreshDatabase;
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
    public function test_abc()
    {
        $order = new OrderController;
        $result = $order->abc(3,5);
        $this->assertEquals(8,$result );

    }
}
