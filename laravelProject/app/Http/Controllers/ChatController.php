<?php

namespace App\Http\Controllers;

use App\Events\message;
use Illuminate\Http\Request;

class ChatController extends Controller
{
    //
    public function message(Request $request)
    {
        event(new message($request->input('username'),$request->input('meassge')));
        //  return $request->message;
        return [];
    }
}
