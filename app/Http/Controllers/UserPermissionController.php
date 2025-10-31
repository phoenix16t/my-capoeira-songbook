<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateUserPermissionRequest;
use App\Models\UserPermission;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserPermissionController extends Controller
{
    public function update(UpdateUserPermissionRequest $request)
    {
        $fields = $request->validated();

        UserPermission::updateOrCreate(
            ['user_id' => Auth::id()],
            $fields
        );

        return redirect()->back()->with('success');
    }
}
