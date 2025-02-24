<?php

namespace App\Strategies\User;

use App\Entities\TeacherEntity;

class TeacherStrategy extends AbstractStrategy
{
    public function __construct(TeacherEntity $entity)
    {
        $this->id = $entity->id;
        $this->name = $entity->name;
        $this->username = $entity->username;
        $this->email = $entity->email;
    }
}