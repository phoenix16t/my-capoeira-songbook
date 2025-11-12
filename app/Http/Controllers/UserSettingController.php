<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateUserSettingRequest;
use App\Models\UserSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserSettingController extends Controller
{
    public function update(UpdateUserSettingRequest $request)
    {
        $fields = $request->validated();

        UserSetting::updateOrCreate(
            ['user_id' => Auth::id()],
            $fields
        );

        return redirect()->back()->with('success');
    }
}
