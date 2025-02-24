<?php

namespace App\Entities;

use App\Libraries\Passwords;

/**
 * @property int $id
 * @property string $name
 * @property string $username
 * @property string $email
 * @property string $password
 * @property int $status
 * @property bool $two_factor
 */
class TeacherEntity extends MyEntity
{
    protected $datamap = [];
    protected $dates = ['created_at', 'updated_at', 'deleted_at'];
    protected $casts = [];
    protected $attributes = [
        'id' => null,
        'name' => null,
        'username' => null,
        'email' => null,
        'password' => null,
        'status' => 1,
        'two_factor' => false,
        'created_at' => null,
        'updated_at' => null
    ];

    /**
     * Define a senha, garantindo que seja armazenada como hash.
     *
     * @param string $password Senha em texto plano ou já hasheada.
     * @return $this
     */
    public function setPassword(string $password): static
    {
        $this->attributes['password'] = Passwords::ensureHash($password);
        return $this;
    }
}
