<?php

namespace App\Entities;


class TokenEntity extends MyEntity
{
    const string ORIGIN_TYPE_TEACHER = 'teacher';
    const string AUTHORIZED_TEACHER = 'dashboard';
    protected $datamap = [];
    protected $dates = ['created_at', 'updated_at', 'deleted_at'];
    protected $casts = [];
    protected $attributes = [
        'origin_type' => null,
        'origin_id' => null,
        'token' => null,
        'refresh_token' => null,
        'revoke' => false,
    ];
}
