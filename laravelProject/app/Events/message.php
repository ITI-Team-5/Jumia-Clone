<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class message implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

  public $message;
  public $username;
    public function __construct($username,$message)
    {
        //
        $this->message = $message;
        $this->username = $username;
    }


    public function broadcastOn()
    {
        // set the name of our channel to chat
        return new PrivateChannel('chat');
    }

    public function broadcastAs()
    {
        // set the name of our msg to message
        return 'message';
    }
}
