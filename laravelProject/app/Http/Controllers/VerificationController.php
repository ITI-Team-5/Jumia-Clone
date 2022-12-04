<?php

namespace App\Http\Controllers;

use Laravel\Sanctum\PersonalAccessToken;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Auth\Events\Verified;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Foundation\Auth\VerifiesEmails;

class VerificationController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Email Verification Controller For Apiiii customized for team 5
    |--------------------------------------------------------------------------
    |
    | This controller is responsible for handling email verification for any
    | user that recently registered with the application. Emails may also
    | be re-sent if the user didn't receive the original email message.
    |
    */

    // use VerifiesEmails;

    /**
     * Where to redirect users after verification.
     *
     * @var string
     */
    protected $redirectTo = RouteServiceProvider::HOME;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct(Request $request)
    {
        if($request->route('id')){
            $user = User::find($request->route('id'));
            $token = $user->remember_token;
            $request->headers->set('Authorization', 'Bearer '. $token);    
        }
        $request->headers->set('Accept', 'application/json');

        $this->middleware('auth:sanctum');
        $this->middleware('signed')->only('verify');
        $this->middleware('throttle:6,1')->only('verify', 'resend');
    }

    

    public function verify(Request $request)
    {

        if (! hash_equals((string) $request->route('id'), (string) $request->user()->getKey())) {
            throw new AuthorizationException;
        }

        if (! hash_equals((string) $request->route('hash'), sha1($request->user()->getEmailForVerification()))) {
            throw new AuthorizationException;
        }

        if ($request->user()->hasVerifiedEmail()) {
            // return $request->wantsJson()
        return new JsonResponse(['message'=>'Already verified'], 204);
                        // : redirect($this->redirectPath());
        }

        if ($request->user()->markEmailAsVerified()) {
            event(new Verified($request->user()));
            return new JsonResponse(['message'=>' verified from mark'], 204);

        }

        if ($response = $this->verified($request)) {
            //return $response;
            return new JsonResponse(['message'=>' verified from last','response'=> $response], 204);

        }

        // return $request->wantsJson()
        return new JsonResponse(['message'=>'Successfully verified'], 204);
                    // : redirect($this->redirectPath())->with('verified', true);
    }

    /**
     * The user has been verified.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return mixed
     */
    protected function verified(Request $request)
    {
        //
       
    }

    /**
     * Resend the email verification notification.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse|\Illuminate\Http\RedirectResponse
     */
    public function resend(Request $request)
    {
 
        if ($request->user()->hasVerifiedEmail()) {
                        return new JsonResponse(['message'=>'Already verified'], 204);
        }

        $request->user()->sendEmailVerificationNotification();

                    return new JsonResponse(['message' => 'Email Sent'], 202);
    }

}
